import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const patchSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  customerId: z.string().cuid().optional(),
  scheduledDate: z.string().datetime().nullable().optional(),
});

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });

  const { id } = await params;
  const job = await prisma.job.findFirst({
    where: { id, userId: session.user.id },
    include: {
      customer: true,
      items: true,
      photos: true,
      invoice: { select: { id: true, invoiceNumber: true, status: true, totalInclVat: true } },
    },
  });

  if (!job) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });
  return NextResponse.json(job);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });

  const { id } = await params;
  const job = await prisma.job.findFirst({ where: { id, userId: session.user.id } });
  if (!job) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });

  const body = await req.json();
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Neplatná data", details: parsed.error.flatten() }, { status: 400 });
  }

  const updated = await prisma.job.update({
    where: { id },
    data: {
      ...parsed.data,
      scheduledDate: parsed.data.scheduledDate
        ? new Date(parsed.data.scheduledDate)
        : parsed.data.scheduledDate === null
          ? null
          : undefined,
    },
    include: { items: true, customer: { select: { id: true, name: true } } },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });

  const { id } = await params;
  const job = await prisma.job.findFirst({ where: { id, userId: session.user.id } });
  if (!job) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });

  await prisma.job.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
