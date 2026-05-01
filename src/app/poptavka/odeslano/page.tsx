import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Poptávka odeslána — Řemeslník.app",
  robots: { index: false },
};

interface Props {
  searchParams: Promise<{ typ?: string; lokalita?: string }>;
}

export default async function OdeslanPage({ searchParams }: Props) {
  const { typ, lokalita } = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="size-9 text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Poptávka odeslána!
        </h1>
        <p className="text-gray-600 leading-relaxed mb-6">
          Děkujeme! Do 24 hodin vás zkontaktujeme s doporučením vhodného
          řemeslníka.
        </p>

        {(typ || lokalita) && (
          <div className="bg-gray-50 rounded-xl px-5 py-4 text-sm text-left mb-6 space-y-2">
            {typ && (
              <div className="flex gap-3">
                <span className="text-gray-500 w-24 shrink-0">Typ práce:</span>
                <span className="font-medium text-gray-800">{typ}</span>
              </div>
            )}
            {lokalita && (
              <div className="flex gap-3">
                <span className="text-gray-500 w-24 shrink-0">Lokalita:</span>
                <span className="font-medium text-gray-800">{lokalita}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Link
            href="/poptavka"
            className="w-full flex items-center justify-center border border-navy-500 text-navy-500 font-medium rounded-lg px-6 py-3 hover:bg-navy-50 transition-colors text-sm"
          >
            Zadat další poptávku
          </Link>
          <Link
            href="/"
            className="w-full flex items-center justify-center text-gray-500 font-medium rounded-lg px-6 py-3 hover:bg-gray-100 transition-colors text-sm"
          >
            Přejít na úvodní stránku
          </Link>
        </div>
      </div>
    </div>
  );
}
