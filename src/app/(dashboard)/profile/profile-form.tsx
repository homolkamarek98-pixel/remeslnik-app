"use client";

import { useActionState } from "react";
import { updateProfile } from "@/app/actions/profile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type UserProfile = {
  name: string | null;
  companyName: string | null;
  ico: string | null;
  dic: string | null;
  street: string | null;
  city: string | null;
  zip: string | null;
  bankAccount: string | null;
  bankName: string | null;
};

export function ProfileForm({ user }: { user: UserProfile | null }) {
  const [state, action, pending] = useActionState(updateProfile, {});

  return (
    <form action={action} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Základní údaje</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Jméno a příjmení</Label>
            <Input
              id="name"
              name="name"
              defaultValue={user?.name ?? ""}
              required
              disabled={pending}
            />
            {state.errors?.name && (
              <p className="text-sm text-destructive">{state.errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Název firmy / OSVČ</Label>
            <Input
              id="companyName"
              name="companyName"
              placeholder="Jan Novák — instalatérství"
              defaultValue={user?.companyName ?? ""}
              required
              disabled={pending}
            />
            {state.errors?.companyName && (
              <p className="text-sm text-destructive">
                {state.errors.companyName[0]}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daňové údaje</CardTitle>
          <CardDescription>
            Tyto údaje se zobrazí na každé faktuře
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ico">IČO</Label>
              <Input
                id="ico"
                name="ico"
                placeholder="12345678"
                defaultValue={user?.ico ?? ""}
                maxLength={8}
                disabled={pending}
              />
              {state.errors?.ico && (
                <p className="text-sm text-destructive">{state.errors.ico[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="dic">
                DIČ{" "}
                <span className="text-gray-400 font-normal text-xs">
                  (jen plátci DPH)
                </span>
              </Label>
              <Input
                id="dic"
                name="dic"
                placeholder="CZ12345678"
                defaultValue={user?.dic ?? ""}
                disabled={pending}
              />
              {state.errors?.dic && (
                <p className="text-sm text-destructive">{state.errors.dic[0]}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Adresa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street">Ulice a číslo popisné</Label>
            <Input
              id="street"
              name="street"
              placeholder="Hlavní 42"
              defaultValue={user?.street ?? ""}
              disabled={pending}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="city">Město</Label>
              <Input
                id="city"
                name="city"
                placeholder="Praha"
                defaultValue={user?.city ?? ""}
                disabled={pending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">PSČ</Label>
              <Input
                id="zip"
                name="zip"
                placeholder="110 00"
                defaultValue={user?.zip ?? ""}
                maxLength={6}
                disabled={pending}
              />
              {state.errors?.zip && (
                <p className="text-sm text-destructive">{state.errors.zip[0]}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bankovní spojení</CardTitle>
          <CardDescription>
            Pro QR platbu na faktuře (formát: 123456-7890123456/0300 nebo IBAN)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bankAccount">Číslo účtu</Label>
            <Input
              id="bankAccount"
              name="bankAccount"
              placeholder="123456-7890123456/0300"
              defaultValue={user?.bankAccount ?? ""}
              disabled={pending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bankName">Název banky</Label>
            <Input
              id="bankName"
              name="bankName"
              placeholder="Česká spořitelna"
              defaultValue={user?.bankName ?? ""}
              disabled={pending}
            />
          </div>
        </CardContent>
      </Card>

      {state.success && (
        <p className="text-sm text-success font-medium">
          ✓ Profil byl úspěšně uložen
        </p>
      )}
      {state.message && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Ukládám..." : "Uložit profil"}
      </Button>
    </form>
  );
}
