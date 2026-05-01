import Link from "next/link";

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="text-lg font-bold text-navy-700 tracking-tight"
            >
              Řemeslník<span className="text-mkp-amber-500">.app</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <Link
                href="/remeslnici"
                className="hover:text-navy-700 transition-colors"
              >
                Katalog řemeslníků
              </Link>
              <Link
                href="/register"
                className="hover:text-navy-700 transition-colors"
              >
                Pro řemeslníky
              </Link>
            </nav>

            <Link
              href="/poptavka"
              className="inline-flex items-center gap-1.5 bg-navy-500 text-white text-sm font-semibold rounded-lg px-4 py-2.5 hover:bg-navy-700 transition-colors"
            >
              Zadat poptávku
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <p className="text-lg font-bold">
                Řemeslník<span className="text-mkp-amber-500">.app</span>
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Prověření řemeslníci v Praze
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">
                Pro zákazníky
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="/poptavka" className="hover:text-white transition-colors">
                    Zadat poptávku
                  </Link>
                </li>
                <li>
                  <Link href="/remeslnici" className="hover:text-white transition-colors">
                    Katalog řemeslníků
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">
                Pro řemeslníky
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="/register" className="hover:text-white transition-colors">
                    Registrace řemeslníka
                  </Link>
                </li>
              </ul>
              <div className="mt-6 space-y-1 text-sm text-gray-400">
                <p>📧 info@remeslnik.app</p>
                <p>📞 773 XXX XXX</p>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Řemeslník.app · Ochrana osobních údajů · Podmínky použití
          </div>
        </div>
      </footer>
    </div>
  );
}
