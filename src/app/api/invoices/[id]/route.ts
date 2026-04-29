import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { InvoiceStatus } from "@prisma/client";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });

  const { id } = await params;
  const invoice = await prisma.invoice.findFirst({
    where: { id, userId: session.user.id },
    include: {
      customer: true,
      items: true,
      job: { select: { id: true, title: true } },
    },
  });

  if (!invoice) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });
  return NextResponse.json(invoice);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });

  const { id } = await params;
  const invoice = await prisma.invoice.findFirst({ where: { id, userId: session.user.id } });
  if (!invoice) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });

  if (invoice.status === InvoiceStatus.PAID) {
    return NextResponse.json({ error: "Zaplacenou fakturu nelze stornovat" }, { status: 409 });
  }

  await prisma.invoice.update({
    where: { id },
    data: { status: InvoiceStatus.CANCELLED },
  });

  return new NextResponse(null, { status: 204 });
}
