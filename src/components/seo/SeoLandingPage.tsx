import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, ShieldCheck, Star, Wrench } from "lucide-react";

export interface SeoPageConfig {
  obor: string;
  oborGen: string;
  h1: string;
  heroDesc: string;
  typPrace: string;
  iconEmoji: string;
  benefits: { icon: string; title: string; desc: string }[];
  faq: { q: string; a: string }[];
  testimonials: { name: string; location: string; rating: number; text: string }[];
  jsonLd: Record<string, unknown>;
}

const STEPS = [
  { num: "1", emoji: "📝", title: "Popište práci", desc: "Vyplňte krátký formulář — typ práce, lokalita, popis. Trvá 2 minuty." },
  { num: "2", emoji: "🤝", title: "My najdeme odborníka", desc: "Do 24 hodin doporučíme prověřeného řemeslníka z vašeho okolí." },
  { num: "3", emoji: "✅", title: "Práce je hotová", desc: "Domluvíte se přímo. Bez skrytých poplatků, bez závazků." },
];

export function SeoLandingPage({ config }: { config: SeoPageConfig }) {
  const { obor, oborGen, h1, heroDesc, typPrace, iconEmoji, benefits, faq, testimonials, jsonLd } = config;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F6F2EC", color: "#111827", fontFamily: "var(--font-inter)" }}>

        {/* Sticky Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: "1.125rem", color: "#1E2D40" }}>
                Řemeslník<span style={{ color: "#E07B39" }}>●</span>app
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium" style={{ color: "#6B7280" }}>
                <a href="#jak-to-funguje" className="hover:text-[#1E2D40] transition-colors">Jak to funguje</a>
                <a href="#recenze" className="hover:text-[#1E2D40] transition-colors">Recenze</a>
                <Link href="/pro-remeslniky" className="hover:text-[#1E2D40] transition-colors">Pro řemeslníky</Link>
              </nav>
              <Link
                href={`/poptavka?typ=${encodeURIComponent(typPrace)}`}
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
                  Prověřený {oborGen} v Praze
                </p>
                <h1
                  className="mb-5 leading-tight"
                  style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "#1E2D40", lineHeight: 1.1 }}
                >
                  {h1}
                </h1>
                <p className="text-lg leading-relaxed mb-8 max-w-lg" style={{ color: "#6B7280", lineHeight: 1.65 }}>
                  {heroDesc}
                </p>

                {/* Mini CTA card */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-sm">
                  <p className="text-sm font-semibold mb-3" style={{ color: "#1E2D40", fontFamily: "var(--font-space-grotesk)" }}>
                    Koho hledáte?
                  </p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 mb-4">
                    {obor} · Praha
                  </div>
                  <Link
                    href={`/poptavka?typ=${encodeURIComponent(typPrace)}`}
                    className="btn-amber w-full inline-flex items-center justify-center gap-2 font-semibold text-base rounded-lg px-7 py-4 shadow-md"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Poptat {oborGen} zdarma
                    <ArrowRight className="size-5" />
                  </Link>
                  <div className="flex items-center justify-center gap-4 mt-4 text-xs" style={{ color: "#6B7280" }}>
                    {["Zdarma", "Bez závazků", "Do 24 hodin"].map(t => (
                      <span key={t} className="flex items-center gap-1">
                        <CheckCircle className="size-3.5" style={{ color: "#E07B39" }} />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side — icon + trust stats */}
              <div className="hidden lg:flex flex-col gap-4">
                <div className="rounded-2xl aspect-[4/3] flex items-center justify-center border border-[#E07B39]/20" style={{ backgroundColor: "#1E2D40" }}>
                  <div className="text-center p-8">
                    <div className="text-7xl mb-4">{iconEmoji}</div>
                    <p className="font-semibold text-lg" style={{ color: "#F6F2EC", fontFamily: "var(--font-space-grotesk)" }}>
                      Prověřený {oborGen}<br />do 24 hodin
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { num: "247+", label: "řemeslníků" },
                    { num: "4.8 ★", label: "hodnocení" },
                    { num: "<24h", label: "odezva" },
                  ].map(s => (
                    <div key={s.num} className="bg-white rounded-xl p-4 text-center border border-gray-200">
                      <p className="text-xl font-bold" style={{ color: "#1E2D40", fontFamily: "var(--font-space-grotesk)" }}>{s.num}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="py-8 bg-white border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-sm" style={{ color: "#6B7280" }}>
              {[
                { icon: "✓", text: "Ověřená živnost" },
                { icon: "✓", text: "Reálná hodnocení od sousedů" },
                { icon: "✓", text: "Přesná nabídka ceny" },
                { icon: "✓", text: "3 nabídky do 24 hodin" },
              ].map(item => (
                <span key={item.text} className="flex items-center gap-1.5 font-medium">
                  <span style={{ color: "#E07B39" }}>{item.icon}</span>
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="jak-to-funguje" className="py-16 sm:py-20" style={{ backgroundColor: "#F6F2EC" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: "clamp(1.625rem, 3vw, 2.25rem)", color: "#1E2D40" }}>
                Jak získáte {oborGen}?
              </h2>
              <p className="mt-3 text-base" style={{ color: "#6B7280" }}>
                Jednoduché. Tři kroky a máte nabídky od prověřených odborníků.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {STEPS.map(step => (
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
            <div className="text-center mt-10">
              <Link
                href={`/poptavka?typ=${encodeURIComponent(typPrace)}`}
                className="btn-amber inline-flex items-center gap-2 font-semibold text-base rounded-lg px-7 py-4 shadow-md"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Poptat {oborGen} zdarma
                <ArrowRight className="size-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: "clamp(1.625rem, 3vw, 2.25rem)", color: "#1E2D40" }}>
                Proč Řemeslník.app?
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map(b => (
                <div key={b.title} className="rounded-xl p-6 border border-gray-100" style={{ backgroundColor: "#F6F2EC" }}>
                  <div className="text-3xl mb-4">{b.icon}</div>
                  <h3 className="font-semibold text-base mb-2" style={{ color: "#1E2D40", fontFamily: "var(--font-space-grotesk)" }}>{b.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="recenze" className="py-16 sm:py-20" style={{ backgroundColor: "#F6F2EC" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="mb-3" style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: "clamp(1.625rem, 3vw, 2.25rem)", color: "#1E2D40" }}>
                Co říkají zákazníci
              </h2>
              <div className="flex items-center justify-center gap-2" style={{ color: "#6B7280" }}>
                <span style={{ color: "#E07B39", fontSize: "1.125rem" }}>★★★★★</span>
                <span className="font-semibold">4.8</span>
                <span>· 127 recenzí</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {testimonials.map(t => (
                <div key={t.name} className="bg-white rounded-xl p-6 border border-gray-200">
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

        {/* FAQ */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: "clamp(1.625rem, 3vw, 2.25rem)", color: "#1E2D40" }}>
                Časté dotazy
              </h2>
            </div>
            <div className="space-y-4">
              {faq.map(item => (
                <div key={item.q} className="rounded-xl border border-gray-200 p-5">
                  <h3 className="font-semibold text-base mb-2" style={{ color: "#1E2D40", fontFamily: "var(--font-space-grotesk)" }}>{item.q}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 sm:py-20" style={{ backgroundColor: "#1E2D40" }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="mb-4" style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: "clamp(1.625rem, 3vw, 2.25rem)", color: "#FFFFFF", lineHeight: 1.2 }}>
              Potřebujete {oborGen} v Praze?
            </h2>
            <p className="text-lg mb-8" style={{ color: "#F6F2EC", opacity: 0.85 }}>
              Zadejte poptávku zdarma a do 24 hodin máte 3 nabídky od prověřených odborníků.
            </p>
            <Link
              href={`/poptavka?typ=${encodeURIComponent(typPrace)}`}
              className="btn-amber inline-flex items-center gap-2 font-semibold text-base rounded-lg px-8 py-4 shadow-lg"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Poptat {oborGen} zdarma
              <ArrowRight className="size-5" />
            </Link>
            <p className="mt-4 text-sm" style={{ color: "#F6F2EC", opacity: 0.6 }}>
              Bez registrace · Bez závazků · 100% zdarma
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12" style={{ backgroundColor: "#111827" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
              <div>
                <Link href="/" className="mb-1 block text-lg font-bold" style={{ color: "#FFFFFF", fontFamily: "var(--font-space-grotesk)" }}>
                  Řemeslník<span style={{ color: "#E07B39" }}>●</span>app
                </Link>
                <p className="text-sm" style={{ color: "#6B7280" }}>Prověření řemeslníci v Praze</p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "#D1D5DB" }}>Pro zákazníky</p>
                <ul className="space-y-2 text-sm" style={{ color: "#6B7280" }}>
                  <li><Link href="/poptavka" className="hover:text-white transition-colors">Zadat poptávku</Link></li>
                  <li><Link href="/" className="hover:text-white transition-colors">Jak to funguje</Link></li>
                  <li><Link href="/" className="hover:text-white transition-colors">Recenze</Link></li>
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
