"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type JobStatus = "DRAFT" | "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

const NEXT_STATUS: Partial<Record<JobStatus, { status: JobStatus; label: string; variant: "default" | "outline" | "destructive" }>> = {
  DRAFT: { status: "SCHEDULED", label: "Naplánovat", variant: "outline" },
  SCHEDULED: { status: "IN_PROGRESS", label: "Zahájit práci", variant: "default" },
  IN_PROGRESS: { status: "COMPLETED", label: "Dokončit zakázku", variant: "default" },
};

const STATUS_COLORS: Record<JobStatus, string> = {
  DRAFT: "bg-gray-100 text-gray-700",
  SCHEDULED: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-orange-100 text-orange-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const STATUS_LABELS: Record<JobStatus, string> = {
  DRAFT: "Návrh",
  SCHEDULED: "Naplánováno",
  IN_PROGRESS: "Probíhá",
  COMPLETED: "Dokončeno",
  CANCELLED: "Zrušeno",
};

export function JobStatusButton({ jobId, status }: { jobId: string; status: JobStatus }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const next = NEXT_STATUS[status];

  async function advance() {
    if (!next) return;
    setLoading(true);
    try {
      await fetch(`/api/jobs/${jobId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next.status }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className={`px-2 py-1 rounded text-xs font-medium ${STATUS_COLORS[status]}`}>
        {STATUS_LABELS[status]}
      </span>
      {next && (
        <Button
          variant={next.variant}
          size="sm"
          onClick={advance}
          disabled={loading}
        >
          {loading ? "..." : next.label}
        </Button>
      )}
    </div>
  );
}
