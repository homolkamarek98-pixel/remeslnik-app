"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewCustomerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());

    const res = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const customer = await res.json();
      router.push(`/customers/${customer.id}`);
    } else {
      setError("Nepodařilo se uložit zákazníka.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Nový zákazník</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Jméno / Název firmy *</Label>
          <Input id="name" name="name" required />
        </div>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" name="email" type="email" />
        </div>
        <div>
          <Label htmlFor="phone">Telefon</Label>
          <Input id="phone" name="phone" />
        </div>
        <div>
          <Label htmlFor="street">Ulice</Label>
          <Input id="street" name="street" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">Město</Label>
            <Input id="city" name="city" />
          </div>
          <div>
            <Label htmlFor="zip">PSČ</Label>
            <Input id="zip" name="zip" />
          </div>
        </div>
        <div>
          <Label htmlFor="ico">IČO</Label>
          <Input id="ico" name="ico" />
        </div>
        <div>
          <Label htmlFor="dic">DIČ</Label>
          <Input id="dic" name="dic" />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={loading}>{loading ? "Ukládám..." : "Uložit zákazníka"}</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Zrušit</Button>
        </div>
      </form>
    </div>
  );
}
