import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ClipboardList, Receipt, TrendingUp, AlertCircle, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, companyName: true, ico: true },
  });

  const profileComplete = user?.companyName && user?.ico;

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Přehled
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Vítejte zpět, {user?.name ?? "Řemeslníku"}
          {user?.companyName ? ` · ${user.companyName}` : ""}
        </p>
      </div>

      {/* Profile completion banner */}
      {!profileComplete && (
        <div className="flex items-start gap-3 rounded-xl border border-warning/30 bg-warning-light p-4">
          <AlertCircle className="size-5 text-warning shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              Dokončete firemní profil
            </p>
            <p className="text-sm text-gray-600 mt-0.5">
              Před vydáním první faktury vyplňte IČO, adresu a bankovní spojení.
            </p>
          </div>
          <Link
            href="/profile"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 shrink-0"
          >
            Vyplnit
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Otevřené zakázky</CardDescription>
              <ClipboardList className="size-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold">0</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Dnes aktivní</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Neuhrazené faktury</CardDescription>
              <Receipt className="size-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold">0</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Čeká na platbu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Tržby tento měsíc</CardDescription>
              <TrendingUp className="size-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold">0 Kč</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Celkem přijato</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
