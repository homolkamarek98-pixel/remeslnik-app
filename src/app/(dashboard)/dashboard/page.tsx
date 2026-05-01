import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ClipboardList,
  Briefcase,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Plus,
  UserPlus,
} from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, companyName: true, ico: true },
  });

  const profileComplete = user?.companyName && user?.ico;

  return (
    <div className="space-y-8">
      {/* Page heading + action buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Přehled</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Vítejte zpět, {user?.name ?? "Řemeslníku"}
            {user?.companyName ? ` · ${user.companyName}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/zakazky"
            className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold rounded-lg px-4 py-2.5 hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="size-4" />
            Nová zakázka
          </Link>
          <Link
            href="/zakaznici"
            className="inline-flex items-center gap-2 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-colors"
          >
            <UserPlus className="size-4" />
            Nový zákazník
          </Link>
        </div>
      </div>

      {/* Profile completion banner */}
      {!profileComplete && (
        <div className="flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
          <AlertCircle className="size-5 text-yellow-600 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">
              Dokončete firemní profil
            </p>
            <p className="text-sm text-gray-600 mt-0.5">
              Před vydáním první faktury vyplňte IČO, adresu a bankovní spojení.
            </p>
          </div>
          <Link
            href="/profile"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 shrink-0"
          >
            Vyplnit
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      )}

      {/* Stats grid — 4 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Zakázky dnes */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-500">Zakázky dnes</p>
            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
              <ClipboardList className="size-5 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">0</p>
          <p className="text-xs text-gray-400 mt-1">Naplánováno na dnes</p>
        </div>

        {/* Otevřené zakázky */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-500">Otevřené zakázky</p>
            <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
              <Briefcase className="size-5 text-gray-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">0</p>
          <p className="text-xs text-gray-400 mt-1">Probíhající práce</p>
        </div>

        {/* Tržby tento měsíc */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-500">Tržby tento měsíc</p>
            <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="size-5 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">0 Kč</p>
          <p className="text-xs text-gray-400 mt-1">Celkem přijato</p>
        </div>

        {/* Po splatnosti */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-500">Po splatnosti</p>
            <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="size-5 text-red-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">0</p>
          <p className="text-xs text-gray-400 mt-1">Faktury po splatnosti</p>
        </div>
      </div>

      {/* Empty state */}
      <div className="bg-white rounded-xl border border-gray-200 p-10 text-center shadow-sm">
        <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
          <ClipboardList className="size-7 text-blue-600" />
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-2">
          Zatím žádné zakázky
        </h3>
        <p className="text-sm text-gray-500 max-w-xs mx-auto mb-5">
          Přidejte první zakázku a uvidíte, jak to funguje. Zabere to méně než minutu.
        </p>
        <Link
          href="/zakazky"
          className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold rounded-lg px-5 py-2.5 hover:bg-blue-700 transition-colors"
        >
          <Plus className="size-4" />
          Přidat první zakázku
        </Link>
      </div>
    </div>
  );
}
