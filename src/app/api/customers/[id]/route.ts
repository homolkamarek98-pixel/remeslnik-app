import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const customerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  ico: z.string().optional(),
  dic: z.string().optional(),
  notes: z.string().optional(),
});

async function getCustomer(userId: string, id: string) {
  return prisma.customer.findFirst({ where: { id, userId } });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const customer = await getCustomer(session.user.id, id);
  if (!customer) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(customer);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const customer = await getCustomer(session.user.id, id);
  if (!customer) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const parsed = customerSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { name, email, phone, street, city, zip, ico, dic, notes } = parsed.data;

  const updated = await prisma.customer.update({
    where: { id },
    data: {
      name,
      email: email || null,
      phone: phone || null,
      street: street || null,
      city: city || null,
      zip: zip || null,
      ico: ico || null,
      dic: dic || null,
      notes: notes || null,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const customer = await getCustomer(session.user.id, id);
  if (!customer) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.customer.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
