import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true, name: true, email: true, companyName: true,
      ico: true, dic: true, street: true, city: true, zip: true,
      bankAccount: true, bankName: true, plan: true,
    },
  });

  return NextResponse.json(user);
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: body.name || body.companyName || null,
      companyName: body.companyName || null,
      ico: body.ico || null,
      dic: body.dic || null,
      street: body.street || null,
      city: body.city || null,
      zip: body.zip || null,
      bankAccount: body.bankAccount || null,
      bankName: body.bankName || null,
    },
    select: { id: true, name: true, companyName: true, ico: true, dic: true },
  });

  return NextResponse.json(user);
}
