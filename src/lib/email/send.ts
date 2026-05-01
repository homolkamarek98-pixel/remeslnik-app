import { Resend } from "resend";
import { invoiceEmailHtml, overdueReminderHtml } from "./templates";

const FROM = "Řemeslník.app <faktury@remeslnik.app>";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!);
}

export async function sendInvoiceEmail({
  to,
  invoiceNumber,
  customerName,
  totalInclVat,
  dueDate,
  pdfUrl,
}: {
  to: string;
  invoiceNumber: string;
  customerName: string;
  totalInclVat: number;
  dueDate: Date;
  pdfUrl?: string;
}): Promise<void> {
  await getResend().emails.send({
    from: FROM,
    to,
    subject: `Faktura ${invoiceNumber}`,
    html: invoiceEmailHtml({ invoiceNumber, customerName, totalInclVat, dueDate, pdfUrl }),
  });
}

export async function sendOverdueReminderEmail({
  to,
  invoiceNumber,
  customerName,
  totalInclVat,
  dueDate,
  pdfUrl,
}: {
  to: string;
  invoiceNumber: string;
  customerName: string;
  totalInclVat: number;
  dueDate: Date;
  pdfUrl?: string;
}): Promise<void> {
  await getResend().emails.send({
    from: FROM,
    to,
    subject: `Upomínka — faktura ${invoiceNumber} po splatnosti`,
    html: overdueReminderHtml({ invoiceNumber, customerName, totalInclVat, dueDate, pdfUrl }),
  });
}
