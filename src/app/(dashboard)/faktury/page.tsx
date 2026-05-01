import { FileText, Plus } from "lucide-react";
import Link from "next/link";

export default function FakturyPage() {
  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Faktury</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Přehled vystavených faktur a plateb
          </p>
        </div>
        <Link
          href="/faktury/nova"
          className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold rounded-lg px-4 py-2.5 hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="size-4" />
          Nová faktura
        </Link>
      </div>

      {/* Empty state */}
      <div className="bg-white rounded-xl border border-gray-200 p-16 text-center shadow-sm">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <FileText className="size-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Zatím žádné faktury
        </h3>
        <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6 leading-relaxed">
          Faktury se automaticky vytvoří z dokončených zakázek, nebo je
          můžete vystavit ručně.
        </p>
        <Link
          href="/faktury/nova"
          className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold rounded-lg px-5 py-2.5 hover:bg-blue-700 transition-colors"
        >
          <Plus className="size-4" />
          Vystavit fakturu
        </Link>
      </div>
    </div>
  );
}
