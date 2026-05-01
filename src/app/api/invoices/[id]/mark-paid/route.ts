import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { InvoiceStatus } from "@prisma/client";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });

  const { id } = await params;
  const invoice = await prisma.invoice.findFirst({ where: { id, userId: session.user.id } });
  if (!invoice) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });

  if (!([InvoiceStatus.SENT, InvoiceStatus.OVERDUE] as InvoiceStatus[]).includes(invoice.status)) {
    return NextResponse.json(
      { error: "Fakturu lze označit jako zaplacenou pouze ve stavu SENT nebo OVERDUE" },
      { status: 422 },
    );
  }

  const updated = await prisma.invoice.update({
    where: { id },
    data: { status: InvoiceStatus.PAID, paidAt: new Date() },
  });

  return NextResponse.json(updated);
}
