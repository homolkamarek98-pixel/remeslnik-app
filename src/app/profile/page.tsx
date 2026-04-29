"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { BottomNav } from "@/components/layout/BottomNav";

interface Profile {
  name: string;
  email: string;
  companyName: string;
  ico: string;
  dic: string;
  street: string;
  city: string;
  zip: string;
  bankAccount: string;
  bankName: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(
      Array.from(fd.entries()).map(([k, v]) => [k, v === "" ? null : v]),
    );

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Chyba při ukládání");
    } else {
      setSaved(true);
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Načítám...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="p-4 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-6">Profil</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
              {error}
            </div>
          )}
          {saved && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-3">
              Profil uložen ✓
            </div>
          )}

          <section>
            <h2 className="font-semibold text-gray-700 mb-3">Osobní údaje</h2>
            <div className="space-y-3">
              <Field label="Jméno" name="name" defaultValue={profile.name} />
              <Field label="Email" name="email" type="email" defaultValue={profile.email} disabled />
            </div>
          </section>

          <section>
            <h2 className="font-semibold text-gray-700 mb-3">Firemní údaje</h2>
            <div className="space-y-3">
              <Field label="Název firmy / OSVČ" name="companyName" defaultValue={profile.companyName} />
              <Field label="IČO" name="ico" defaultValue={profile.ico} pattern="[0-9]{8}" placeholder="12345678" />
              <Field label="DIČ" name="dic" defaultValue={profile.dic} placeholder="CZ12345678" />
              <Field label="Ulice a číslo" name="street" defaultValue={profile.street} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Město" name="city" defaultValue={profile.city} />
                <Field label="PSČ" name="zip" defaultValue={profile.zip} pattern="[0-9]{5}" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-semibold text-gray-700 mb-3">Bankovní spojení</h2>
            <div className="space-y-3">
              <Field
                label="Číslo účtu (IBAN nebo CZ formát)"
                name="bankAccount"
                defaultValue={profile.bankAccount}
                placeholder="CZ65 0800 0000 1920 0014 5399"
              />
              <Field label="Název banky" name="bankName" defaultValue={profile.bankName} placeholder="Česká spořitelna" />
            </div>
          </section>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl py-3.5 transition-colors disabled:opacity-50"
          >
            {saving ? "Ukládám..." : "Uložit profil"}
          </button>
        </form>

        <button
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className="w-full mt-4 border border-red-200 text-red-600 rounded-xl py-3 text-sm font-medium hover:bg-red-50 transition-colors"
        >
          Odhlásit se
        </button>
      </div>
      <BottomNav />
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  pattern,
  placeholder,
  disabled,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  pattern?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue ?? ""}
        pattern={pattern}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100 disabled:text-gray-400"
      />
    </div>
  );
}
