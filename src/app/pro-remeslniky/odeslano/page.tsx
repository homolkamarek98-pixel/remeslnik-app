import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Přihláška odeslána — Řemeslník.app",
  robots: { index: false },
};

export default function OdeslanPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="size-9 text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Přihláška přijata!
        </h1>
        <p className="text-gray-600 leading-relaxed mb-6">
          Děkujeme za zájem! Vaše přihláška je u nás. Do 24 hodin se vám ozveme
          a domluvíme se na dalším postupu.
        </p>

        <div className="bg-mkp-amber-100 rounded-xl px-5 py-4 text-sm text-left mb-6">
          <p className="font-semibold text-amber-800 mb-1">Co se stane dál?</p>
          <ol className="text-amber-700 text-xs space-y-1.5 list-decimal list-inside">
            <li>Zkontrolujeme vaši přihlášku a obor</li>
            <li>Zavoláme vám pro ověření</li>
            <li>Začneme vám posílat relevantní poptávky</li>
          </ol>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full flex items-center justify-center border border-navy-500 text-navy-500 font-medium rounded-lg px-6 py-3 hover:bg-navy-50 transition-colors text-sm"
          >
            Přejít na úvodní stránku
          </Link>
        </div>
      </div>
    </div>
  );
}
