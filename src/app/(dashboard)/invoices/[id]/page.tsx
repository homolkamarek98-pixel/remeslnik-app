import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatCzk } from "@/lib/utils";
import { MarkPaidButton } from "@/components/MarkPaidButton";

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const { id } = await params;

  const invoice = await prisma.invoice.findFirst({
    where: { id, userId: session!.user!.id! },
    include: {
      customer: true,
      job: { select: { id: true, title: true } },
      items: true,
    },
  });

  if (!invoice) notFound();

  const issueDateStr = invoice.issueDate.toLocaleDateString("cs-CZ");
  const dueDateStr = invoice.dueDate.toLocaleDateString("cs-CZ");
  const canMarkPaid = ["SENT", "OVERDUE"].includes(invoice.status);

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/invoices" className="text-gray-500 hover:text-gray-700">← Faktury</Link>
        <h1 className="text-2xl font-bold flex-1">Faktura {invoice.invoiceNumber}</h1>
        {canMarkPaid && <MarkPaidButton invoiceId={invoice.id} />}
        {invoice.pdfUrl && (
          <a
            href={invoice.pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            PDF
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Zákazník</div>
          <Link href={`/customers/${invoice.customer.id}`} className="font-medium hover:underline">
            {invoice.customer.name}
          </Link>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Datum vystavení</div>
          <div className="font-medium">{issueDateStr}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-500">Splatnost</div>
          <div className={`font-medium ${invoice.status === "OVERDUE" ? "text-red-600" : ""}`}>
            {dueDateStr}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="px-4 py-2">Popis</th>
              <th className="px-4 py-2 text-right">Množství</th>
              <th className="px-4 py-2 text-right">Cena/jedn.</th>
              <th className="px-4 py-2 text-right">DPH</th>
              <th className="px-4 py-2 text-right">Celkem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoice.items.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2 text-right">{Number(item.quantity)} {item.unit}</td>
                <td className="px-4 py-2 text-right">{formatCzk(item.unitPrice)}</td>
                <td className="px-4 py-2 text-right">{item.vatRate} %</td>
                <td className="px-4 py-2 text-right font-medium">{formatCzk(item.totalInclVat)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <div className="bg-white rounded-lg border border-gray-200 p-4 min-w-64 space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Základ daně</span>
            <span>{formatCzk(invoice.totalExclVat)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>DPH</span>
            <span>{formatCzk(invoice.vatAmount)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2">
            <span>K úhradě</span>
            <span>{formatCzk(invoice.totalInclVat)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
