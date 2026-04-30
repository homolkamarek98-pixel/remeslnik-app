import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Zákazníci — Řemeslník.app" };

export default async function CustomersPage() {
  const session = await auth();
  const customers = await prisma.customer.findMany({
    where: { userId: session!.user!.id! },
    orderBy: { name: "asc" },
    include: { _count: { select: { jobs: true, invoices: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Zákazníci</h1>
        <Button asChild>
          <Link href="/customers/new">+ Přidat zákazníka</Link>
        </Button>
      </div>

      {customers.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="mb-4">Zatím žádní zákazníci.</p>
          <Button asChild variant="outline">
            <Link href="/customers/new">Přidat prvního zákazníka</Link>
          </Button>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 bg-white rounded-lg border border-gray-200">
          {customers.map((c) => (
            <Link
              key={c.id}
              href={`/customers/${c.id}`}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
            >
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-sm text-gray-500">
                  {c.email ?? c.phone ?? (c.ico ? `IČO: ${c.ico}` : "")}
                </div>
              </div>
              <div className="text-sm text-gray-400">
                {c._count.jobs} zakázek · {c._count.invoices} faktur
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
