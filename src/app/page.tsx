import Link from "next/link";
import { FileText, ClipboardList, BarChart3, CheckCircle, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-lg font-bold text-gray-900 tracking-tight">
              Řemeslník<span className="text-primary">.app</span>
            </span>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2"
              >
                Přihlásit se
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 bg-primary text-white text-sm font-medium rounded-lg px-4 py-2 hover:bg-primary/90 transition-colors"
              >
                Vyzkoušet zdarma
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium rounded-full px-4 py-1.5 mb-8">
            <CheckCircle className="size-4" />
            Zdarma pro OSVČ a malé firmy
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
            Zakázky a faktury
            <br />
            <span className="text-primary">bez papírování</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Vytvoříte zakázku na telefonu, dokončíte ji v terénu —
            zákazník dostane fakturu automaticky. Žádné Excel tabulky,
            žádné složité účetní programy.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white text-base font-semibold rounded-lg px-6 py-3.5 hover:bg-primary/90 transition-colors shadow-sm"
            >
              Začít zdarma
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 text-base font-medium rounded-lg px-6 py-3.5 hover:bg-gray-50 transition-colors"
            >
              Přihlásit se
            </Link>
          </div>
          <p className="mt-5 text-sm text-gray-400">
            Bez kreditní karty. Bez závazků.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Vše co řemeslník potřebuje
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Navrženo pro řemeslníky — ne pro účetní.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <ClipboardList className="size-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Evidence zakázek
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Zákazníci, termíny, stav práce — vše přehledně na jednom
                místě. Nikdy nezapomenete na domluvený termín.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="size-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Faktury jedním klikem
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Faktura se vytvoří z dokončené zakázky automaticky.
                Zákazník dostane PDF na email, vy vidíte stav platby.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="size-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Přehled tržeb
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Tržby, neuhrazené faktury a otevřené zakázky přehledně.
                Víte přesně, kde stojíte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Jak to funguje
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
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
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-primary text-white font-bold text-lg rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Začněte ještě dnes — zdarma
          </h2>
          <p className="text-blue-200 mb-8 text-base sm:text-lg">
            Registrace zabere méně než 2 minuty. Bez kreditní karty, bez závazků.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-base rounded-lg px-6 py-3.5 hover:bg-blue-50 transition-colors shadow-sm"
          >
            Vyzkoušet zdarma
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm font-semibold text-white">
              Řemeslník<span className="text-blue-400">.app</span>
            </span>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Řemeslník.app. Všechna práva vyhrazena.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
