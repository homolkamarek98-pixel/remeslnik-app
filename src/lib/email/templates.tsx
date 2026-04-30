import { formatCzk } from "@/lib/utils";

export function invoiceEmailHtml({
  invoiceNumber,
  customerName,
  totalInclVat,
  dueDate,
  pdfUrl,
  qrString,
}: {
  invoiceNumber: string;
  customerName: string;
  totalInclVat: number;
  dueDate: Date;
  pdfUrl?: string;
  qrString?: string;
}): string {
  const dueDateStr = dueDate.toLocaleDateString("cs-CZ");
  const amount = formatCzk(totalInclVat);

  return `<!DOCTYPE html>
<html lang="cs">
<head><meta charset="UTF-8"><title>Faktura ${invoiceNumber}</title></head>
<body style="font-family:sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px">
  <h1 style="font-size:20px;font-weight:bold;margin-bottom:8px">Faktura ${invoiceNumber}</h1>
  <p style="color:#555;margin-bottom:24px">Dobrý den, ${customerName},</p>
  <p>zasíláme Vám fakturu za naše služby.</p>
  <table style="width:100%;border-collapse:collapse;margin:24px 0">
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #e5e5e5;color:#555">Číslo faktury</td>
      <td style="padding:8px 0;border-bottom:1px solid #e5e5e5;text-align:right;font-weight:bold">${invoiceNumber}</td>
    </tr>
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #e5e5e5;color:#555">Celková částka</td>
      <td style="padding:8px 0;border-bottom:1px solid #e5e5e5;text-align:right;font-weight:bold;font-size:18px">${amount}</td>
    </tr>
    <tr>
      <td style="padding:8px 0;color:#555">Splatnost</td>
      <td style="padding:8px 0;text-align:right">${dueDateStr}</td>
    </tr>
  </table>
  ${pdfUrl ? `<p><a href="${pdfUrl}" style="background:#1a1a1a;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block">Stáhnout PDF fakturu</a></p>` : ""}
  ${qrString ? `<p style="margin-top:24px;color:#555;font-size:13px">Pro rychlou platbu naskenujte QR kód v PDF.</p>` : ""}
  <hr style="border:none;border-top:1px solid #e5e5e5;margin:32px 0">
  <p style="font-size:12px;color:#999">Tato zpráva byla vygenerována automaticky systémem Řemeslník.app</p>
</body>
</html>`;
}

export function overdueReminderHtml({
  invoiceNumber,
  customerName,
  totalInclVat,
  dueDate,
  pdfUrl,
}: {
  invoiceNumber: string;
  customerName: string;
  totalInclVat: number;
  dueDate: Date;
  pdfUrl?: string;
}): string {
  const dueDateStr = dueDate.toLocaleDateString("cs-CZ");
  const amount = formatCzk(totalInclVat);

  return `<!DOCTYPE html>
<html lang="cs">
<head><meta charset="UTF-8"><title>Upomínka — faktura ${invoiceNumber}</title></head>
<body style="font-family:sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px">
  <h1 style="font-size:20px;font-weight:bold;margin-bottom:8px;color:#dc2626">Upomínka nezaplacené faktury</h1>
  <p style="color:#555;margin-bottom:24px">Dobrý den, ${customerName},</p>
  <p>dovolujeme si Vás upomenout, že níže uvedená faktura nebyla dosud uhrazena.</p>
  <table style="width:100%;border-collapse:collapse;margin:24px 0">
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #e5e5e5;color:#555">Číslo faktury</td>
      <td style="padding:8px 0;border-bottom:1px solid #e5e5e5;text-align:right;font-weight:bold">${invoiceNumber}</td>
    </tr>
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #e5e5e5;color:#555">Dlužná částka</td>
      <td style="padding:8px 0;border-bottom:1px solid #e5e5e5;text-align:right;font-weight:bold;font-size:18px;color:#dc2626">${amount}</td>
    </tr>
    <tr>
      <td style="padding:8px 0;color:#555">Splatnost</td>
      <td style="padding:8px 0;text-align:right;color:#dc2626">${dueDateStr}</td>
    </tr>
  </table>
  ${pdfUrl ? `<p><a href="${pdfUrl}" style="background:#dc2626;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block">Zobrazit fakturu</a></p>` : ""}
  <p style="margin-top:24px">Prosíme o neprodlené uhrazení. V případě, že jste platbu již odeslali, tuto zprávu ignorujte.</p>
  <hr style="border:none;border-top:1px solid #e5e5e5;margin:32px 0">
  <p style="font-size:12px;color:#999">Tato zpráva byla vygenerována automaticky systémem Řemeslník.app</p>
</body>
</html>`;
}
