import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { buildInvoiceData, getNextInvoiceNumber } from "@/lib/invoice";
import { uploadToR2 } from "@/lib/r2";
import { InvoiceStatus } from "@prisma/client";

const createSchema = z.object({
  jobId: z.string().cuid().optional(),
  customerId: z.string().cuid(),
  items: z.array(
    z.object({
      description: z.string().min(1),
      quantity: z.number().positive(),
      unit: z.string(),
      unitPrice: z.number().int().positive(), // haléře
      vatRate: z.number().int().refine((v) => [0, 15, 21].includes(v)),
    }),
  ).min(1),
  daysUntilDue: z.number().int().min(0).max(90).default(14),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });

  const status = req.nextUrl.searchParams.get("status");
  const invoices = await prisma.invoice.findMany({
    where: {
      userId: session.user.id,
      ...(status ? { status: status as InvoiceStatus } : {}),
    },
    orderBy: { createdAt: "desc" },
    include: { customer: { select: { name: true } } },
  });
  return NextResponse.json(invoices);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Neplatná data", details: parsed.error.flatten() }, { status: 400 });
  }

  const { customerId, jobId, items, daysUntilDue } = parsed.data;

  const [user, customer] = await Promise.all([
    prisma.user.findUnique({ where: { id: session.user.id } }),
    prisma.customer.findFirst({ where: { id: customerId, userId: session.user.id } }),
  ]);

  if (!user || !customer) {
    return NextResponse.json({ error: "Zákazník nenalezen" }, { status: 404 });
  }

  const year = new Date().getFullYear();
  const invoiceNumber = await getNextInvoiceNumber(session.user.id, year);
  const issueDate = new Date();
  const dueDate = new Date(issueDate);
  dueDate.setDate(dueDate.getDate() + daysUntilDue);

  // Build job items from passed items
  const jobItems = items.map((item) => ({
    id: "",
    jobId: jobId ?? "",
    description: item.description,
    quantity: item.quantity as unknown as import("@prisma/client").Prisma.Decimal,
    unit: item.unit,
    unitPrice: item.unitPrice,
    vatRate: item.vatRate,
  }));

  const invoiceData = buildInvoiceData(user, customer, jobItems as never, invoiceNumber, issueDate);

  // Generate PDF
  let pdfUrl: string | null = null;
  let pdfKey: string | null = null;

  try {
    const { renderToBuffer } = await import("@react-pdf/renderer");
    const { InvoiceDocument } = await import("@/components/pdf/InvoiceDocument");
    const { createElement } = await import("react");

    const pdfBuffer = await renderToBuffer(createElement(InvoiceDocument, { data: invoiceData }));
    pdfKey = `invoices/${session.user.id}/${invoiceNumber}.pdf`;
    pdfUrl = await uploadToR2(pdfKey, pdfBuffer, "application/pdf");
  } catch (err) {
    console.error("PDF generation failed:", err);
    // Continue without PDF — can be regenerated later
  }

  // Save to DB
  const invoice = await prisma.invoice.create({
    data: {
      userId: session.user.id,
      customerId,
      jobId: jobId ?? null,
      invoiceNumber,
      status: InvoiceStatus.DRAFT,
      issueDate,
      dueDate,
      totalExclVat: invoiceData.totalExclVat,
      vatAmount: invoiceData.vatAmount,
      totalInclVat: invoiceData.totalInclVat,
      pdfUrl,
      pdfKey,
      items: {
        create: invoiceData.items.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          unit: item.unit,
          unitPrice: item.unitPrice,
          vatRate: item.vatRate,
          totalExclVat: item.totalExclVat,
          vatAmount: item.vatAmount,
          totalInclVat: item.totalInclVat,
        })),
      },
    },
    include: { items: true, customer: { select: { name: true } } },
  });

  return NextResponse.json(invoice, { status: 201 });
}
