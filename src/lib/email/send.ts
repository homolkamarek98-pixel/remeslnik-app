import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM ?? "Řemeslník.app <faktury@remeslnik.app>";

export interface SendInvoiceEmailParams {
  to: string;
  invoiceNumber: string;
  htmlBody: string;
  pdfBuffer?: Buffer;
  pdfFilename?: string;
}

export async function sendInvoiceEmail({
  to,
  invoiceNumber,
  htmlBody,
  pdfBuffer,
  pdfFilename,
}: SendInvoiceEmailParams) {
  const attachments =
    pdfBuffer && pdfFilename
      ? [{ filename: pdfFilename, content: pdfBuffer }]
      : [];

  return resend.emails.send({
    from: FROM,
    to,
    subject: `Faktura č. ${invoiceNumber}`,
    html: htmlBody,
    attachments,
  });
}

export async function sendOverdueReminderEmail({
  to,
  invoiceNumber,
  htmlBody,
}: {
  to: string;
  invoiceNumber: string;
  htmlBody: string;
}) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: `Upomínka — Faktura č. ${invoiceNumber} je po splatnosti`,
    html: htmlBody,
  });
}
