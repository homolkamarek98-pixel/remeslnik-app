import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOverdueReminderEmail } from "@/lib/email/send";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();

  const toMark = await prisma.invoice.findMany({
    where: { status: "SENT", dueDate: { lt: now } },
    include: { customer: { select: { email: true, name: true } } },
  });

  if (toMark.length > 0) {
    await prisma.invoice.updateMany({
      where: { id: { in: toMark.map((i) => i.id) } },
      data: { status: "OVERDUE" },
    });
  }

  let sent = 0;
  for (const invoice of toMark) {
    if (invoice.customer.email) {
      try {
        await sendOverdueReminderEmail({
          to: invoice.customer.email,
          invoiceNumber: invoice.invoiceNumber,
          customerName: invoice.customer.name,
          totalInclVat: invoice.totalInclVat,
          dueDate: invoice.dueDate,
          pdfUrl: invoice.pdfUrl ?? undefined,
        });
        sent++;
      } catch (err) {
        console.error("Overdue reminder failed:", invoice.invoiceNumber, err);
      }
    }
  }

  return NextResponse.json({ marked: toMark.length, emailsSent: sent });
}
