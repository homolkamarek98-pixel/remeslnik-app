import { prisma } from "@/lib/prisma";
import { buildInvoiceData, getNextInvoiceNumber } from "@/lib/invoice";
import { uploadToR2 } from "@/lib/r2";
import { sendInvoiceEmail } from "@/lib/email/send";
import { buildQrPaymentString } from "@/lib/utils";

export async function generateAndSendInvoice(jobId: string): Promise<void> {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      user: true,
      customer: true,
      items: true,
      invoice: true,
    },
  });

  if (!job || job.invoice) return;

  const year = new Date().getFullYear();
  const invoiceNumber = await getNextInvoiceNumber(job.userId, year);

  const invoiceData = buildInvoiceData(
    job.user,
    job.customer,
    job.items.map((item) => ({
      description: item.description,
      quantity: item.quantity,
      unit: item.unit,
      unitPrice: Number(item.unitPrice),
      vatRate: item.vatRate,
    })),
    invoiceNumber,
  );

  const invoice = await prisma.invoice.create({
    data: {
      userId: job.userId,
      customerId: job.customerId,
      jobId: job.id,
      invoiceNumber,
      status: "DRAFT",
      issueDate: invoiceData.issueDate,
      dueDate: invoiceData.dueDate,
      totalExclVat: invoiceData.totalExclVat,
      vatAmount: invoiceData.vatAmount,
      totalInclVat: invoiceData.totalInclVat,
      currency: invoiceData.currency,
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

  // Generate PDF and upload to R2 non-blocking
  void (async () => {
    try {
      const { renderToBuffer } = await import("@react-pdf/renderer");
      const { InvoiceDocument } = await import("@/components/pdf/InvoiceDocument");
      const { createElement } = await import("react");

      let qrString: string | undefined;
      if (job.user.bankAccount) {
        const ibanCandidate = job.user.bankAccount.replace(/\s/g, "");
        if (ibanCandidate.startsWith("CZ")) {
          qrString = buildQrPaymentString({
            iban: ibanCandidate,
            amount: invoiceData.totalInclVat,
            variableSymbol: invoiceNumber.replace("-", ""),
          });
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfBuffer = await renderToBuffer(
        createElement(InvoiceDocument, { data: invoiceData, qrString }) as any,
      );

      const key = `invoices/${job.userId}/${invoice.id}.pdf`;
      const pdfUrl = await uploadToR2(key, pdfBuffer, "application/pdf");

      await prisma.invoice.update({
        where: { id: invoice.id },
        data: { pdfUrl, pdfKey: key, status: "SENT", sentAt: new Date() },
      });

      if (job.customer.email) {
        await sendInvoiceEmail({
          to: job.customer.email,
          invoiceNumber,
          customerName: job.customer.name,
          totalInclVat: invoiceData.totalInclVat,
          dueDate: invoiceData.dueDate,
          pdfUrl,
        });
      }
    } catch (err) {
      console.error("generateAndSendInvoice background error:", err);
    }
  })();
}
