import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Zakázky — Řemeslník.app" };

const STATUS_LABELS: Record<string, string> = {
  DRAFT: "Návrh",
  SCHEDULED: "Naplánováno",
  IN_PROGRESS: "Probíhá",
  COMPLETED: "Dokončeno",
  CANCELLED: "Zrušeno",
};

const STATUS_COLORS: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-700",
  SCHEDULED: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-orange-100 text-orange-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default async function JobsPage() {
  const session = await auth();
  const jobs = await prisma.job.findMany({
    where: { userId: session!.user!.id! },
    include: { customer: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Zakázky</h1>
        <Button asChild>
          <Link href="/jobs/new">+ Nová zakázka</Link>
        </Button>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="mb-4">Zatím žádné zakázky.</p>
          <Button asChild variant="outline">
            <Link href="/jobs/new">Vytvořit první zakázku</Link>
          </Button>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 bg-white rounded-lg border border-gray-200">
          {jobs.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
            >
              <div>
                <div className="font-medium">{job.title}</div>
                <div className="text-sm text-gray-500">{job.customer.name}</div>
              </div>
              <span className={`text-xs px-2 py-1 rounded font-medium ${STATUS_COLORS[job.status]}`}>
                {STATUS_LABELS[job.status]}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
