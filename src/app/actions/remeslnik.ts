"use server";

import { z } from "zod";

const RemeslnikSchema = z.object({
  obor: z.string().min(1, "Vyberte svůj obor"),
  rokZalozeni: z.string().min(1, "Zadejte roky zkušeností"),
  lokality: z.string().min(1, "Vyberte lokality, kde působíte"),
  jmeno: z.string().min(1, "Zadejte jméno a příjmení"),
  telefon: z
    .string()
    .min(1, "Zadejte telefonní číslo")
    .regex(
      /^\+?[0-9 ]{9,16}$/,
      "Zadejte platné telefonní číslo (např. +420 773 000 000)"
    ),
  email: z.string().email("Zadejte platnou e-mailovou adresu"),
  cenikInfo: z.string().max(500, "Maximálně 500 znaků").optional(),
});

export type RemeslnikData = z.infer<typeof RemeslnikSchema>;

export type RemeslnikResult =
  | { success: true }
  | { success: false; errors: Partial<Record<keyof RemeslnikData, string>>; message?: string };

export async function submitRemeslnik(
  data: RemeslnikData
): Promise<RemeslnikResult> {
  const parsed = RemeslnikSchema.safeParse(data);

  if (!parsed.success) {
    const errors: Partial<Record<keyof RemeslnikData, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof RemeslnikData;
      if (!errors[key]) errors[key] = issue.message;
    }
    return { success: false, errors };
  }

  const formspreeUrl = process.env.FORMSPREE_SUPPLY_URL;

  if (formspreeUrl) {
    const res = await fetch(formspreeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Obor: parsed.data.obor,
        "Roky zkušeností": parsed.data.rokZalozeni,
        Lokality: parsed.data.lokality,
        Jméno: parsed.data.jmeno,
        Telefon: parsed.data.telefon,
        Email: parsed.data.email,
        "Orientační ceník": parsed.data.cenikInfo ?? "",
      }),
    });

    if (!res.ok) {
      return {
        success: false,
        errors: {},
        message: "Nepodařilo se odeslat přihlášku. Zkuste to prosím znovu.",
      };
    }
  } else {
    console.log("[remeslnik] submission (FORMSPREE_SUPPLY_URL not configured):", parsed.data);
  }

  return { success: true };
}
