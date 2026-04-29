import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { InvoiceStatus } from "@prisma/client";
import { formatCzk, buildQrPaymentString } from "@/lib/utils";
import Link from "next/link";
import { MarkPaidButton } from "@/components/MarkPaidButton";
import { BottomNav } from "@/components/layout/BottomNav";

const STATUS_LABELS: Record<InvoiceStatus, string> = {
  DRAFT: "Návrh",
  SENT: "Odesláno",
  PAID: "Zaplaceno",
  OVERDUE: "Po splatnosti",
  CANCELLED: "Stornováno",
};

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/login");

  const { id } = await params;
  const invoice = await prisma.invoice.findFirst({
    where: { id, userId: session.user.id },
    include: {
      customer: true,
      items: true,
      job: { select: { id: true, title: true } },
    },
  });

  if (!invoice) notFound();

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { bankAccount: true },
  });

  const qrString =
    user?.bankAccount &&
    [InvoiceStatus.SENT, InvoiceStatus.OVERDUE].includes(invoice.status)
      ? buildQrPaymentString({
          iban: user.bankAccount,
          amount: invoice.totalInclVat,
          variableSymbol: invoice.invoiceNumber.replace("-", ""),
          message: `Faktura ${invoice.invoiceNumber}`,
        })
      : null;

  const canMarkPaid = [InvoiceStatus.SENT, InvoiceStatus.OVERDUE].includes(invoice.status);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="p-4 max-w-2xl mx-auto">
        <div className="flex items-start justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Faktura č. {invoice.invoiceNumber}</h1>
            <Link href={`/customers/${invoice.customer.id}`} className="text-orange-500">
              {invoice.customer.name}
            </Link>
          </div>
          <span
            className={`text-sm px-3 py-1 rounded-full ${
              invoice.status === InvoiceStatus.PAID
                ? "bg-green-100 text-green-700"
                : invoice.status === InvoiceStatus.OVERDUE
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            {STATUS_LABELS[invoice.status]}
          </span>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4 bg-white border rounded-xl p-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">Vystaveno</p>
            <p className="font-medium">{invoice.issueDate.toLocaleDateString("cs-CZ")}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Splatnost</p>
            <p
              className={`font-medium ${
                invoice.status === InvoiceStatus.OVERDUE ? "text-red-600" : ""
              }`}
            >
              {invoice.dueDate.toLocaleDateString("cs-CZ")}
            </p>
          </div>
          {invoice.paidAt && (
            <div>
              <p className="text-xs text-gray-500">Zaplaceno</p>
              <p className="font-medium text-green-600">
                {invoice.paidAt.toLocaleDateString("cs-CZ")}
              </p>
            </div>
          )}
          {invoice.job && (
            <div>
              <p className="text-xs text-gray-500">Zakázka</p>
              <Link href={`/jobs/${invoice.job.id}`} className="font-medium text-orange-500">
                {invoice.job.title}
              </Link>
            </div>
          )}
        </div>

        {/* Items */}
        <div className="border rounded-xl overflow-hidden mb-4">
          {invoice.items.map((item, idx) => (
            <div
              key={item.id}
              className={`px-4 py-3 ${idx < invoice.items.length - 1 ? "border-b" : ""}`}
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-medium text-sm">{item.description}</p>
                  <p className="text-xs text-gray-500">
                    {Number(item.quantity)} {item.unit} × {formatCzk(item.unitPrice)} | DPH {item.vatRate}%
                  </p>
                </div>
                <p className="font-semibold text-sm">{formatCzk(item.totalInclVat)}</p>
              </div>
            </div>
          ))}
          <div className="bg-gray-50 px-4 py-3 border-t space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Základ daně</span>
              <span>{formatCzk(invoice.totalExclVat)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>DPH</span>
              <span>{formatCzk(invoice.vatAmount)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-1">
              <span>K úhradě</span>
              <span className="text-orange-500">{formatCzk(invoice.totalInclVat)}</span>
            </div>
          </div>
        </div>

        {/* QR platba */}
        {qrString && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
            <p className="text-xs font-medium text-blue-700 mb-1">QR Platba</p>
            <p className="text-xs font-mono text-blue-600 break-all">{qrString}</p>
          </div>
        )}

        {/* PDF download */}
        {invoice.pdfUrl && (
          <a
            href={invoice.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center border rounded-xl py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 mb-3"
          >
            Stáhnout PDF →
          </a>
        )}

        {/* Mark as paid */}
        {canMarkPaid && <MarkPaidButton invoiceId={invoice.id} />}
      </div>
      <BottomNav />
    </div>
  );
}
