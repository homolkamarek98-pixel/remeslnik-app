"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STEPS = ["profil", "zákazník", "zakázka"] as const;
type Step = (typeof STEPS)[number];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("profil");
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);

  async function handleProfileSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(
      Array.from(fd.entries()).filter(([, v]) => v !== ""),
    );

    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setLoading(false);
    setStep("zákazník");
  }

  async function handleCustomerSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(
      Array.from(fd.entries()).filter(([, v]) => v !== ""),
    );

    const res = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const customer = await res.json();
    setCustomerId(customer.id);
    setLoading(false);
    setStep("zakázka");
  }

  async function handleJobSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const body: Record<string, unknown> = Object.fromEntries(
      Array.from(fd.entries()).filter(([, v]) => v !== ""),
    );
    body.customerId = customerId;

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const job = await res.json();
    setLoading(false);
    router.push(`/jobs/${job.id}`);
  }

  const stepIndex = STEPS.indexOf(step);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {STEPS.map((s, idx) => (
            <div
              key={s}
              className={`flex-1 h-1.5 rounded-full transition-colors ${
                idx <= stepIndex ? "bg-orange-500" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {step === "profil" && (
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="mb-4">
              <h1 className="text-2xl font-bold">Váš profil</h1>
              <p className="text-gray-500 text-sm mt-1">Krok 1/3 — Nastavte firemní údaje</p>
            </div>
            <input name="companyName" required placeholder="Název firmy nebo OSVČ *" className={inputCls} />
            <input name="ico" placeholder="IČO (8 číslic)" pattern="[0-9]{8}" className={inputCls} />
            <input name="bankAccount" placeholder="IBAN nebo číslo účtu" className={inputCls} />
            <button type="submit" disabled={loading} className={btnCls}>
              {loading ? "Ukládám..." : "Pokračovat →"}
            </button>
          </form>
        )}

        {step === "zákazník" && (
          <form onSubmit={handleCustomerSave} className="space-y-4">
            <div className="mb-4">
              <h1 className="text-2xl font-bold">První zákazník</h1>
              <p className="text-gray-500 text-sm mt-1">Krok 2/3 — Přidejte zákazníka</p>
            </div>
            <input name="name" required placeholder="Jméno zákazníka *" className={inputCls} />
            <input name="email" type="email" placeholder="Email (pro zasílání faktur)" className={inputCls} />
            <input name="phone" type="tel" placeholder="Telefon" className={inputCls} />
            <button type="submit" disabled={loading} className={btnCls}>
              {loading ? "Ukládám..." : "Pokračovat →"}
            </button>
          </form>
        )}

        {step === "zakázka" && (
          <form onSubmit={handleJobSave} className="space-y-4">
            <div className="mb-4">
              <h1 className="text-2xl font-bold">První zakázka</h1>
              <p className="text-gray-500 text-sm mt-1">Krok 3/3 — Vytvořte zakázku</p>
            </div>
            <input name="title" required placeholder="Název zakázky *" className={inputCls} />
            <input name="scheduledDate" type="date" className={inputCls} />
            <button type="submit" disabled={loading} className={btnCls}>
              {loading ? "Ukládám..." : "Vytvořit zakázku →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const inputCls =
  "w-full border rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500";
const btnCls =
  "w-full bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl py-3.5 transition-colors disabled:opacity-50";
