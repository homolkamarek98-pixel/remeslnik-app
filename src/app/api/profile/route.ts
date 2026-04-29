import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2).optional(),
  companyName: z.string().optional(),
  ico: z
    .string()
    .regex(/^\d{8}$/, "IČO musí mít 8 číslic")
    .optional()
    .or(z.literal("")),
  dic: z
    .string()
    .regex(/^CZ\d{8,10}$/, "DIČ musí být ve formátu CZxxxxxxxxxx")
    .optional()
    .or(z.literal("")),
  street: z.string().optional(),
  city: z.string().optional(),
  zip: z
    .string()
    .regex(/^\d{5}$/, "PSČ musí mít 5 číslic")
    .optional()
    .or(z.literal("")),
  bankAccount: z.string().optional(),
  bankName: z.string().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      companyName: true,
      ico: true,
      dic: true,
      street: true,
      city: true,
      zip: true,
      bankAccount: true,
      bankName: true,
      plan: true,
    },
  });

  return NextResponse.json(user);
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = profileSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Neplatná data", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: parsed.data,
    select: {
      id: true,
      name: true,
      email: true,
      companyName: true,
      ico: true,
      dic: true,
      street: true,
      city: true,
      zip: true,
      bankAccount: true,
      bankName: true,
    },
  });

  return NextResponse.json(user);
}
