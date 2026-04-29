import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const patchSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().regex(/^\d{5}$/).optional().or(z.literal("")),
  ico: z.string().regex(/^\d{8}$/).optional().or(z.literal("")),
  dic: z.string().regex(/^CZ\d{8,10}$/).optional().or(z.literal("")),
  notes: z.string().optional(),
});

async function getCustomer(id: string, userId: string) {
  return prisma.customer.findFirst({ where: { id, userId } });
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });

  const { id } = await params;
  const customer = await prisma.customer.findFirst({
    where: { id, userId: session.user.id },
    include: {
      jobs: {
        orderBy: { createdAt: "desc" },
        take: 10,
        select: { id: true, title: true, status: true, scheduledDate: true, completedAt: true },
      },
    },
  });

  if (!customer) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });
  return NextResponse.json(customer);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });

  const { id } = await params;
  const existing = await getCustomer(id, session.user.id);
  if (!existing) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });

  const body = await req.json();
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Neplatná data", details: parsed.error.flatten() }, { status: 400 });
  }

  const customer = await prisma.customer.update({
    where: { id },
    data: parsed.data,
  });
  return NextResponse.json(customer);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });

  const { id } = await params;
  const existing = await getCustomer(id, session.user.id);
  if (!existing) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });

  // Check for existing jobs
  const jobCount = await prisma.job.count({ where: { customerId: id } });
  if (jobCount > 0) {
    return NextResponse.json(
      { error: "Zákazník má zakázky a nelze ho smazat" },
      { status: 409 },
    );
  }

  await prisma.customer.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
