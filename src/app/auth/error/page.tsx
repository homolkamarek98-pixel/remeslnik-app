"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const errors: Record<string, string> = {
  Configuration: "Chyba konfigurace serveru.",
  AccessDenied: "Přístup zamítnut.",
  Verification: "Ověřovací token vypršel nebo je neplatný.",
  Default: "Nastala chyba při přihlášení.",
};

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("error") ?? "Default";
  const message = errors[errorCode] ?? errors.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Chyba přihlášení</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <Link
          href="/auth/login"
          className="bg-orange-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition-colors"
        >
          Zpět na přihlášení
        </Link>
      </div>
    </div>
  );
}
