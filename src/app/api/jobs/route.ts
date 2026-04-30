import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const jobSchema = z.object({
  customerId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  scheduledDate: z.string().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const jobs = await prisma.job.findMany({
    where: { userId: session.user.id },
    include: {
      customer: { select: { id: true, name: true } },
      items: true,
      _count: { select: { photos: true } },
      invoice: { select: { id: true, status: true, invoiceNumber: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = jobSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { customerId, title, description, scheduledDate } = parsed.data;

  const customer = await prisma.customer.findFirst({
    where: { id: customerId, userId: session.user.id },
  });
  if (!customer) return NextResponse.json({ error: "Customer not found" }, { status: 404 });

  const job = await prisma.job.create({
    data: {
      userId: session.user.id,
      customerId,
      title,
      description: description || null,
      scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
    },
    include: { customer: { select: { id: true, name: true } } },
  });

  return NextResponse.json(job, { status: 201 });
}
