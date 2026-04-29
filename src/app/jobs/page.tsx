import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { JobStatus } from "@prisma/client";
import { BriefcaseIcon } from "lucide-react";

export const metadata = { title: "Zakázky" };

const STATUS_LABELS: Record<JobStatus, string> = {
  DRAFT: "Návrh",
  SCHEDULED: "Naplánováno",
  IN_PROGRESS: "Probíhá",
  COMPLETED: "Dokončeno",
  CANCELLED: "Zrušeno",
};

const STATUS_COLORS: Record<JobStatus, string> = {
  DRAFT: "bg-gray-100 text-gray-600",
  SCHEDULED: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-orange-100 text-orange-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-600",
};

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/login");

  const { filter } = await searchParams;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const where: Parameters<typeof prisma.job.findMany>[0]["where"] = {
    userId: session.user.id,
  };

  if (filter === "today") {
    where.scheduledDate = { gte: today, lt: tomorrow };
    where.status = { in: [JobStatus.SCHEDULED, JobStatus.IN_PROGRESS] };
  } else if (filter === "week") {
    where.scheduledDate = { gte: today, lt: nextWeek };
  } else {
    // Default: open jobs
    where.status = { in: [JobStatus.DRAFT, JobStatus.SCHEDULED, JobStatus.IN_PROGRESS] };
  }

  const jobs = await prisma.job.findMany({
    where,
    orderBy: [{ scheduledDate: "asc" }, { createdAt: "desc" }],
    include: { customer: { select: { name: true } } },
  });

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Zakázky</h1>
        <Link
          href="/jobs/new"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors"
        >
          + Přidat
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {[
          { label: "Otevřené", value: "" },
          { label: "Dnes", value: "today" },
          { label: "Týden", value: "week" },
        ].map((tab) => (
          <Link
            key={tab.value}
            href={`/jobs${tab.value ? `?filter=${tab.value}` : ""}`}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              (filter ?? "") === tab.value
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <BriefcaseIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Žádné zakázky</p>
          <Link href="/jobs/new" className="text-orange-500 font-medium mt-2 block">
            Přidat zakázku →
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {jobs.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="block bg-white border rounded-xl p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-semibold truncate">{job.title}</p>
                  <p className="text-sm text-gray-500">{job.customer.name}</p>
                  {job.scheduledDate && (
                    <p className="text-xs text-gray-400 mt-1">
                      {job.scheduledDate.toLocaleDateString("cs-CZ")}
                    </p>
                  )}
                </div>
                <span
                  className={`shrink-0 text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[job.status]}`}
                >
                  {STATUS_LABELS[job.status]}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
