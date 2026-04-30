import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatCzk } from "@/lib/utils";
import { JobStatusButton } from "@/components/JobStatusButton";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const { id } = await params;

  const job = await prisma.job.findFirst({
    where: { id, userId: session!.user!.id! },
    include: {
      customer: true,
      items: true,
      photos: true,
      invoice: { select: { id: true, status: true, invoiceNumber: true, totalInclVat: true, pdfUrl: true } },
    },
  });

  if (!job) notFound();

  const total = job.items.reduce((s, i) => s + Number(i.unitPrice) * Number(i.quantity), 0);

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/jobs" className="text-gray-500 hover:text-gray-700">← Zakázky</Link>
        <h1 className="text-2xl font-bold flex-1">{job.title}</h1>
        <JobStatusButton jobId={job.id} status={job.status as "DRAFT" | "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="font-semibold mb-3">Zákazník</h2>
          <Link href={`/customers/${job.customer.id}`} className="font-medium hover:underline">
            {job.customer.name}
          </Link>
          {job.customer.email && <p className="text-sm text-gray-500 mt-1">{job.customer.email}</p>}
          {job.customer.phone && <p className="text-sm text-gray-500">{job.customer.phone}</p>}
        </div>

        {job.invoice && (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="font-semibold mb-3">Faktura</h2>
            <Link href={`/invoices/${job.invoice.id}`} className="font-medium hover:underline">
              {job.invoice.invoiceNumber}
            </Link>
            <p className="text-sm text-gray-500 mt-1">{formatCzk(job.invoice.totalInclVat)}</p>
            {job.invoice.pdfUrl && (
              <a href={job.invoice.pdfUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline mt-1 block">
                Stáhnout PDF
              </a>
            )}
          </div>
        )}
      </div>

      {job.description && (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <h2 className="font-semibold mb-2">Popis</h2>
          <p className="text-sm text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="font-semibold">Položky</h2>
          <span className="text-sm font-medium">{formatCzk(total)}</span>
        </div>
        {job.items.length === 0 ? (
          <p className="px-4 py-3 text-sm text-gray-500">Žádné položky.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {job.items.map((item) => (
              <div key={item.id} className="flex justify-between px-4 py-2 text-sm">
                <div>
                  <span className="font-medium">{item.description}</span>
                  <span className="text-gray-400 ml-2">{Number(item.quantity)} {item.unit}</span>
                </div>
                <span>{formatCzk(Number(item.unitPrice) * Number(item.quantity))}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {job.photos.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="font-semibold mb-3">Fotky</h2>
          <div className="grid grid-cols-3 gap-2">
            {job.photos.map((photo) => (
              <a key={photo.id} href={photo.url} target="_blank" rel="noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt="" className="rounded object-cover w-full aspect-square" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
