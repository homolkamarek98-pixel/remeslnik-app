import { prisma } from "@/lib/prisma";
import { calcVat, generateInvoiceNumber } from "@/lib/utils";
import type { Customer, Job, JobItem, User } from "@prisma/client";

export interface InvoiceData {
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  supplier: {
    name: string;
    ico: string | null;
    dic: string | null;
    street: string | null;
    city: string | null;
    zip: string | null;
    bankAccount: string | null;
    bankName: string | null;
  };
  customer: {
    name: string;
    ico: string | null;
    dic: string | null;
    street: string | null;
    city: string | null;
    zip: string | null;
  };
  items: Array<{
    description: string;
    quantity: number;
    unit: string;
    unitPrice: number; // haléře
    vatRate: number;
    totalExclVat: number;
    vatAmount: number;
    totalInclVat: number;
  }>;
  vatSummary: Array<{ rate: number; base: number; vat: number; total: number }>;
  totalExclVat: number;
  vatAmount: number;
  totalInclVat: number;
  currency: string;
}

/** Builds InvoiceData structure from job — used for PDF rendering and DB storage */
export function buildInvoiceData(
  user: User,
  customer: Customer,
  items: JobItem[],
  invoiceNumber: string,
  issueDate = new Date(),
): InvoiceData {
  const dueDate = new Date(issueDate);
  dueDate.setDate(dueDate.getDate() + 14);

  const invoiceItems = items.map((item) => {
    const quantity = Number(item.quantity);
    const totalExclVat = Math.round(quantity * Number(item.unitPrice));
    const vatAmount = calcVat(totalExclVat, item.vatRate);
    return {
      description: item.description,
      quantity,
      unit: item.unit,
      unitPrice: Number(item.unitPrice),
      vatRate: item.vatRate,
      totalExclVat,
      vatAmount,
      totalInclVat: totalExclVat + vatAmount,
    };
  });

  // DPH summary grouped by rate (§29 ZDPH)
  const vatMap = new Map<number, { base: number; vat: number }>();
  for (const item of invoiceItems) {
    const existing = vatMap.get(item.vatRate) ?? { base: 0, vat: 0 };
    vatMap.set(item.vatRate, {
      base: existing.base + item.totalExclVat,
      vat: existing.vat + item.vatAmount,
    });
  }
  const vatSummary = Array.from(vatMap.entries()).map(([rate, { base, vat }]) => ({
    rate,
    base,
    vat,
    total: base + vat,
  }));

  const totalExclVat = invoiceItems.reduce((s, i) => s + i.totalExclVat, 0);
  const vatAmount = invoiceItems.reduce((s, i) => s + i.vatAmount, 0);
  const totalInclVat = totalExclVat + vatAmount;

  return {
    invoiceNumber,
    issueDate,
    dueDate,
    supplier: {
      name: user.companyName ?? user.name,
      ico: user.ico,
      dic: user.dic,
      street: user.street,
      city: user.city,
      zip: user.zip,
      bankAccount: user.bankAccount,
      bankName: user.bankName,
    },
    customer: {
      name: customer.name,
      ico: customer.ico,
      dic: customer.dic,
      street: customer.street,
      city: customer.city,
      zip: customer.zip,
    },
    items: invoiceItems,
    vatSummary,
    totalExclVat,
    vatAmount,
    totalInclVat,
    currency: "CZK",
  };
}

/** Gets next invoice sequence number for a user in a given year */
export async function getNextInvoiceNumber(userId: string, year: number): Promise<string> {
  const lastInvoice = await prisma.invoice.findFirst({
    where: {
      userId,
      invoiceNumber: { startsWith: `${year}-` },
    },
    orderBy: { invoiceNumber: "desc" },
    select: { invoiceNumber: true },
  });

  let seq = 1;
  if (lastInvoice) {
    const parts = lastInvoice.invoiceNumber.split("-");
    seq = parseInt(parts[parts.length - 1] ?? "0") + 1;
  }

  return generateInvoiceNumber(year, seq);
}
