import Link from "next/link";
import {
  FileText,
  ClipboardList,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Hammer,
  Shield,
  Smartphone,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-lg font-bold text-gray-900 tracking-tight">
              Řemeslník<span className="text-blue-600">.app</span>
            </span>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <a href="#features" className="hover:text-gray-900 transition-colors">
                Funkce
              </a>
              <a href="#how-it-works" className="hover:text-gray-900 transition-colors">
                Jak to funguje
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2"
              >
                Přihlásit se
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-sm font-semibold rounded-lg px-4 py-2.5 hover:bg-blue-700 transition-colors shadow-sm"
              >
                Začít zdarma
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero — dark background */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-blue-300 text-sm font-medium rounded-full px-4 py-1.5 mb-10 border border-white/10">
            <CheckCircle className="size-4" />
            Zdarma pro OSVČ a malé firmy
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
            Zakázky a faktury{" "}
            <br className="hidden sm:block" />
            bez{" "}
            <span className="text-orange-400">papírování</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Vytvoříte zakázku na telefonu, dokončíte ji v terénu —
            zákazník dostane fakturu automaticky. Žádné Excel tabulky,
            žádné složité účetní programy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white text-base font-semibold rounded-lg px-7 py-4 hover:bg-orange-600 transition-colors shadow-lg"
            >
              Začít zdarma
              <ArrowRight className="size-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 text-gray-200 text-base font-medium rounded-lg px-7 py-4 hover:bg-white/10 transition-colors"
            >
              Přihlásit se
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Bez kreditní karty. Bez závazků.
          </p>
        </div>
      </section>

      {/* Social proof strip */}
      <div className="bg-gray-800 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <CheckCircle className="size-4 text-green-400" />
              Instalatéři a topenáři
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="size-4 text-green-400" />
              Elektrikáři
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="size-4 text-green-400" />
              Malíři a zedníci
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="size-4 text-green-400" />
              Tesaři a pokrývači
            </span>
          </div>
        </div>
      </div>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Vše co řemeslník potřebuje
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Navrženo pro řemeslníky — ne pro účetní.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                <ClipboardList className="size-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Evidence zakázek
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Zákazníci, termíny, stav práce — vše přehledně na jednom
                místě. Nikdy nezapomenete na domluvený termín.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-5">
                <FileText className="size-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Faktury jedním klikem
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Faktura se vytvoří z dokončené zakázky automaticky.
                Zákazník dostane PDF na email, vy vidíte stav platby.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-5">
                <BarChart3 className="size-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Přehled tržeb
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Tržby, neuhrazené faktury a otevřené zakázky přehledně.
                Víte přesně, kde stojíte.
              </p>
            </div>
          </div>

          {/* Secondary features row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                <Smartphone className="size-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Mobilní aplikace</h4>
                <p className="text-sm text-gray-500">Funguje na telefonu přímo v terénu.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
                <Hammer className="size-5 text-orange-500" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Katalog prací</h4>
                <p className="text-sm text-gray-500">Uložte si ceník prací pro rychlé zadání.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 flex items-start gap-4">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                <Shield className="size-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Bezpečná data</h4>
                <p className="text-sm text-gray-500">Vaše data jsou zálohovány a šifrována.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Jak to funguje
            </h2>
            <p className="text-gray-500 text-lg">
              Tři kroky od zakázky po zaplacení.
            </p>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden sm:block absolute top-6 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gray-200" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 relative">
              {[
                {
                  step: "1",
                  title: "Přidejte zakázku",
                  desc: "Na telefonu nebo počítači zadáte zákazníka, popis práce a termín. Trvá to minutu.",
                },
                {
                  step: "2",
                  title: "Pracujte v terénu",
                  desc: "Sledujte stav zakázky přes mobil. Označte ji jako dokončenou, když skončíte.",
                },
                {
                  step: "3",
                  title: "Faktura jde sama",
                  desc: "Systém vytvoří fakturu a odešle ji zákazníkovi. Vy jen potvrdíte platbu.",
                },
              ].map((item) => (
                <div key={item.step} className="text-center relative">
                  <div className="w-12 h-12 bg-blue-600 text-white font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-5 shadow-md relative z-10">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-blue-600 py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
            Začněte ještě dnes — zdarma
          </h2>
          <p className="text-blue-200 mb-10 text-lg leading-relaxed">
            Registrace zabere méně než 2 minuty.
            <br />
            Bez kreditní karty, bez závazků.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white font-semibold text-base rounded-lg px-8 py-4 hover:bg-orange-600 transition-colors shadow-lg"
            >
              Vyzkoušet zdarma
              <ArrowRight className="size-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-medium text-base rounded-lg px-8 py-4 hover:bg-white/20 transition-colors"
            >
              Přihlásit se
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-base font-bold text-white">
                Řemeslník<span className="text-blue-400">.app</span>
              </span>
              <p className="text-sm text-gray-500 mt-1">
                Zakázky a faktury pro české řemeslníky.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#features" className="hover:text-gray-300 transition-colors">
                Funkce
              </a>
              <a href="#how-it-works" className="hover:text-gray-300 transition-colors">
                Jak to funguje
              </a>
              <Link href="/login" className="hover:text-gray-300 transition-colors">
                Přihlásit se
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-sm text-gray-600 text-center">
              © {new Date().getFullYear()} Řemeslník.app. Všechna práva vyhrazena.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
