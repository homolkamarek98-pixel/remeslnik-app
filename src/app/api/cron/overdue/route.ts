import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { InvoiceStatus } from "@prisma/client";
import { overdueReminderHtml } from "@/lib/email/templates";
import { sendOverdueReminderEmail } from "@/lib/email/send";

// Vercel Cron: runs daily at 09:00 UTC
// vercel.json: { "path": "/api/cron/overdue", "schedule": "0 9 * * *" }
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();

  // 1. Find newly overdue invoices (SENT + dueDate < now)
  const newlyOverdue = await prisma.invoice.findMany({
    where: { status: InvoiceStatus.SENT, dueDate: { lt: now } },
    include: {
      customer: { select: { email: true, name: true } },
      user: { select: { companyName: true, name: true } },
    },
  });

  // 2. Batch update to OVERDUE
  if (newlyOverdue.length > 0) {
    await prisma.invoice.updateMany({
      where: { id: { in: newlyOverdue.map((i) => i.id) } },
      data: { status: InvoiceStatus.OVERDUE },
    });
  }

  // 3. Send reminder emails
  let emailsSent = 0;
  for (const invoice of newlyOverdue) {
    if (!invoice.customer.email) continue;
    const supplierName = invoice.user.companyName ?? invoice.user.name;

    try {
      const html = overdueReminderHtml(
        invoice.invoiceNumber,
        invoice.totalInclVat,
        invoice.dueDate,
        supplierName,
      );
      await sendOverdueReminderEmail({
        to: invoice.customer.email,
        invoiceNumber: invoice.invoiceNumber,
        htmlBody: html,
      });
      emailsSent++;
    } catch (err) {
      console.error(`[cron/overdue] email failed for ${invoice.id}:`, err);
    }
  }

  return NextResponse.json({ markedOverdue: newlyOverdue.length, emailsSent });
}
