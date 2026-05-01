import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { PoptavkaForm } from "./PoptavkaForm";

export const metadata: Metadata = {
  title: "Zadat poptávku — Řemeslník.app",
  description:
    "Zadejte poptávku na řemeslníka v Praze. Zdarma, bez závazků, odezva do 24 hodin.",
};

export default function PoptavkaPage() {
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
            <span className="text-base font-semibold text-gray-900">Zadat poptávku</span>
          </div>
        </div>
      </header>

      {/* Progress indicator */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2">
            {["Typ práce", "Lokalita", "Popis", "Kontakt"].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                {i > 0 && <div className="w-6 h-px bg-gray-200" />}
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-navy-500 text-white text-xs flex items-center justify-center font-medium">
                    {i + 1}
                  </div>
                  <span className="text-xs text-gray-500 hidden sm:block">{step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <main className="flex-1 py-8">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900 mb-1">
              Popište, co potřebujete
            </h1>
            <p className="text-sm text-gray-500">
              Vyplnění trvá 2 minuty. Odezva do 24 hodin.
            </p>
          </div>
          <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 rounded-xl" />}>
            <PoptavkaForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
