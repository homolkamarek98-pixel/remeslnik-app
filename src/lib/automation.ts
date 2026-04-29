import { prisma } from "@/lib/prisma";
import { buildInvoiceData, getNextInvoiceNumber } from "@/lib/invoice";
import { uploadToR2 } from "@/lib/r2";
import { invoiceEmailHtml } from "@/lib/email/templates";
import { sendInvoiceEmail } from "@/lib/email/send";
import { InvoiceStatus, JobStatus } from "@prisma/client";

/**
 * Triggered when a job transitions to COMPLETED.
 * Creates invoice, generates PDF, uploads to R2, sends email to customer.
 */
export async function generateAndSendInvoice(jobId: string): Promise<string | null> {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      user: true,
      customer: true,
      items: true,
      invoice: { select: { id: true } },
    },
  });

  if (!job || job.status !== JobStatus.COMPLETED) return null;
  if (job.invoice) return job.invoice.id; // already generated
  if (job.items.length === 0) return null; // nothing to invoice
  if (!job.customer.email) return null; // no email → skip send, but could still create

  const year = new Date().getFullYear();
  const invoiceNumber = await getNextInvoiceNumber(job.userId, year);
  const issueDate = new Date();

  const invoiceData = buildInvoiceData(job.user, job.customer, job.items, invoiceNumber, issueDate);

  // Generate PDF
  let pdfBuffer: Buffer | null = null;
  let pdfUrl: string | null = null;
  let pdfKey: string | null = null;

  try {
    const { renderToBuffer } = await import("@react-pdf/renderer");
    const { InvoiceDocument } = await import("@/components/pdf/InvoiceDocument");
    const { createElement } = await import("react");

    pdfBuffer = await renderToBuffer(createElement(InvoiceDocument, { data: invoiceData }));
    pdfKey = `invoices/${job.userId}/${invoiceNumber}.pdf`;
    pdfUrl = await uploadToR2(pdfKey, pdfBuffer, "application/pdf");
  } catch (err) {
    console.error("[automation] PDF generation failed:", err);
  }

  // Save invoice to DB
  const invoice = await prisma.invoice.create({
    data: {
      userId: job.userId,
      customerId: job.customerId,
      jobId: job.id,
      invoiceNumber,
      status: InvoiceStatus.DRAFT,
      issueDate,
      dueDate: invoiceData.dueDate,
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
  });

  // Send email if customer has email
  if (job.customer.email && pdfBuffer) {
    const htmlBody = invoiceEmailHtml(invoiceData, job.user.bankAccount);

    try {
      await sendInvoiceEmail({
        to: job.customer.email,
        invoiceNumber,
        htmlBody,
        pdfBuffer: pdfBuffer,
        pdfFilename: `faktura-${invoiceNumber}.pdf`,
      });

      await prisma.invoice.update({
        where: { id: invoice.id },
        data: { status: InvoiceStatus.SENT, sentAt: new Date() },
      });
    } catch (err) {
      console.error("[automation] Email send failed:", err);
      // Invoice created but not sent — user can send manually
    }
  }

  return invoice.id;
}
