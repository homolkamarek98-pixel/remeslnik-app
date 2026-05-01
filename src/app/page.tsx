import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Star, CheckCircle, Zap, Wrench, Paintbrush, Layers, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Řemeslník.app — Prověření řemeslníci v Praze do 24 hodin",
  description:
    "Hledáte elektrikáře, instalatéra nebo malíře v Praze? Poptejte zdarma a bez závazků. Doporučíme prověřeného odborníka do 24 hodin.",
  openGraph: {
    title: "Řemeslník.app — Prověření řemeslníci v Praze do 24 hodin",
    description:
      "Hledáte elektrikáře, instalatéra nebo malíře v Praze? Poptejte zdarma a bez závazků.",
    locale: "cs_CZ",
    type: "website",
  },
};

const categories = [
  { icon: Zap, label: "Elektrikář", value: "Elektrikářské práce" },
  { icon: Wrench, label: "Instalatér", value: "Instalatérské a topenářské práce" },
  { icon: Paintbrush, label: "Malíř / natěrač", value: "Malování a natírání" },
  { icon: Layers, label: "Zedník", value: "Zednické a obkladačské práce" },
  { icon: Settings, label: "Podlahář", value: "Podlahy a parkety" },
  { icon: Settings, label: "Jiné práce", value: "Jiné práce" },
];

const testimonials = [
  {
    name: "Jana K.",
    location: "Praha 8",
    rating: 5,
    text: "Vynikající přístup. Elektrikář přišel přesně na čas, práci odvedl perfektně a cena odpovídala předem sjednané částce. Určitě využiji znovu.",
  },
  {
    name: "Martin V.",
    location: "Praha 3",
    rating: 5,
    text: "Instalatér byl u nás do 4 hodin od poptávky. Opravil nám havarijní stav v koupelně a vysvětlil i příčinu problému. Velmi doporučuji.",
  },
  {
    name: "Petra N.",
    location: "Praha 6",
    rating: 4,
    text: "Celkově spokojenost. Malíř byl sice o den opožděn, ale práci udělal velmi svědomitě a za rozumnou cenu.",
  },
];

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Řemeslník.app",
            description: "Prověření řemeslníci v Praze do 24 hodin",
            url: "https://remeslnik.app",
            areaServed: { "@type": "City", name: "Praha" },
            serviceType: "Home Improvement Services",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "127",
            },
          }),
        }}
      />

      <div className="min-h-screen flex flex-col bg-white">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              <span className="text-lg font-bold text-navy-700">
                Řemeslník<span className="text-mkp-amber-500">.app</span>
              </span>
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                <a href="#jak-to-funguje" className="hover:text-navy-700 transition-colors">
                  Jak to funguje
                </a>
                <a href="#recenze" className="hover:text-navy-700 transition-colors">
                  Recenze
                </a>
                <Link href="/login" className="hover:text-navy-700 transition-colors">
                  Pro řemeslníky
                </Link>
              </nav>
              <Link
                href="/poptavka"
                className="inline-flex items-center gap-1.5 bg-navy-500 text-white text-sm font-semibold rounded-lg px-4 py-2.5 hover:bg-navy-700 transition-colors"
              >
                Zadat poptávku
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-gradient-to-b from-white to-gray-50 pt-12 pb-16 sm:pt-16 sm:pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-mkp-amber-600 mb-4">
                  Prověření řemeslníci v Praze
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold text-navy-900 leading-tight mb-5">
                  Spolehlivý řemeslník
                  <br />
                  do 24 hodin
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
                  Poptejte práci zdarma. My najdeme prověřeného odborníka přesně
                  pro vaši potřebu.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-5">
                  <Link
                    href="/poptavka"
                    className="inline-flex items-center justify-center gap-2 bg-navy-500 text-white font-semibold text-base rounded-lg px-7 py-4 hover:bg-navy-700 transition-colors shadow-md"
                  >
                    Zadat poptávku
                    <ArrowRight className="size-5" />
                  </Link>
                  <a
                    href="tel:+420773000000"
                    className="inline-flex items-center justify-center gap-2 text-navy-500 font-medium text-base rounded-lg px-7 py-4 hover:bg-navy-50 transition-colors"
                  >
                    nebo zavolejte: 773 XXX XXX
                  </a>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="size-4 text-green-600" />
                    Bez závazků
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="size-4 text-green-600" />
                    Bez registrace
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="size-4 text-green-600" />
                    Zdarma
                  </span>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="bg-navy-100 rounded-2xl aspect-[4/3] flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🔨</div>
                    <p className="text-navy-700 font-medium">
                      Prověřený řemeslník<br />pro váš domov
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust stats */}
        <section className="bg-white py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { number: "247+", label: "Prověřených řemeslníků v Praze", extra: null },
                {
                  number: "4.8",
                  label: "Průměrné hodnocení zákazníků",
                  extra: "★★★★★",
                },
                { number: "<24h", label: "Průměrná doba odezvy", extra: null },
              ].map((stat) => (
                <div
                  key={stat.number}
                  className="bg-white border border-gray-100 rounded-xl p-6 text-center shadow-sm"
                >
                  <div className="text-3xl font-bold text-navy-500 mb-1">
                    {stat.number}
                  </div>
                  {stat.extra && (
                    <div className="text-mkp-amber-500 text-lg mb-1">{stat.extra}</div>
                  )}
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-gray-50 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-3">
                Co potřebujete opravit nebo zrekonstruovat?
              </h2>
              <p className="text-gray-600">
                Vyberte obor a vyplňte krátkou poptávku.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
              {categories.map(({ icon: Icon, label, value }) => (
                <Link
                  key={value}
                  href={`/poptavka?typ=${encodeURIComponent(value)}`}
                  className="flex flex-col items-center gap-3 bg-white border border-gray-200 rounded-xl p-5 min-h-[80px] text-center hover:border-navy-500 hover:bg-navy-50 transition-all group"
                >
                  <Icon className="size-7 text-gray-500 group-hover:text-navy-500 transition-colors" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-navy-700">
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="jak-to-funguje" className="bg-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-3">
                Jak to funguje?
              </h2>
            </div>
            <div className="relative">
              <div className="hidden sm:block absolute top-5 left-1/2 -translate-x-1/2 w-2/3 h-px border-t-2 border-dashed border-gray-200" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 relative">
                {[
                  {
                    num: "1",
                    emoji: "📝",
                    title: "Poptejte práci",
                    desc: "Vyplňte krátký formulář — typ práce, lokalita, popis. Trvá 2 minuty.",
                  },
                  {
                    num: "2",
                    emoji: "🤝",
                    title: "My najdeme odborníka",
                    desc: "Do 24 hodin vám doporučíme prověřeného řemeslníka z vašeho okolí.",
                  },
                  {
                    num: "3",
                    emoji: "✅",
                    title: "Práce je hotová",
                    desc: "Domluvíte se přímo. My jsme jen zprostředkovatelé bez skryté provize.",
                  },
                ].map((step) => (
                  <div key={step.num} className="text-center relative">
                    <div className="w-10 h-10 bg-navy-500 text-white font-bold text-base rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      {step.num}
                    </div>
                    <div className="text-2xl mb-3">{step.emoji}</div>
                    <h3 className="font-semibold text-navy-900 text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="recenze" className="bg-gray-50 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-3">
                Co říkají zákazníci
              </h2>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <span className="text-mkp-amber-500 text-lg">★★★★★</span>
                <span className="font-semibold">4.8</span>
                <span className="text-gray-500">· 127 recenzí</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center text-navy-700 font-semibold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${
                          i < t.rating
                            ? "text-mkp-amber-500 fill-mkp-amber-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-navy-700 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Potřebujete řemeslníka?
            </h2>
            <p className="text-navy-100 text-lg mb-8">
              Zadejte poptávku zdarma a bez závazků.
            </p>
            <Link
              href="/poptavka"
              className="inline-flex items-center gap-2 bg-white text-navy-700 font-semibold text-base rounded-lg px-8 py-4 hover:bg-gray-100 transition-colors shadow-lg"
            >
              Zadat poptávku
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
              <div>
                <p className="text-lg font-bold text-white mb-1">
                  Řemeslník<span className="text-mkp-amber-500">.app</span>
                </p>
                <p className="text-sm text-gray-400">Prověření řemeslníci v Praze</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                  Pro zákazníky
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <Link href="/poptavka" className="hover:text-white transition-colors">
                      Zadat poptávku
                    </Link>
                  </li>
                  <li>
                    <a href="#jak-to-funguje" className="hover:text-white transition-colors">
                      Jak to funguje
                    </a>
                  </li>
                  <li>
                    <a href="#recenze" className="hover:text-white transition-colors">
                      Recenze
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                  Kontakt
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>📧 info@remeslnik.app</li>
                  <li>📞 773 XXX XXX</li>
                  <li>
                    <Link href="/login" className="hover:text-white transition-colors">
                      Pro řemeslníky →
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-800">
              <p className="text-xs text-gray-600 text-center">
                © 2026 Řemeslník.app ·{" "}
                <a
                  href="/ochrana-osobnich-udaju"
                  className="hover:text-gray-400 transition-colors"
                >
                  Ochrana osobních údajů
                </a>{" "}
                ·{" "}
                <a
                  href="/podminky-pouziti"
                  className="hover:text-gray-400 transition-colors"
                >
                  Podmínky použití
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
