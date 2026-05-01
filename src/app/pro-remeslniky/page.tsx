import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, ShieldCheck, TrendingUp } from "lucide-react";
import { RemeslnikForm } from "./RemeslnikForm";

export const metadata: Metadata = {
  title: "Pro řemeslníky — Řemeslník.app",
  description:
    "Získej nové zákazníky v Praze bez reklamy. Zaregistruj se zdarma a dostávej poptávky přímo na tvůj obor.",
};

export default function ProRemeslnikyPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F6F2EC" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-16">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm transition-colors mr-4"
              style={{ color: "#6B7280" }}
            >
              <ArrowLeft className="size-4" />
              Zpět
            </Link>
            <span className="text-base font-semibold" style={{ fontFamily: "var(--font-space-grotesk)", color: "#1E2D40" }}>
              Pro řemeslníky
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          {/* Value proposition */}
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#E07B39", fontFamily: "var(--font-space-grotesk)" }}>
              Bez reklamy. Bez provize za zprostředkování.
            </p>
            <h1 className="mb-3" style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: "1.5rem", color: "#1E2D40", lineHeight: 1.2 }}>
              Získej nové zákazníky v Praze
            </h1>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B7280", lineHeight: 1.65 }}>
              Řemeslník.app zprostředkovává poptávky od ověřených zákazníků.
              Stačí se přihlásit — zbytek zařídíme my.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {[
                { icon: Clock, title: "Do 24 hodin", desc: "Poptávky dostaneš rychle, zákazník čeká na odpověď" },
                { icon: ShieldCheck, title: "Prověření zákazníci", desc: "Zákazníci uvádí kontakt i popis práce předem" },
                { icon: TrendingUp, title: "Zdarma start", desc: "Registrace nic nestojí. Platba za výsledek teprve zvažujeme." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white border rounded-xl p-4 text-sm" style={{ borderColor: "#E5E7EB" }}>
                  <Icon className="size-5 mb-2" style={{ color: "#E07B39" }} />
                  <p className="font-semibold mb-1" style={{ color: "#1E2D40", fontFamily: "var(--font-space-grotesk)" }}>{title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form heading */}
          <div className="mb-6">
            <h2 className="mb-1" style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: "1.25rem", color: "#1E2D40" }}>
              Přihlásit se jako řemeslník
            </h2>
            <p className="text-sm" style={{ color: "#6B7280" }}>Vyplnění trvá 3 minuty. Ozveme se do 24 hodin.</p>
          </div>

          <RemeslnikForm />
        </div>
      </main>
    </div>
  );
}
