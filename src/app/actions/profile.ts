"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const profileSchema = z.object({
  name: z.string().min(2, "Jméno musí mít alespoň 2 znaky"),
  companyName: z.string().min(2, "Název firmy musí mít alespoň 2 znaky"),
  ico: z
    .string()
    .regex(/^\d{8}$/, "IČO musí mít přesně 8 číslic")
    .optional()
    .or(z.literal("")),
  dic: z
    .string()
    .regex(/^CZ\d{8,10}$/, "DIČ musí být ve formátu CZ12345678")
    .optional()
    .or(z.literal("")),
  street: z.string().optional(),
  city: z.string().optional(),
  zip: z
    .string()
    .regex(/^\d{3} ?\d{2}$/, "PSČ musí být ve formátu 123 45")
    .optional()
    .or(z.literal("")),
  bankAccount: z.string().optional(),
  bankName: z.string().optional(),
});

export type ProfileState = {
  errors?: Record<string, string[]>;
  success?: boolean;
  message?: string;
};

export async function updateProfile(
  _prevState: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  const session = await auth();
  if (!session?.user?.id) return { message: "Nejste přihlášeni" };

  const raw = {
    name: formData.get("name"),
    companyName: formData.get("companyName"),
    ico: formData.get("ico"),
    dic: formData.get("dic"),
    street: formData.get("street"),
    city: formData.get("city"),
    zip: formData.get("zip"),
    bankAccount: formData.get("bankAccount"),
    bankName: formData.get("bankName"),
  };

  const parsed = profileSchema.safeParse(raw);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { name, companyName, ico, dic, street, city, zip, bankAccount, bankName } =
    parsed.data;

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name,
      companyName,
      ico: ico || null,
      dic: dic || null,
      street: street || null,
      city: city || null,
      zip: zip || null,
      bankAccount: bankAccount || null,
      bankName: bankName || null,
    },
  });

  revalidatePath("/profile");
  revalidatePath("/dashboard");
  return { success: true };
}
