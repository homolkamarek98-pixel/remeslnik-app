import type { InvoiceData } from "@/lib/invoice";
import { formatCzk, buildQrPaymentString } from "@/lib/utils";

/** Returns plain HTML for invoice email — React Email syntax for Resend */
export function invoiceEmailHtml(data: InvoiceData, bankAccount?: string | null): string {
  const qrString =
    bankAccount && data.totalInclVat > 0
      ? buildQrPaymentString({
          iban: bankAccount,
          amount: data.totalInclVat,
          variableSymbol: data.invoiceNumber.replace("-", ""),
        })
      : null;

  const dueDate = new Intl.DateTimeFormat("cs-CZ").format(data.dueDate);

  return `<!DOCTYPE html>
<html lang="cs">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: Arial, sans-serif; background: #f9fafb; margin: 0; padding: 20px;">
<div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
  <div style="background: #f97316; padding: 24px 32px;">
    <h1 style="color: white; margin: 0; font-size: 22px;">Faktura č. ${data.invoiceNumber}</h1>
    <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0;">od ${data.supplier.name}</p>
  </div>

  <div style="padding: 32px;">
    <p>Dobrý den,</p>
    <p>v příloze naleznete fakturu č. <strong>${data.invoiceNumber}</strong> za provedené práce.</p>

    <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin: 20px 0;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="color: #6b7280; font-size: 13px; padding: 4px 0;">Faktura č.:</td>
          <td style="font-weight: 600; text-align: right;">${data.invoiceNumber}</td>
        </tr>
        <tr>
          <td style="color: #6b7280; font-size: 13px; padding: 4px 0;">Splatnost:</td>
          <td style="font-weight: 600; text-align: right;">${dueDate}</td>
        </tr>
        <tr>
          <td style="color: #6b7280; font-size: 13px; padding: 4px 0;">K úhradě:</td>
          <td style="font-weight: 700; font-size: 20px; color: #f97316; text-align: right;">${formatCzk(data.totalInclVat)}</td>
        </tr>
        ${
          data.supplier.bankAccount
            ? `<tr>
          <td style="color: #6b7280; font-size: 13px; padding: 4px 0;">Bankovní spojení:</td>
          <td style="font-weight: 600; text-align: right;">${data.supplier.bankAccount}</td>
        </tr>`
            : ""
        }
        ${
          data.invoiceNumber
            ? `<tr>
          <td style="color: #6b7280; font-size: 13px; padding: 4px 0;">Variabilní symbol:</td>
          <td style="font-weight: 600; text-align: right;">${data.invoiceNumber.replace("-", "")}</td>
        </tr>`
            : ""
        }
      </table>
    </div>

    ${
      qrString
        ? `<div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin: 16px 0;">
      <p style="font-size: 12px; color: #1d4ed8; margin: 0 0 4px; font-weight: 600;">QR Platba</p>
      <p style="font-size: 11px; color: #1d4ed8; font-family: monospace; margin: 0; word-break: break-all;">${qrString}</p>
    </div>`
        : ""
    }

    <p style="color: #6b7280; font-size: 13px;">PDF faktura je přiložena k tomuto emailu.</p>

    <p>S pozdravem,<br><strong>${data.supplier.name}</strong></p>
  </div>

  <div style="background: #f9fafb; padding: 16px 32px; border-top: 1px solid #e5e7eb;">
    <p style="color: #9ca3af; font-size: 11px; margin: 0; text-align: center;">
      Tento email byl automaticky vygenerován systémem Řemeslník.app
    </p>
  </div>
</div>
</body>
</html>`;
}

export function overdueReminderHtml(
  invoiceNumber: string,
  amount: number,
  dueDate: Date,
  supplierName: string,
): string {
  const dueDateStr = new Intl.DateTimeFormat("cs-CZ").format(dueDate);
  return `<!DOCTYPE html>
<html lang="cs">
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; background: #f9fafb; margin: 0; padding: 20px;">
<div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden;">
  <div style="background: #ef4444; padding: 24px 32px;">
    <h1 style="color: white; margin: 0; font-size: 20px;">Upomínka k platbě</h1>
  </div>
  <div style="padding: 32px;">
    <p>Dobrý den,</p>
    <p>dovolujeme si Vás upozornit, že faktura č. <strong>${invoiceNumber}</strong> je po datu splatnosti.</p>
    <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin: 20px 0;">
      <p style="margin: 0; color: #991b1b;">Dlužná částka: <strong>${formatCzk(amount)}</strong> (splatnost ${dueDateStr})</p>
    </div>
    <p>Prosím uhraďte co nejdříve nebo nás kontaktujte.</p>
    <p>S pozdravem,<br><strong>${supplierName}</strong></p>
  </div>
</div>
</body>
</html>`;
}
