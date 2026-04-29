import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { JobStatus } from "@prisma/client";

const jobSchema = z.object({
  customerId: z.string().cuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  scheduledDate: z.string().datetime().optional(),
  items: z
    .array(
      z.object({
        description: z.string().min(1),
        quantity: z.number().positive(),
        unit: z.string().default("ks"),
        unitPrice: z.number().int().positive(), // haléře
        vatRate: z.number().int().refine((v) => [0, 15, 21].includes(v)),
      }),
    )
    .optional(),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });

  const { searchParams } = req.nextUrl;
  const filter = searchParams.get("filter"); // today | week | open
  const statusParam = searchParams.get("status");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const where: Parameters<typeof prisma.job.findMany>[0]["where"] = {
    userId: session.user.id,
  };

  if (filter === "today") {
    where.scheduledDate = { gte: today, lt: tomorrow };
    where.status = { in: [JobStatus.SCHEDULED, JobStatus.IN_PROGRESS] };
  } else if (filter === "week") {
    where.scheduledDate = { gte: today, lt: nextWeek };
    where.status = { in: [JobStatus.SCHEDULED, JobStatus.IN_PROGRESS] };
  } else if (filter === "open") {
    where.status = { in: [JobStatus.DRAFT, JobStatus.SCHEDULED, JobStatus.IN_PROGRESS] };
  } else if (statusParam) {
    where.status = statusParam as JobStatus;
  }

  const jobs = await prisma.job.findMany({
    where,
    orderBy: [{ scheduledDate: "asc" }, { createdAt: "desc" }],
    include: {
      customer: { select: { id: true, name: true, phone: true } },
      items: true,
      _count: { select: { photos: true } },
    },
  });
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });

  const body = await req.json();
  const parsed = jobSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Neplatná data", details: parsed.error.flatten() }, { status: 400 });
  }

  const { items, ...jobData } = parsed.data;

  // Verify customer belongs to this user
  const customer = await prisma.customer.findFirst({
    where: { id: jobData.customerId, userId: session.user.id },
  });
  if (!customer) return NextResponse.json({ error: "Zákazník nenalezen" }, { status: 404 });

  const job = await prisma.job.create({
    data: {
      ...jobData,
      userId: session.user.id,
      scheduledDate: jobData.scheduledDate ? new Date(jobData.scheduledDate) : undefined,
      items: items
        ? {
            create: items.map((item) => ({
              description: item.description,
              quantity: item.quantity,
              unit: item.unit,
              unitPrice: item.unitPrice,
              vatRate: item.vatRate,
            })),
          }
        : undefined,
    },
    include: { items: true, customer: { select: { id: true, name: true } } },
  });

  return NextResponse.json(job, { status: 201 });
}
