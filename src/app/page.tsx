import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Zap, Wrench, Paintbrush, Layers, Settings, Clock, Users, TrendingUp, ShieldCheck, MapPin, Banknote } from "lucide-react";

export const metadata: Metadata = {
  title: "Řemeslník.app — Prověření řemeslníci v Praze do 24 hodin",
  description:
    "Hledáš elektrikáře, instalatéra nebo malíře v Praze? Poptej zdarma a bez závazků. Doporučíme prověřeného odborníka do 24 hodin.",
  openGraph: {
    title: "Řemeslník.app — Prověření řemeslníci v Praze do 24 hodin",
    description:
      "Poptej práci zdarma. Doporučíme prověřeného odborníka do 24 hodin.",
    locale: "cs_CZ",
    type: "website",
  },
};

const categories = [
  { icon: Zap, label: "Elektrikář" },
  { icon: Wrench, label: "Instalatér" },
  { icon: Paintbrush, label: "Malíř / natěrač" },
  { icon: Layers, label: "Zedník" },
  { icon: Settings, label: "Podlahář" },
  { icon: Settings, label: "Jiné práce" },
];

const testimonials = [
  {
    name: "Jana K.",
    location: "Praha 8",
    rating: 5,
    text: "Elektrikář přišel přesně na čas, práci odvedl perfektně a cena odpovídala předem sjednané částce.",
  },
  {
    name: "Martin V.",
    location: "Praha 3",
    rating: 5,
    text: "Instalatér byl u nás do 4 hodin od poptávky. Opravil havarijní stav v koupelně a vysvětlil příčinu.",
  },
  {
    name: "Petra N.",
    location: "Praha 6",
    rating: 4,
    text: "Malíř byl o den opožděn, ale práci udělal svědomitě a za rozumnou cenu. Celkově spokojenost.",
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

      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F6F2EC", color: "#111827", fontFamily: "var(--font-inter)" }}>

        {/* Sticky Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <span style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: "1.125rem", color: "#1E2D40" }}>
                Řemeslník<span style={{ color: "#E07B39" }}>●</span>app
              </span>
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium" style={{ color: "#6B7280" }}>
                <a href="#jak-to-funguje" className="hover:text-[#1E2D40] transition-colors">Jak to funguje</a>
                <a href="#recenze" className="hover:text-[#1E2D40] transition-colors">Recenze</a>
                <Link href="/pro-remeslniky" className="hover:text-[#1E2D40] transition-colors">Pro řemeslníky</Link>
              </nav>
              <Link
                href="/poptavka"
                className="btn-amber inline-flex items-center gap-1.5 text-sm font-semibold rounded-lg px-4 py-2.5"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Zadat poptávku
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="pt-16 pb-20 sm:pt-20 sm:pb-24" style={{ backgroundColor: "#F6F2EC" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#E07B39", fontFamily: "var(--font-space-grotesk)" }}>
                  Prověření řemeslníci v Praze
                </p>
                <h1 className="mb-5 leading-tight" style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: "clamp(2.25rem, 5vw, 3.25rem)", color: "#1E2D40", lineHeight: 1.1 }}>
                  Spolehlivý řemeslník
                  <br />
                  do 24 hodin
                </h1>
                <p className="text-lg leading-relaxed mb-8 max-w-lg" style={{ color: "#6B7280", lineHeight: 1.65 }}>
                  Poptej práci zdarma. My najdeme prověřeného odborníka přesně
                  pro tvoji potřebu.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <Link
                    href="/poptavka"
                    className="btn-amber inline-flex items-center justify-center gap-2 font-semibold text-base rounded-lg px-7 py-4 shadow-md"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Zadat poptávku
                    <ArrowRight className="size-5" />
                  </Link>
                  <a
                    href="tel:+420773000000"
                    className="btn-midnight-outline inline-flex items-center justify-center gap-2 font-medium text-base rounded-lg px-7 py-4"
                  >
                    nebo zavolej: 773 XXX XXX
                  </a>
                </div>
                <div className="flex items-center gap-5 text-sm" style={{ color: "#6B7280" }}>
                  {["Bez závazků", "Bez registrace", "Zdarma"].map(t => (
                    <span key={t} className="flex items-center gap-1.5">
                      <CheckCircle className="size-4" style={{ color: "#E07B39" }} />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="rounded-2xl aspect-[4/3] flex items-center justify-center border border-[#E07B39]/20" style={{ backgroundColor: "#1E2D40" }}>
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🔨</div>
                    <p className="font-medium" style={{ color: "#F6F2EC", fontFamily: "var(--font-space-grotesk)" }}>
                      Prověřený řemeslník<br />pro tvůj domov
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust stats */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { number: "247+", label: "Prověřených řemeslníků v Praze" },
                { number: "4.8 ★", label: "Průměrné hodnocení zákazníků" },
                { number: "<24h", label: "Průměrná doba odezvy" },
              ].map((stat) => (
                <div key={stat.number} className="rounded-xl p-6 text-center border" style={{ borderColor: "#E5E7EB" }}>
                  <div className="text-3xl font-bold mb-1" style={{ color: "#1E2D40", fontFamily: "var(--font-space-grotesk)" }}>{stat.number}</div>
                  <p className="text-sm" style={{ color: "#6B7280" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 sm:py-16" style={{ backgroundColor: "#F6F2EC" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="mb-3" style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: "clamp(1.625rem, 3vw, 2.25rem)", color: "#1E2D40", lineHeight: 1.2 }}>
                Co potřebuješ opravit?
              </h2>
              <p style={{ color: "#6B7280" }}>Vyber obor a vyplň krátkou poptávku.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
              {categories.map(({ icon: Icon, label }) => (
                <Link
                  key={label}
                  href={`/poptavka?typ=${encodeURIComponent(label)}`}
                  className="category-card flex flex-col items-center gap-3 bg-white border rounded-xl p-5 min-h-[80px] text-center"
                  style={{ borderColor: "#E5E7EB" }}
                >
                  <Icon className="category-icon size-7" style={{ color: "#6B7280" }} />
                  <span className="text-sm font-medium" style={{ color: "#111827" }}>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="jak-to-funguje" className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: "clamp(1.625rem, 3vw, 2.25rem)", color: "#1E2D40", lineHeight: 1.2 }}>
                Jak to funguje?
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {[
                { num: "1", emoji: "📝", title: "Poptal práci", desc: "Vyplň krátký formulář — typ práce, lokalita, popis. Trvá 2 minuty." },
                { num: "2", emoji: "🤝", title: "My najdeme odborníka", desc: "Do 24 hodin doporučíme prověřeného řemeslníka z tvého okolí." },
                { num: "3", emoji: "✅", title: "Práce je hotová", desc: "Domluvíte se přímo. My jsme jen zprostředkovatelé bez skryté provize." },
              ].map((step) => (
                <div key={step.num} className="text-center">
                  <div className="w-10 h-10 text-white font-bold text-base rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#E07B39", fontFamily: "var(--font-space-grotesk)" }}>
                    {step.num}
                  </div>
                  <div className="text-2xl mb-3">{step.emoji}</div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: "#1E2D40", fontFamily: "var(--font-space-grotesk)" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="recenze" className="py-12 sm:py-16" style={{ backgroundColor: "#F6F2EC" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="mb-3" style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: "clamp(1.625rem, 3vw, 2.25rem)", color: "#1E2D40", lineHeight: 1.2 }}>
                Co říkají zákazníci
              </h2>
              <div className="flex items-center justify-center gap-2" style={{ color: "#6B7280" }}>
                <span style={{ color: "#E07B39", fontSize: "1.125rem" }}>★★★★★</span>
                <span className="font-semibold">4.8</span>
                <span>· 127 recenzí</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-white rounded-xl p-6 border" style={{ borderColor: "#E5E7EB" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold" style={{ backgroundColor: "#1E2D40", color: "#F6F2EC" }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-sm" style={{ color: "#111827" }}>{t.name}</p>
                      <p className="text-xs" style={{ color: "#6B7280" }}>{t.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-3" style={{ color: "#E07B39" }}>
                    {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pro řemeslníky */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#E07B39", fontFamily: "var(--font-space-grotesk)" }}>
                  Pro řemeslníky
                </p>
                <h2 className="mb-4" style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: "clamp(1.625rem, 3vw, 2.25rem)", color: "#1E2D40", lineHeight: 1.2 }}>
                  Získej nové zákazníky bez reklamy
                </h2>
                <p className="leading-relaxed mb-6" style={{ color: "#6B7280", lineHeight: 1.65 }}>
                  Jsi elektrikář, instalatér nebo malíř v Praze? Přihlas se a my
                  ti budeme posílat poptávky přesně z tvého oboru a lokality.
                </p>
                <Link
                  href="/pro-remeslniky"
                  className="btn-amber inline-flex items-center gap-2 font-semibold text-base rounded-lg px-7 py-4 shadow-md"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Přihlásit se jako řemeslník
                  <ArrowRight className="size-5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: Clock, title: "Poptávky do 24 hodin", desc: "Zákazník čeká na odpověď. Budeš první." },
                  { icon: ShieldCheck, title: "Prověření zákazníci", desc: "Každá poptávka obsahuje popis práce a kontakt." },
                  { icon: TrendingUp, title: "Zdarma na start", desc: "Registrace nic nestojí. Platba za výsledek teprve zvažujeme." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4 rounded-xl p-4" style={{ backgroundColor: "#F6F2EC" }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#1E2D40" }}>
                      <Icon className="size-5" style={{ color: "#E07B39" }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-0.5" style={{ color: "#1E2D40", fontFamily: "var(--font-space-grotesk)" }}>{title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 sm:py-20" style={{ backgroundColor: "#1E2D40" }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="mb-4" style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: "clamp(1.625rem, 3vw, 2.25rem)", color: "#FFFFFF", lineHeight: 1.2 }}>
              Potřebuješ řemeslníka?
            </h2>
            <p className="text-lg mb-8" style={{ color: "#F6F2EC", opacity: 0.85 }}>
              Zadej poptávku zdarma a bez závazků.
            </p>
            <Link
              href="/poptavka"
              className="btn-amber inline-flex items-center gap-2 font-semibold text-base rounded-lg px-8 py-4 shadow-lg"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Zadat poptávku
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12" style={{ backgroundColor: "#111827" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
              <div>
                <p className="mb-1 text-lg font-bold" style={{ color: "#FFFFFF", fontFamily: "var(--font-space-grotesk)" }}>
                  Řemeslník<span style={{ color: "#E07B39" }}>●</span>app
                </p>
                <p className="text-sm" style={{ color: "#6B7280" }}>Prověření řemeslníci v Praze</p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "#D1D5DB" }}>Pro zákazníky</p>
                <ul className="space-y-2 text-sm" style={{ color: "#6B7280" }}>
                  <li><Link href="/poptavka" className="hover:text-white transition-colors">Zadat poptávku</Link></li>
                  <li><a href="#jak-to-funguje" className="hover:text-white transition-colors">Jak to funguje</a></li>
                  <li><a href="#recenze" className="hover:text-white transition-colors">Recenze</a></li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "#D1D5DB" }}>Řemeslníci v Praze</p>
                <ul className="space-y-2 text-sm" style={{ color: "#6B7280" }}>
                  <li><Link href="/instalater-praha" className="hover:text-white transition-colors">Instalatér Praha</Link></li>
                  <li><Link href="/elektrikar-praha" className="hover:text-white transition-colors">Elektrikář Praha</Link></li>
                  <li><Link href="/malar-pokoju-praha" className="hover:text-white transition-colors">Malíř pokojů Praha</Link></li>
                  <li><Link href="/zednik-praha" className="hover:text-white transition-colors">Zedník Praha</Link></li>
                  <li><Link href="/rekonstrukce-bytu-praha" className="hover:text-white transition-colors">Rekonstrukce bytu Praha</Link></li>
                  <li><Link href="/remeslnik-praha" className="hover:text-white transition-colors">Řemeslník Praha</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "#D1D5DB" }}>Kontakt</p>
                <ul className="space-y-2 text-sm" style={{ color: "#6B7280" }}>
                  <li>📧 info@remeslnik.app</li>
                  <li>📞 773 XXX XXX</li>
                  <li><Link href="/pro-remeslniky" className="hover:text-white transition-colors">Pro řemeslníky →</Link></li>
                </ul>
              </div>
            </div>
            <div className="pt-6 border-t" style={{ borderColor: "#1F2937" }}>
              <p className="text-xs text-center" style={{ color: "#374151" }}>
                © 2026 Řemeslník.app ·{" "}
                <a href="/ochrana-osobnich-udaju" className="hover:text-gray-400 transition-colors">Ochrana osobních údajů</a>
                {" "}·{" "}
                <a href="/podminky-pouziti" className="hover:text-gray-400 transition-colors">Podmínky použití</a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
