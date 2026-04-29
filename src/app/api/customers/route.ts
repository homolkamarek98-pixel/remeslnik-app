import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const customerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().regex(/^\d{5}$/).optional().or(z.literal("")),
  ico: z.string().regex(/^\d{8}$/).optional().or(z.literal("")),
  dic: z.string().regex(/^CZ\d{8,10}$/).optional().or(z.literal("")),
  notes: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });

  const q = req.nextUrl.searchParams.get("q") ?? "";
  const customers = await prisma.customer.findMany({
    where: {
      userId: session.user.id,
      ...(q ? { name: { contains: q, mode: "insensitive" } } : {}),
    },
    orderBy: { name: "asc" },
    select: {
      id: true, name: true, email: true, phone: true, ico: true, city: true,
      _count: { select: { jobs: true } },
    },
  });
  return NextResponse.json(customers);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });

  const body = await req.json();
  const parsed = customerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Neplatná data", details: parsed.error.flatten() }, { status: 400 });
  }

  const customer = await prisma.customer.create({
    data: { ...parsed.data, userId: session.user.id },
  });
  return NextResponse.json(customer, { status: 201 });
}
