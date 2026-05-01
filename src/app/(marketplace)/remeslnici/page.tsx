import type { Metadata } from "next";
import Link from "next/link";
import { CraftsmanFilter } from "./CraftsmanFilter";

export const metadata: Metadata = {
  title: "Katalog řemeslníků Praha | Řemeslník.app",
  description:
    "Prověření elektrikáři, instalatéři, malíři a další řemeslníci v Praze. Prohlédněte si profily, hodnocení a kontakty.",
};

export default function CatalogPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-700 text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-mkp-amber-500 mb-3">
            Prověření řemeslníci
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            Katalog řemeslníků v Praze
          </h1>
          <p className="mt-4 text-lg text-navy-100 max-w-xl mx-auto">
            Vyberte řemeslo, prohlédněte si profily a kontaktujte toho pravého.
          </p>
          <div className="mt-8">
            <Link
              href="/poptavka"
              className="inline-flex items-center gap-2 bg-mkp-amber-500 text-white font-semibold rounded-lg px-7 py-3.5 hover:bg-mkp-amber-600 transition-colors shadow-lg"
            >
              Zadat poptávku zdarma →
            </Link>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CraftsmanFilter />
      </section>

      {/* CTA banner */}
      <section className="bg-navy-50 border-t border-navy-100 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-navy-700">
            Nenašli jste co hledáte?
          </h2>
          <p className="mt-2 text-gray-600">
            Zadejte poptávku a my najdeme správného řemeslníka za vás — do 24 hodin.
          </p>
          <Link
            href="/poptavka"
            className="mt-6 inline-flex items-center gap-2 bg-navy-700 text-white font-semibold rounded-lg px-7 py-3.5 hover:bg-navy-900 transition-colors"
          >
            Zadat poptávku zdarma →
          </Link>
        </div>
      </section>
    </div>
  );
}
