import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { JobStatus } from "@prisma/client";
import { formatCzk, calcVat } from "@/lib/utils";
import { JobStatusButton } from "@/components/JobStatusButton";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await prisma.job.findUnique({
    where: { id },
    select: { title: true },
  });
  return { title: job?.title ?? "Zakázka" };
}

const STATUS_LABELS: Record<JobStatus, string> = {
  DRAFT: "Návrh",
  SCHEDULED: "Naplánováno",
  IN_PROGRESS: "Probíhá",
  COMPLETED: "Dokončeno",
  CANCELLED: "Zrušeno",
};

const NEXT_STATUS: Partial<Record<JobStatus, { status: JobStatus; label: string; color: string }>> =
  {
    DRAFT: { status: JobStatus.SCHEDULED, label: "Naplánovat", color: "blue" },
    SCHEDULED: { status: JobStatus.IN_PROGRESS, label: "Zahájit", color: "orange" },
    IN_PROGRESS: { status: JobStatus.COMPLETED, label: "Dokončit zakázku", color: "green" },
  };

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/login");

  const { id } = await params;
  const job = await prisma.job.findFirst({
    where: { id, userId: session.user.id },
    include: {
      customer: true,
      items: true,
      photos: true,
      invoice: { select: { id: true, invoiceNumber: true, status: true, totalInclVat: true } },
    },
  });

  if (!job) notFound();

  const totalExclVat = job.items.reduce((sum, item) => {
    return sum + Number(item.quantity) * Number(item.unitPrice);
  }, 0);
  const totalVat = job.items.reduce((sum, item) => {
    const base = Number(item.quantity) * Number(item.unitPrice);
    return sum + calcVat(base, item.vatRate);
  }, 0);
  const totalInclVat = totalExclVat + totalVat;

  const nextAction = NEXT_STATUS[job.status];

  return (
    <div className="p-4 max-w-2xl mx-auto pb-24">
      <div className="flex items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <Link href={`/customers/${job.customer.id}`} className="text-orange-500 font-medium">
            {job.customer.name}
          </Link>
        </div>
        <span className="shrink-0 text-sm bg-gray-100 px-3 py-1 rounded-full">
          {STATUS_LABELS[job.status]}
        </span>
      </div>

      {job.description && (
        <p className="text-gray-600 mb-4 text-sm">{job.description}</p>
      )}

      {job.scheduledDate && (
        <p className="text-sm text-gray-500 mb-4">
          Datum: {job.scheduledDate.toLocaleDateString("cs-CZ")}
        </p>
      )}

      {/* Items */}
      {job.items.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Položky</h2>
          <div className="border rounded-xl overflow-hidden">
            {job.items.map((item, idx) => {
              const base = Number(item.quantity) * Number(item.unitPrice);
              const vat = calcVat(base, item.vatRate);
              return (
                <div
                  key={item.id}
                  className={`px-4 py-3 ${idx < job.items.length - 1 ? "border-b" : ""}`}
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-sm">{item.description}</p>
                      <p className="text-xs text-gray-500">
                        {Number(item.quantity)} {item.unit} × {formatCzk(item.unitPrice)}{" "}
                        | DPH {item.vatRate}%
                      </p>
                    </div>
                    <p className="font-semibold text-sm">{formatCzk(base + vat)}</p>
                  </div>
                </div>
              );
            })}
            <div className="bg-gray-50 px-4 py-3 border-t">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Bez DPH</span>
                <span>{formatCzk(totalExclVat)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>DPH</span>
                <span>{formatCzk(totalVat)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Celkem</span>
                <span>{formatCzk(totalInclVat)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoice link */}
      {job.invoice && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <p className="text-sm font-medium text-green-800">
            Faktura č. {job.invoice.invoiceNumber}
          </p>
          <Link
            href={`/invoices/${job.invoice.id}`}
            className="text-green-700 text-sm underline"
          >
            Zobrazit fakturu → {formatCzk(job.invoice.totalInclVat)}
          </Link>
        </div>
      )}

      {/* Status action button */}
      {nextAction && (
        <JobStatusButton jobId={job.id} nextStatus={nextAction} />
      )}

      <div className="mt-4">
        <Link
          href={`/jobs/${job.id}/edit`}
          className="block text-center border rounded-xl py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          Upravit zakázku
        </Link>
      </div>
    </div>
  );
}
