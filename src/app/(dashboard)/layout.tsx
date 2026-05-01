import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, User, LogOut } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link
                href="/dashboard"
                className="text-base font-bold text-gray-900 tracking-tight"
              >
                Řemeslník<span className="text-primary">.app</span>
              </Link>
              <nav className="hidden sm:flex items-center gap-1">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/5 rounded-md px-3 py-2 transition-colors"
                >
                  <LayoutDashboard className="size-4" />
                  Přehled
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/5 rounded-md px-3 py-2 transition-colors"
                >
                  <User className="size-4" />
                  Profil
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:block truncate max-w-48">
                {session.user.email}
              </span>
              <form
                action={async () => {
                  "use server";
                  await logout();
                }}
              >
                <Button type="submit" variant="outline" size="sm" className="gap-1.5">
                  <LogOut className="size-3.5" />
                  <span className="hidden sm:inline">Odhlásit se</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
