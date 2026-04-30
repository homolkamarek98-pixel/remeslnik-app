"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Suspense } from "react";

type Customer = { id: string; name: string };

function NewJobForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedCustomerId = searchParams.get("customerId") ?? "";

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/customers").then((r) => r.json()).then(setCustomers);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const body = {
      customerId: fd.get("customerId"),
      title: fd.get("title"),
      description: fd.get("description"),
      scheduledDate: fd.get("scheduledDate") || undefined,
    };

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const job = await res.json();
      router.push(`/jobs/${job.id}`);
    } else {
      setError("Nepodařilo se vytvořit zakázku.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Nová zakázka</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="customerId">Zákazník *</Label>
          <select
            id="customerId"
            name="customerId"
            defaultValue={preselectedCustomerId}
            required
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          >
            <option value="">— vyberte zákazníka —</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="title">Název zakázky *</Label>
          <Input id="title" name="title" required placeholder="např. Oprava střechy" />
        </div>
        <div>
          <Label htmlFor="description">Popis</Label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
            placeholder="Volitelný popis zakázky"
          />
        </div>
        <div>
          <Label htmlFor="scheduledDate">Datum realizace</Label>
          <Input id="scheduledDate" name="scheduledDate" type="date" />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={loading}>{loading ? "Ukládám..." : "Vytvořit zakázku"}</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Zrušit</Button>
        </div>
      </form>
    </div>
  );
}

export default function NewJobPage() {
  return (
    <Suspense fallback={<div>Načítám...</div>}>
      <NewJobForm />
    </Suspense>
  );
}
