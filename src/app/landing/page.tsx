import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Řemeslník.app — Správa zakázek a faktur pro řemeslníky",
  description:
    "Vytvořte zakázku na telefonu, dokončete ji v terénu, zákazník dostane fakturu automaticky. Pro instalatéry, elektrikáře, malíře a všechny řemeslníky v ČR.",
  openGraph: {
    title: "Řemeslník.app",
    description: "Správa zakázek a faktur pro řemeslníky. Automatická faktura při dokončení.",
    type: "website",
  },
};

const FEATURES = [
  {
    icon: "📱",
    title: "Zakázky na telefonu",
    desc: "Vytvořte zakázku přímo u zákazníka. Naplánujte termín, přidejte položky práce i materiálu.",
  },
  {
    icon: "🧾",
    title: "Automatická faktura",
    desc: "Jakmile zakázku dokončíte, zákazník dostane fakturu emailem s PDF a QR kódem k platbě.",
  },
  {
    icon: "📊",
    title: "Přehled tržeb",
    desc: "Vidíte co máte na dnešek naplánováno, neuhrazené faktury a měsíční tržby.",
  },
  {
    icon: "⚡",
    title: "DPH dle §29 ZDPH",
    desc: "Faktury splňují české legislativní požadavky. IČO, DIČ, rekapitulace DPH, QR platba.",
  },
  {
    icon: "📸",
    title: "Fotodokumentace",
    desc: "Fotografie před a po zakázce pro ochranu před reklamacemi.",
  },
  {
    icon: "🔔",
    title: "Upomínky po splatnosti",
    desc: "Systém automaticky posílá upomínky zákazníkům s po-splatnostními fakturami.",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "0 Kč",
    period: "/měsíc",
    desc: "Pro vyzkoušení",
    features: ["Až 10 zakázek měsíčně", "Faktury s DPH", "Emailové odesílání", "1 uživatel"],
    cta: "Začít zdarma",
    href: "/auth/register",
    highlight: false,
  },
  {
    name: "Business",
    price: "399 Kč",
    period: "/měsíc",
    desc: "Pro aktivní řemeslníky",
    features: [
      "Neomezené zakázky",
      "Faktury s DPH",
      "Emailové odesílání + upomínky",
      "Fotodokumentace",
      "PWA na telefonu",
      "Prioritní podpora",
    ],
    cta: "Začít 14 dní zdarma",
    href: "/auth/register?plan=business",
    highlight: true,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b px-4 py-3 flex items-center justify-between max-w-5xl mx-auto">
        <span className="text-xl font-bold text-orange-500">Řemeslník.app</span>
        <div className="flex gap-3">
          <Link href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900 py-2 px-3">
            Přihlásit
          </Link>
          <Link
            href="/auth/register"
            className="text-sm bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600"
          >
            Začít zdarma
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-4 py-16 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Zakázky a faktury pro řemeslníky.{" "}
          <span className="text-orange-500">Jednoduše.</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Vytvořte zakázku na telefonu, dokončete ji v terénu. Zákazník dostane fakturu
          automaticky — s DPH, QR kódem a vaším razítkem.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/auth/register"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Začít zdarma
          </Link>
          <Link
            href="#features"
            className="border border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-xl text-lg hover:bg-gray-50 transition-colors"
          >
            Jak to funguje
          </Link>
        </div>
        <p className="text-sm text-gray-400 mt-4">Bez kreditní karty. Pro iOS i Android.</p>
      </section>

      {/* Features */}
      <section id="features" className="px-4 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Vše co řemeslník potřebuje
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white border rounded-xl p-6">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-16 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Jak to funguje</h2>
        <div className="space-y-6">
          {[
            { step: "1", title: "Zaregistrujte se", desc: "Vyplňte IČO, DIČ a bankovní spojení. Trvá 2 minuty." },
            { step: "2", title: "Přidejte zákazníka a zakázku", desc: "Na telefonu nebo počítači — zadáte zákazníka, popis práce a cenu." },
            { step: "3", title: "Dokončete zakázku", desc: "Jedním tapem označíte zakázku jako dokončenou." },
            { step: "4", title: "Faktura jde automaticky", desc: "Zákazník dostane PDF fakturu emailem s QR kódem k platbě. Vy si zakázku zaúčtujete." },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Ceník</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {PRICING.map((plan) => (
              <div
                key={plan.name}
                className={`border rounded-2xl p-6 ${
                  plan.highlight ? "border-orange-500 ring-2 ring-orange-500 bg-white" : "bg-white"
                }`}
              >
                {plan.highlight && (
                  <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium mb-4 inline-block">
                    Doporučeno
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <div className="flex items-baseline gap-1 my-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="text-sm flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block text-center py-3 rounded-xl font-medium transition-colors ${
                    plan.highlight
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "border hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Připraveni začít?
        </h2>
        <p className="text-gray-600 mb-8">Zaregistrujte se zdarma. Žádná kreditní karta.</p>
        <Link
          href="/auth/register"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl text-lg inline-block transition-colors"
        >
          Vytvořit bezplatný účet
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-8 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Řemeslník.app — Správa zakázek pro české řemeslníky</p>
      </footer>
    </div>
  );
}
