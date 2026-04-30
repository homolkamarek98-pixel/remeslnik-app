"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function MarkPaidButton({ invoiceId }: { invoiceId: string }) {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter();

  async function markPaid() {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }
    setLoading(true);
    try {
      await fetch(`/api/invoices/${invoiceId}/mark-paid`, { method: "PATCH" });
      router.refresh();
    } finally {
      setLoading(false);
      setConfirmed(false);
    }
  }

  if (loading) return <Button disabled>Ukládám...</Button>;

  return (
    <Button
      variant={confirmed ? "destructive" : "default"}
      onClick={markPaid}
    >
      {confirmed ? "Potvrdit zaplacení?" : "Označit jako zaplaceno"}
    </Button>
  );
}
