"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Step = 1 | 2 | 3;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    companyName: "", ico: "", dic: "", street: "", city: "", zip: "",
    bankAccount: "", bankName: "",
  });
  const [customerData, setCustomerData] = useState({
    name: "", email: "", phone: "",
  });
  const [customerId, setCustomerId] = useState("");
  const [jobData, setJobData] = useState({ title: "", description: "" });

  async function saveProfile() {
    setLoading(true);
    const fd = new FormData();
    fd.set("name", profileData.companyName);
    Object.entries(profileData).forEach(([k, v]) => fd.set(k, v));

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileData),
    });
    setLoading(false);
    if (res.ok) setStep(2);
  }

  async function saveCustomer() {
    setLoading(true);
    const res = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customerData),
    });
    setLoading(false);
    if (res.ok) {
      const c = await res.json();
      setCustomerId(c.id);
      setStep(3);
    }
  }

  async function saveJob() {
    setLoading(true);
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...jobData, customerId }),
    });
    setLoading(false);
    if (res.ok) {
      const j = await res.json();
      router.push(`/jobs/${j.id}`);
    }
  }

  const progress = ((step - 1) / 2) * 100;

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Vítejte v Řemeslník.app</h1>
        <p className="text-gray-500">Nastavení zabere 2 minuty</p>
        <div className="mt-4 bg-gray-200 rounded-full h-2">
          <div
            className="bg-orange-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Profil</span><span>Zákazník</span><span>Zakázka</span>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">1. Váš profil</h2>
          <div>
            <Label>Název firmy / Jméno *</Label>
            <Input value={profileData.companyName} onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })} required />
          </div>
          <div>
            <Label>IČO</Label>
            <Input value={profileData.ico} onChange={(e) => setProfileData({ ...profileData, ico: e.target.value })} />
          </div>
          <div>
            <Label>DIČ</Label>
            <Input value={profileData.dic} onChange={(e) => setProfileData({ ...profileData, dic: e.target.value })} />
          </div>
          <div>
            <Label>Číslo účtu (IBAN pro QR platbu)</Label>
            <Input value={profileData.bankAccount} onChange={(e) => setProfileData({ ...profileData, bankAccount: e.target.value })} placeholder="CZ65 0800 0000 1920 0014 5399" />
          </div>
          <Button onClick={saveProfile} disabled={!profileData.companyName || loading}>
            {loading ? "Ukládám..." : "Pokračovat →"}
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">2. První zákazník</h2>
          <div>
            <Label>Jméno / Název firmy *</Label>
            <Input value={customerData.name} onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })} required />
          </div>
          <div>
            <Label>E-mail (pro zasílání faktur)</Label>
            <Input type="email" value={customerData.email} onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })} />
          </div>
          <div>
            <Label>Telefon</Label>
            <Input value={customerData.phone} onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })} />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(1)}>← Zpět</Button>
            <Button onClick={saveCustomer} disabled={!customerData.name || loading}>
              {loading ? "Ukládám..." : "Pokračovat →"}
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">3. První zakázka</h2>
          <div>
            <Label>Název zakázky *</Label>
            <Input value={jobData.title} onChange={(e) => setJobData({ ...jobData, title: e.target.value })} placeholder="např. Malování pokoje" required />
          </div>
          <div>
            <Label>Popis</Label>
            <textarea
              rows={3}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
              value={jobData.description}
              onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(2)}>← Zpět</Button>
            <Button onClick={saveJob} disabled={!jobData.title || loading}>
              {loading ? "Ukládám..." : "Vytvořit zakázku →"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
