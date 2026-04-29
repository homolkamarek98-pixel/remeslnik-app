"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
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

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, {});

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Přihlásit se</CardTitle>
        <CardDescription>
          Přihlaste se do svého účtu Řemeslník.app
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Heslo</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              disabled={pending}
            />
          </div>

          {state.message && (
            <p className="text-sm text-red-600">{state.message}</p>
          )}

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Přihlašuji..." : "Přihlásit se"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Nemáte účet?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Zaregistrovat se zdarma
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
