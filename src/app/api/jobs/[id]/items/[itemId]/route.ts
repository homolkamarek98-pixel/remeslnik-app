import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const itemSchema = z.object({
  description: z.string().min(1),
  quantity: z.number().positive(),
  unit: z.string(),
  unitPrice: z.number().int().positive(),
  vatRate: z.number().int(),
});

async function ownsItem(userId: string, jobId: string, itemId: string) {
  const item = await prisma.jobItem.findFirst({
    where: { id: itemId, jobId, job: { userId } },
  });
  return item;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; itemId: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, itemId } = await params;
  const item = await ownsItem(session.user.id, id, itemId);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const parsed = itemSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const updated = await prisma.jobItem.update({
    where: { id: itemId },
    data: parsed.data,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; itemId: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, itemId } = await params;
  const item = await ownsItem(session.user.id, id, itemId);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.jobItem.delete({ where: { id: itemId } });
  return new NextResponse(null, { status: 204 });
}
