"use client";

import { useActionState } from "react";
import { register } from "@/app/actions/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterPage() {
  const [state, action, pending] = useActionState(register, {});

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Vytvořit účet</CardTitle>
        <CardDescription>
          Zaregistrujte se zdarma a začněte vydávat faktury
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Jméno a příjmení</Label>
            <Input
              id="name"
              name="name"
              placeholder="Jan Novák"
              required
              disabled={pending}
            />
            {state.errors?.name && (
              <p className="text-sm text-destructive">{state.errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="jan@example.cz"
              required
              disabled={pending}
            />
            {state.errors?.email && (
              <p className="text-sm text-destructive">{state.errors.email[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Heslo</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Alespoň 8 znaků"
              required
              disabled={pending}
            />
            {state.errors?.password && (
              <p className="text-sm text-destructive">
                {state.errors.password[0]}
              </p>
            )}
          </div>

          {state.message && (
            <p className="text-sm text-destructive">{state.message}</p>
          )}

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Registruji..." : "Zaregistrovat se"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Již máte účet?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Přihlásit se
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
