import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatCzk } from "@/lib/utils";

export const metadata = { title: "Faktury — Řemeslník.app" };

const STATUS_LABELS: Record<string, string> = {
  DRAFT: "Návrh",
  SENT: "Odesláno",
  PAID: "Zaplaceno",
  OVERDUE: "Po splatnosti",
  CANCELLED: "Zrušeno",
};

const STATUS_COLORS: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-700",
  SENT: "bg-blue-100 text-blue-700",
  PAID: "bg-green-100 text-green-700",
  OVERDUE: "bg-red-100 text-red-700",
  CANCELLED: "bg-gray-100 text-gray-400",
};

export default async function InvoicesPage() {
  const session = await auth();
  const invoices = await prisma.invoice.findMany({
    where: { userId: session!.user!.id! },
    include: { customer: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  const totalUnpaid = invoices
    .filter((i) => ["SENT", "OVERDUE"].includes(i.status))
    .reduce((s, i) => s + i.totalInclVat, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Faktury</h1>
        {totalUnpaid > 0 && (
          <div className="text-sm text-gray-500">
            Neuhrazeno: <span className="font-semibold text-orange-600">{formatCzk(totalUnpaid)}</span>
          </div>
        )}
      </div>

      {invoices.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p>Faktury se vytvoří automaticky po dokončení zakázky.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 bg-white rounded-lg border border-gray-200">
          {invoices.map((inv) => (
            <Link
              key={inv.id}
              href={`/invoices/${inv.id}`}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
            >
              <div>
                <div className="font-medium">{inv.invoiceNumber}</div>
                <div className="text-sm text-gray-500">{inv.customer.name}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium">{formatCzk(inv.totalInclVat)}</span>
                <span className={`text-xs px-2 py-1 rounded font-medium ${STATUS_COLORS[inv.status]}`}>
                  {STATUS_LABELS[inv.status]}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
