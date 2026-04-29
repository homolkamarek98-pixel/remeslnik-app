"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function MarkPaidButton({ invoiceId }: { invoiceId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!confirm("Označit fakturu jako zaplacenou?")) return;
    setLoading(true);

    const res = await fetch(`/api/invoices/${invoiceId}/mark-paid`, {
      method: "POST",
    });

    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error ?? "Chyba");
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl py-4 transition-colors disabled:opacity-50"
    >
      {loading ? "Ukládám..." : "✓ Označit jako zaplaceno"}
    </button>
  );
}
