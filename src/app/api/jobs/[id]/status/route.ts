import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { JobStatus } from "@prisma/client";
import { z } from "zod";

// Valid status transitions
const TRANSITIONS: Record<JobStatus, JobStatus[]> = {
  [JobStatus.DRAFT]: [JobStatus.SCHEDULED, JobStatus.CANCELLED],
  [JobStatus.SCHEDULED]: [JobStatus.IN_PROGRESS, JobStatus.CANCELLED],
  [JobStatus.IN_PROGRESS]: [JobStatus.COMPLETED, JobStatus.SCHEDULED],
  [JobStatus.COMPLETED]: [],
  [JobStatus.CANCELLED]: [],
};

const statusSchema = z.object({
  status: z.nativeEnum(JobStatus),
});

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });

  const { id } = await params;
  const job = await prisma.job.findFirst({ where: { id, userId: session.user.id } });
  if (!job) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });

  const body = await req.json();
  const parsed = statusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Neplatný stav" }, { status: 400 });
  }

  const { status } = parsed.data;
  const allowed = TRANSITIONS[job.status];

  if (!allowed.includes(status)) {
    return NextResponse.json(
      { error: `Přechod ze stavu ${job.status} na ${status} není povolen` },
      { status: 422 },
    );
  }

  const updated = await prisma.job.update({
    where: { id },
    data: {
      status,
      completedAt: status === JobStatus.COMPLETED ? new Date() : undefined,
    },
    include: { customer: { select: { id: true, name: true } }, items: true },
  });

  // Trigger invoice generation on completion (Sprint 4)
  // if (status === JobStatus.COMPLETED) { await generateAndSendInvoice(id); }

  return NextResponse.json(updated);
}
