import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatCzk } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = { title: "Přehled — Řemeslník.app" };

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user!.id!;

  const [user, openJobs, unpaidInvoices, monthRevenue] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, companyName: true, ico: true },
    }),
    prisma.job.count({
      where: { userId, status: { in: ["SCHEDULED", "IN_PROGRESS"] } },
    }),
    prisma.invoice.findMany({
      where: { userId, status: { in: ["SENT", "OVERDUE"] } },
      select: { totalInclVat: true },
    }),
    prisma.invoice.findMany({
      where: {
        userId,
        status: "PAID",
        paidAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
      select: { totalInclVat: true },
    }),
  ]);

  const profileComplete = user?.companyName && user?.ico;
  const totalUnpaid = unpaidInvoices.reduce((s, i) => s + i.totalInclVat, 0);
  const totalRevenue = monthRevenue.reduce((s, i) => s + i.totalInclVat, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Vítejte, {user?.name ?? "Řemeslníku"}
        </h1>
        <p className="text-gray-600 mt-1">
          {user?.companyName ?? "Nastavte svůj firemní profil"}
        </p>
      </div>

      {!profileComplete && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <p className="text-sm text-amber-800 mb-3">
              Před vydáním první faktury vyplňte firemní profil (IČO, adresa, bankovní spojení).
            </p>
            <Link href="/profile" className={cn(buttonVariants({ size: "sm" }))}>
              Vyplnit profil
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Aktivní zakázky</CardDescription>
            <CardTitle className="text-3xl">{openJobs}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/jobs" className="text-sm text-orange-600 hover:underline">Zobrazit zakázky →</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Neuhrazené faktury</CardDescription>
            <CardTitle className="text-3xl">{unpaidInvoices.length}</CardTitle>
          </CardHeader>
          <CardContent>
            {totalUnpaid > 0 && (
              <p className="text-sm text-orange-600 font-medium">{formatCzk(totalUnpaid)}</p>
            )}
            <Link href="/invoices" className="text-sm text-gray-500 hover:underline">Zobrazit faktury →</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Tržby tento měsíc</CardDescription>
            <CardTitle className="text-2xl">{formatCzk(totalRevenue)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="flex gap-4">
        <Link href="/jobs/new" className={cn(buttonVariants())}>
          + Nová zakázka
        </Link>
        <Link href="/customers/new" className={cn(buttonVariants({ variant: "outline" }))}>
          + Nový zákazník
        </Link>
      </div>
    </div>
  );
}
