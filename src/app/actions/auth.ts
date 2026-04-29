"use server";

import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/auth";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { AuthError } from "next-auth";

const registerSchema = z.object({
  name: z.string().min(2, "Jméno musí mít alespoň 2 znaky"),
  email: z.string().email("Neplatný email"),
  password: z.string().min(8, "Heslo musí mít alespoň 8 znaků"),
});

export type ActionState = {
  errors?: Record<string, string[]>;
  message?: string;
};

export async function register(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { errors: { email: ["Tento email je již zaregistrován"] } };
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({ data: { name, email, passwordHash } });

  await signIn("credentials", { email, password, redirectTo: "/profile" });
  return {};
}

export async function login(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: "Neplatný email nebo heslo" };
    }
    throw error;
  }
  return {};
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}
