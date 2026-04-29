import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { InvoiceStatus } from "@prisma/client";
import { formatCzk } from "@/lib/utils";
import { BottomNav } from "@/components/layout/BottomNav";

export const metadata = { title: "Faktury" };

const STATUS_LABELS: Record<InvoiceStatus, string> = {
  DRAFT: "Návrh",
  SENT: "Odesláno",
  PAID: "Zaplaceno",
  OVERDUE: "Po splatnosti",
  CANCELLED: "Stornováno",
};

const STATUS_COLORS: Record<InvoiceStatus, string> = {
  DRAFT: "bg-gray-100 text-gray-600",
  SENT: "bg-blue-100 text-blue-700",
  PAID: "bg-green-100 text-green-700",
  OVERDUE: "bg-red-100 text-red-700",
  CANCELLED: "bg-gray-100 text-gray-400",
};

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/login");

  const { status } = await searchParams;

  const invoices = await prisma.invoice.findMany({
    where: {
      userId: session.user.id,
      ...(status ? { status: status as InvoiceStatus } : {}),
    },
    orderBy: { createdAt: "desc" },
    include: { customer: { select: { name: true } } },
    take: 50,
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Faktury</h1>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {[
            { label: "Všechny", value: "" },
            { label: "Odesláno", value: "SENT" },
            { label: "Po splatnosti", value: "OVERDUE" },
            { label: "Zaplaceno", value: "PAID" },
          ].map((tab) => (
            <Link
              key={tab.value}
              href={`/invoices${tab.value ? `?status=${tab.value}` : ""}`}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium ${
                (status ?? "") === tab.value
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {invoices.length === 0 ? (
          <p className="text-center py-12 text-gray-400">Žádné faktury</p>
        ) : (
          <div className="space-y-2">
            {invoices.map((inv) => (
              <Link
                key={inv.id}
                href={`/invoices/${inv.id}`}
                className="flex items-center justify-between bg-white border rounded-xl p-4 hover:bg-gray-50"
              >
                <div>
                  <p className="font-semibold text-sm">č. {inv.invoiceNumber}</p>
                  <p className="text-xs text-gray-500">{inv.customer.name}</p>
                  <p className="text-xs text-gray-400">
                    Splatnost: {inv.dueDate.toLocaleDateString("cs-CZ")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatCzk(inv.totalInclVat)}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[inv.status]}`}
                  >
                    {STATUS_LABELS[inv.status]}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
