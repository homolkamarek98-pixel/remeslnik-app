import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
            <CardDescription>Otevřené zakázky dnes</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Neuhrazené faktury</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Tržby tento měsíc</CardDescription>
            <CardTitle className="text-3xl">0 Kč</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
