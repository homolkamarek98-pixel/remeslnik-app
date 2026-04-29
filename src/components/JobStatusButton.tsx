"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { JobStatus } from "@prisma/client";

interface Props {
  jobId: string;
  nextStatus: { status: JobStatus; label: string; color: string };
}

const COLOR_MAP = {
  blue: "bg-blue-500 hover:bg-blue-600",
  orange: "bg-orange-500 hover:bg-orange-600",
  green: "bg-green-500 hover:bg-green-600",
};

export function JobStatusButton({ jobId, nextStatus }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    const res = await fetch(`/api/jobs/${jobId}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus.status }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error ?? "Chyba při změně stavu");
    }
    setLoading(false);
  }

  const colorCls = COLOR_MAP[nextStatus.color as keyof typeof COLOR_MAP] ?? COLOR_MAP.orange;

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`w-full ${colorCls} text-white font-semibold rounded-xl py-4 text-lg transition-colors disabled:opacity-50`}
    >
      {loading ? "Ukládám..." : nextStatus.label}
    </button>
  );
}
