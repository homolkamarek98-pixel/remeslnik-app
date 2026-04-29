import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const itemSchema = z.object({
  description: z.string().min(1),
  quantity: z.number().positive(),
  unit: z.string().default("ks"),
  unitPrice: z.number().int().positive(), // haléře
  vatRate: z.number().int().refine((v) => [0, 15, 21].includes(v)),
});

const itemsSchema = z.array(itemSchema);

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });

  const { id } = await params;
  const job = await prisma.job.findFirst({ where: { id, userId: session.user.id } });
  if (!job) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });

  const body = await req.json();
  const parsed = itemsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Neplatné položky", details: parsed.error.flatten() }, { status: 400 });
  }

  // Replace all items atomically
  await prisma.$transaction([
    prisma.jobItem.deleteMany({ where: { jobId: id } }),
    prisma.jobItem.createMany({
      data: parsed.data.map((item) => ({ ...item, jobId: id })),
    }),
  ]);

  const items = await prisma.jobItem.findMany({ where: { jobId: id } });
  return NextResponse.json(items);
}
