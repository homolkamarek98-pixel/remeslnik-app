import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generateAndSendInvoice } from "@/lib/automation";

type JobStatus = "DRAFT" | "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

const TRANSITIONS: Record<JobStatus, JobStatus[]> = {
  DRAFT: ["SCHEDULED", "CANCELLED"],
  SCHEDULED: ["IN_PROGRESS", "CANCELLED"],
  IN_PROGRESS: ["COMPLETED", "SCHEDULED"],
  COMPLETED: [],
  CANCELLED: [],
};

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const job = await prisma.job.findFirst({ where: { id, userId: session.user.id } });
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { status } = await req.json() as { status: JobStatus };
  const allowed = TRANSITIONS[job.status as JobStatus] ?? [];

  if (!allowed.includes(status)) {
    return NextResponse.json(
      { error: `Cannot transition from ${job.status} to ${status}` },
      { status: 422 },
    );
  }

  const updated = await prisma.job.update({
    where: { id },
    data: {
      status,
      ...(status === "COMPLETED" && { completedAt: new Date() }),
    },
  });

  if (status === "COMPLETED") {
    void generateAndSendInvoice(id);
  }

  return NextResponse.json(updated);
}
