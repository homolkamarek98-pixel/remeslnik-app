import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const invoice = await prisma.invoice.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!invoice) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (!["SENT", "OVERDUE"].includes(invoice.status)) {
    return NextResponse.json({ error: "Invoice is not in payable state" }, { status: 422 });
  }

  const updated = await prisma.invoice.update({
    where: { id },
    data: { status: "PAID", paidAt: new Date() },
  });

  return NextResponse.json(updated);
}
