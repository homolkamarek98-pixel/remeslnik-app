"use server";

import { z } from "zod";

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

  const formspreeUrl = process.env.FORMSPREE_URL;

  if (formspreeUrl) {
    const res = await fetch(formspreeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        "Typ práce": parsed.data.typPrace,
        Lokalita: parsed.data.mestskaCast,
        Popis: parsed.data.popis,
        Jméno: parsed.data.jmeno,
        Telefon: parsed.data.telefon,
        Email: parsed.data.email,
      }),
    });

    if (!res.ok) {
      return {
        success: false,
        errors: {},
        message:
          "Nepodařilo se odeslat. Zkuste to prosím znovu, nebo nás zavolejte.",
      };
    }
  } else {
    // Dev fallback — log to console
    console.log("[poptavka] submission (FORMSPREE_URL not configured):", parsed.data);
  }

  return { success: true };
}
