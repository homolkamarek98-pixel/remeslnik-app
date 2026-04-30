import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const jobUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  scheduledDate: z.string().optional().nullable(),
});

async function getJob(userId: string, id: string) {
  return prisma.job.findFirst({
    where: { id, userId },
    include: {
      customer: { select: { id: true, name: true, email: true } },
      items: true,
      photos: true,
      invoice: { select: { id: true, status: true, invoiceNumber: true, totalInclVat: true } },
    },
  });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const job = await getJob(session.user.id, id);
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(job);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const job = await prisma.job.findFirst({ where: { id, userId: session.user.id } });
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const parsed = jobUpdateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const updated = await prisma.job.update({
    where: { id },
    data: {
      ...(parsed.data.title !== undefined && { title: parsed.data.title }),
      ...(parsed.data.description !== undefined && { description: parsed.data.description || null }),
      ...(parsed.data.scheduledDate !== undefined && {
        scheduledDate: parsed.data.scheduledDate ? new Date(parsed.data.scheduledDate) : null,
      }),
    },
    include: { customer: { select: { id: true, name: true } } },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const job = await prisma.job.findFirst({ where: { id, userId: session.user.id } });
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.job.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
