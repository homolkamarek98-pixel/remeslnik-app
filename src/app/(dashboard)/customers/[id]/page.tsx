import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatCzk } from "@/lib/utils";

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const { id } = await params;

  const customer = await prisma.customer.findFirst({
    where: { id, userId: session!.user!.id! },
    include: {
      jobs: { orderBy: { createdAt: "desc" } },
      invoices: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!customer) notFound();

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/customers" className="text-gray-500 hover:text-gray-700">← Zákazníci</Link>
        <h1 className="text-2xl font-bold">{customer.name}</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="font-semibold mb-3">Kontaktní údaje</h2>
          <dl className="space-y-1 text-sm">
            {customer.email && <div><dt className="text-gray-500">E-mail</dt><dd>{customer.email}</dd></div>}
            {customer.phone && <div><dt className="text-gray-500">Telefon</dt><dd>{customer.phone}</dd></div>}
            {customer.street && <div><dt className="text-gray-500">Adresa</dt><dd>{customer.street}, {customer.zip} {customer.city}</dd></div>}
            {customer.ico && <div><dt className="text-gray-500">IČO</dt><dd>{customer.ico}</dd></div>}
            {customer.dic && <div><dt className="text-gray-500">DIČ</dt><dd>{customer.dic}</dd></div>}
          </dl>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Zakázky</h2>
            <Link
              href={`/jobs/new?customerId=${customer.id}`}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              + Nová zakázka
            </Link>
          </div>
          {customer.jobs.length === 0 ? (
            <p className="text-sm text-gray-500">Žádné zakázky.</p>
          ) : (
            <ul className="space-y-2">
              {customer.jobs.map((job) => (
                <li key={job.id}>
                  <Link href={`/jobs/${job.id}`} className="text-sm hover:underline">
                    {job.title}
                  </Link>
                  <span className="ml-2 text-xs text-gray-400">{job.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {customer.invoices.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200">
          <h2 className="font-semibold px-4 py-3 border-b border-gray-200">Faktury</h2>
          <div className="divide-y divide-gray-100">
            {customer.invoices.map((inv) => (
              <Link
                key={inv.id}
                href={`/invoices/${inv.id}`}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 text-sm"
              >
                <span>{inv.invoiceNumber}</span>
                <span className="text-gray-500">{formatCzk(inv.totalInclVat)}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${inv.status === "PAID" ? "bg-green-100 text-green-700" : inv.status === "OVERDUE" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}`}>
                  {inv.status}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
