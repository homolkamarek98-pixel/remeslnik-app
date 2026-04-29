"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCustomerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(
      Array.from(fd.entries()).filter(([, v]) => v !== ""),
    );

    const res = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Chyba při ukládání");
      setLoading(false);
      return;
    }

    const customer = await res.json();
    router.push(`/customers/${customer.id}`);
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Nový zákazník</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
            {error}
          </div>
        )}

        <Field label="Jméno / firma *" name="name" required />
        <Field label="Email" name="email" type="email" />
        <Field label="Telefon" name="phone" type="tel" />
        <Field label="Ulice a číslo" name="street" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Město" name="city" />
          <Field label="PSČ" name="zip" pattern="[0-9]{5}" />
        </div>
        <Field label="IČO" name="ico" pattern="[0-9]{8}" placeholder="12345678" />
        <Field label="DIČ" name="dic" placeholder="CZ12345678" />
        <Field label="Poznámky" name="notes" as="textarea" />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl py-3.5 transition-colors disabled:opacity-50"
        >
          {loading ? "Ukládám..." : "Uložit zákazníka"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  pattern,
  placeholder,
  as,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  pattern?: string;
  placeholder?: string;
  as?: "textarea";
}) {
  const cls =
    "w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500";
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {as === "textarea" ? (
        <textarea name={name} rows={3} className={cls} />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          pattern={pattern}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </div>
  );
}
