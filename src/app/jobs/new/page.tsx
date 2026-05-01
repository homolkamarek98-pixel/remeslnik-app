"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PlusIcon, TrashIcon } from "lucide-react";

interface Customer {
  id: string;
  name: string;
}

interface Item {
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number; // CZK (not haléře) for UX
  vatRate: number;
}

function NewJobForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedCustomer = searchParams.get("customerId");

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([
    { description: "", quantity: 1, unit: "ks", unitPrice: 0, vatRate: 21 },
  ]);

  useEffect(() => {
    fetch("/api/customers")
      .then((r) => r.json())
      .then(setCustomers);
  }, []);

  function addItem() {
    setItems((prev) => [
      ...prev,
      { description: "", quantity: 1, unit: "ks", unitPrice: 0, vatRate: 21 },
    ]);
  }

  function removeItem(idx: number) {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  }

  function updateItem(idx: number, field: keyof Item, value: string | number) {
    setItems((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item)),
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerId: fd.get("customerId"),
        title: fd.get("title"),
        description: fd.get("description") || undefined,
        scheduledDate: fd.get("scheduledDate")
          ? new Date(fd.get("scheduledDate") as string).toISOString()
          : undefined,
        items: items
          .filter((i) => i.description.trim())
          .map((i) => ({
            ...i,
            unitPrice: Math.round(i.unitPrice * 100), // CZK → haléře
          })),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Chyba při ukládání");
      setLoading(false);
      return;
    }

    const job = await res.json();
    router.push(`/jobs/${job.id}`);
  }

  return (
    <div className="p-4 max-w-lg mx-auto pb-24">
      <h1 className="text-2xl font-bold mb-6">Nová zakázka</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Zákazník *</label>
          <select
            name="customerId"
            required
            defaultValue={preselectedCustomer ?? ""}
            className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="" disabled>
              Vyberte zákazníka...
            </option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Název zakázky *</label>
          <input
            name="title"
            required
            className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Instalace kotle, malování obývacího pokoje..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Datum</label>
          <input
            name="scheduledDate"
            type="date"
            className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Popis</label>
          <textarea
            name="description"
            rows={3}
            className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Job items */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Položky</label>
            <button
              type="button"
              onClick={addItem}
              className="text-orange-500 text-sm flex items-center gap-1 font-medium"
            >
              <PlusIcon className="w-4 h-4" /> Přidat
            </button>
          </div>
          <div className="space-y-3">
            {items.map((item, idx) => (
              <div key={idx} className="border rounded-xl p-3 space-y-2">
                <div className="flex items-start gap-2">
                  <input
                    value={item.description}
                    onChange={(e) => updateItem(idx, "description", e.target.value)}
                    placeholder="Popis práce / materiálu"
                    className="flex-1 border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      className="text-red-400 p-1"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(idx, "quantity", parseFloat(e.target.value))}
                    min="0.01"
                    step="0.01"
                    className="border rounded-lg px-2 py-1.5 text-sm text-center"
                    placeholder="Mn."
                  />
                  <input
                    value={item.unit}
                    onChange={(e) => updateItem(idx, "unit", e.target.value)}
                    className="border rounded-lg px-2 py-1.5 text-sm text-center"
                    placeholder="ks"
                  />
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(idx, "unitPrice", parseFloat(e.target.value))}
                    min="0"
                    step="1"
                    className="border rounded-lg px-2 py-1.5 text-sm text-center"
                    placeholder="Kč"
                  />
                  <select
                    value={item.vatRate}
                    onChange={(e) => updateItem(idx, "vatRate", parseInt(e.target.value))}
                    className="border rounded-lg px-1 py-1.5 text-sm text-center"
                  >
                    <option value={0}>0%</option>
                    <option value={15}>15%</option>
                    <option value={21}>21%</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl py-3.5 transition-colors disabled:opacity-50"
        >
          {loading ? "Ukládám..." : "Vytvořit zakázku"}
        </button>
      </form>
    </div>
  );
}

export default function NewJobPage() {
  return (
    <Suspense>
      <NewJobForm />
    </Suspense>
  );
}
