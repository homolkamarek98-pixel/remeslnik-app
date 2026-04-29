import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { formatCzk } from "@/lib/utils";
import { JobStatus, InvoiceStatus } from "@prisma/client";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/login");

  const userId = session.user.id;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [todayJobs, overdueInvoices, monthRevenue, openJobs] =
    await Promise.all([
      prisma.job.count({
        where: {
          userId,
          scheduledDate: { gte: today, lt: tomorrow },
          status: { in: [JobStatus.SCHEDULED, JobStatus.IN_PROGRESS] },
        },
      }),
      prisma.invoice.findMany({
        where: { userId, status: InvoiceStatus.OVERDUE },
        select: { id: true, invoiceNumber: true, totalInclVat: true, dueDate: true },
        orderBy: { dueDate: "asc" },
        take: 5,
      }),
      prisma.invoice.aggregate({
        where: {
          userId,
          status: InvoiceStatus.PAID,
          paidAt: {
            gte: new Date(today.getFullYear(), today.getMonth(), 1),
          },
        },
        _sum: { totalInclVat: true },
      }),
      prisma.job.count({
        where: {
          userId,
          status: { in: [JobStatus.DRAFT, JobStatus.SCHEDULED, JobStatus.IN_PROGRESS] },
        },
      }),
    ]);

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Přehled</h1>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Zakázky dnes"
          value={String(todayJobs)}
          href="/jobs?filter=today"
          color="orange"
        />
        <StatCard
          label="Otevřené zakázky"
          value={String(openJobs)}
          href="/jobs"
          color="blue"
        />
        <StatCard
          label="Tržby tento měsíc"
          value={formatCzk(monthRevenue._sum.totalInclVat ?? 0)}
          href="/invoices?status=paid"
          color="green"
        />
        <StatCard
          label="Po splatnosti"
          value={String(overdueInvoices.length)}
          href="/invoices?status=overdue"
          color={overdueInvoices.length > 0 ? "red" : "gray"}
        />
      </div>

      {/* Overdue invoices */}
      {overdueInvoices.length > 0 && (
        <div>
          <h2 className="font-semibold text-gray-700 mb-3">Po splatnosti</h2>
          <div className="space-y-2">
            {overdueInvoices.map((inv) => (
              <Link
                key={inv.id}
                href={`/invoices/${inv.id}`}
                className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg p-3 hover:bg-red-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-sm">Faktura č. {inv.invoiceNumber}</p>
                  <p className="text-xs text-red-600">
                    Splatnost: {inv.dueDate.toLocaleDateString("cs-CZ")}
                  </p>
                </div>
                <p className="font-bold text-red-700 text-sm">
                  {formatCzk(inv.totalInclVat)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/jobs/new"
          className="bg-orange-500 text-white rounded-xl p-4 text-center font-semibold hover:bg-orange-600 transition-colors"
        >
          + Nová zakázka
        </Link>
        <Link
          href="/customers/new"
          className="bg-white border rounded-xl p-4 text-center font-semibold hover:bg-gray-50 transition-colors"
        >
          + Nový zákazník
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
  color,
}: {
  label: string;
  value: string;
  href: string;
  color: "orange" | "blue" | "green" | "red" | "gray";
}) {
  const colorMap = {
    orange: "border-orange-200 bg-orange-50",
    blue: "border-blue-200 bg-blue-50",
    green: "border-green-200 bg-green-50",
    red: "border-red-200 bg-red-50",
    gray: "border-gray-200 bg-gray-50",
  };

  return (
    <Link
      href={href}
      className={`border rounded-xl p-4 hover:opacity-80 transition-opacity ${colorMap[color]}`}
    >
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </Link>
  );
}
