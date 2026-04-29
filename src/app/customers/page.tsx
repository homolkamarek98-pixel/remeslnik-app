import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserIcon } from "lucide-react";

export const metadata = { title: "Zákazníci" };

export default async function CustomersPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/login");

  const customers = await prisma.customer.findMany({
    where: { userId: session.user.id },
    orderBy: { name: "asc" },
    include: { _count: { select: { jobs: true } } },
  });

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Zákazníci</h1>
        <Link
          href="/customers/new"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors"
        >
          + Přidat
        </Link>
      </div>

      {customers.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <UserIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Zatím žádní zákazníci</p>
          <Link href="/customers/new" className="text-orange-500 font-medium mt-2 block">
            Přidat prvního zákazníka →
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {customers.map((c) => (
            <Link
              key={c.id}
              href={`/customers/${c.id}`}
              className="flex items-center justify-between bg-white border rounded-xl p-4 hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-gray-500">{c.email ?? c.phone ?? "—"}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">{c._count.jobs} zakázek</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
