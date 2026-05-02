"use server";

import { z } from "zod";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const PoptavkaSchema = z.object({
  typPrace: z.string().min(1, "Vyberte typ práce"),
  mestskaCast: z.string().min(1, "Vyberte lokalitu"),
  popis: z.string().min(20, "Popište práci — minimálně 20 znaků").max(1000),
  jmeno: z.string().min(1, "Zadejte své jméno"),
  telefon: z
    .string()
    .min(1, "Zadejte telefonní číslo")
    .regex(
      /^\+?[0-9 ]{9,16}$/,
      "Zadejte platné telefonní číslo (např. +420 773 000 000)"
    ),
  email: z.string().email("Zadejte platnou e-mailovou adresu"),
});

export type PoptavkaData = z.infer<typeof PoptavkaSchema>;

export type PoptavkaResult =
  | { success: true }
  | { success: false; errors: Partial<Record<keyof PoptavkaData, string>>; message?: string };

function buildEmailHtml(d: PoptavkaData): string {
  const ts = new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" });
  return `<!DOCTYPE html>
<html lang="cs">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F6F2EC;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F6F2EC;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
        <!-- Header -->
        <tr>
          <td style="background:#1E2D40;padding:24px 32px">
            <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff">
              Řemeslník<span style="color:#E07B39">●</span>app
            </p>
            <p style="margin:6px 0 0;font-size:14px;color:#9CA3AF">Nová poptávka od zákazníka</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px">
            <h1 style="margin:0 0 24px;font-size:22px;color:#1E2D40;font-weight:700">
              📋 ${d.typPrace}
            </h1>

            <!-- Fields -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #F3F4F6">
                  <p style="margin:0 0 2px;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#9CA3AF;font-weight:600">Obor</p>
                  <p style="margin:0;font-size:15px;color:#111827;font-weight:600">${escHtml(d.typPrace)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #F3F4F6">
                  <p style="margin:0 0 2px;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#9CA3AF;font-weight:600">Lokalita</p>
                  <p style="margin:0;font-size:15px;color:#111827">${escHtml(d.mestskaCast)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #F3F4F6">
                  <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#9CA3AF;font-weight:600">Popis práce</p>
                  <p style="margin:0;font-size:15px;color:#111827;white-space:pre-wrap;line-height:1.6">${escHtml(d.popis)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #F3F4F6">
                  <p style="margin:0 0 2px;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#9CA3AF;font-weight:600">Jméno</p>
                  <p style="margin:0;font-size:15px;color:#111827">${escHtml(d.jmeno)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #F3F4F6">
                  <p style="margin:0 0 2px;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#9CA3AF;font-weight:600">Telefon</p>
                  <p style="margin:0;font-size:16px;color:#1E2D40;font-weight:700">
                    <a href="tel:${escHtml(d.telefon.replace(/\s/g, ""))}" style="color:#E07B39;text-decoration:none">${escHtml(d.telefon)}</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0">
                  <p style="margin:0 0 2px;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#9CA3AF;font-weight:600">E-mail zákazníka</p>
                  <p style="margin:0;font-size:15px;color:#111827">
                    <a href="mailto:${escHtml(d.email)}" style="color:#E07B39;text-decoration:none">${escHtml(d.email)}</a>
                  </p>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <div style="margin-top:28px;padding:20px;background:#FEF3C7;border-radius:8px;border-left:4px solid #E07B39">
              <p style="margin:0;font-size:14px;color:#92400E;font-weight:600">⚡ Akce do 24 hodin</p>
              <p style="margin:6px 0 0;font-size:14px;color:#92400E">Kontaktujte zákazníka telefonicky nebo e-mailem a potvrďte poptávku.</p>
            </div>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#F9FAFB;padding:16px 32px;border-top:1px solid #F3F4F6">
            <p style="margin:0;font-size:12px;color:#9CA3AF;text-align:center">
              Přijato: ${ts} · <a href="https://remeslnik.app" style="color:#9CA3AF">remeslnik.app</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function submitPoptavka(
  data: PoptavkaData
): Promise<PoptavkaResult> {
  const parsed = PoptavkaSchema.safeParse(data);

  if (!parsed.success) {
    const errors: Partial<Record<keyof PoptavkaData, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof PoptavkaData;
      if (!errors[key]) errors[key] = issue.message;
    }
    return { success: false, errors };
  }

  const d = parsed.data;

  // Always persist to database first
  await prisma.poptavka.create({
    data: {
      typPrace: d.typPrace,
      mestskaCast: d.mestskaCast,
      popis: d.popis,
      jmeno: d.jmeno,
      telefon: d.telefon,
      email: d.email,
    },
  });

  // Send email notification via Resend (non-fatal)
  const resendKey = process.env.RESEND_API_KEY;
  const operatorEmail = process.env.OPERATOR_EMAIL ?? "homolkamarek98@gmail.com";

  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Řemeslník.app <onboarding@resend.dev>",
        to: operatorEmail,
        replyTo: d.email,
        subject: `Nová poptávka: ${d.typPrace} — ${d.mestskaCast.split("—")[0].trim()}`,
        html: buildEmailHtml(d),
      });
    } catch (err) {
      // Email failure is non-fatal — submission already persisted to DB
      console.error("[poptavka] Resend error:", err);
    }
  }

  return { success: true };
}
