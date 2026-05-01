import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { RemeslnikForm } from "./RemeslnikForm";

export const metadata: Metadata = {
  title: "Pro řemeslníky — Řemeslník.app",
  description:
    "Získejte nové zákazníky v Praze bez reklamy. Zaregistrujte se zdarma a dostávejte poptávky přímo na váš obor.",
};

export default function ProRemeslnikyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-14">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-navy-700 transition-colors mr-4"
            >
              <ArrowLeft className="size-4" />
              Zpět
            </Link>
            <span className="text-base font-semibold text-gray-900">Pro řemeslníky</span>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          {/* Value proposition */}
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-mkp-amber-600 mb-3">
              Bez reklamy. Bez provize za zprostředkování.
            </p>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Získejte nové zákazníky v Praze
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Řemeslník.app zprostředkovává poptávky od ověřených zákazníků.
              Stačí se přihlásit — zbytek zařídíme my.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {[
                {
                  icon: Clock,
                  title: "Do 24 hodin",
                  desc: "Poptávky dostanete rychle, zákazník čeká na odpověď",
                },
                {
                  icon: CheckCircle,
                  title: "Prověření zákazníci",
                  desc: "Zákazníci uvádí kontakt i popis práce předem",
                },
                {
                  icon: TrendingUp,
                  title: "Zdarma start",
                  desc: "Registrace nic nestojí. Platba za výsledek teprve zvažujeme.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white border border-gray-100 rounded-xl p-4 text-sm shadow-sm">
                  <Icon className="size-5 text-navy-500 mb-2" />
                  <p className="font-semibold text-gray-900 mb-1">{title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form heading */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Přihlásit se jako řemeslník
            </h2>
            <p className="text-sm text-gray-500">
              Vyplnění trvá 3 minuty. Ozveme se vám do 24 hodin.
            </p>
          </div>

          <RemeslnikForm />
        </div>
      </main>
    </div>
  );
}
