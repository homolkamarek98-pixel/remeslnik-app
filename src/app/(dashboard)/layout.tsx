import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="font-bold text-lg text-gray-900">
                Řemeslník.app
              </Link>
              <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
                <Link href="/dashboard" className="hover:text-gray-900">
                  Přehled
                </Link>
                <Link href="/profile" className="hover:text-gray-900">
                  Profil
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:block">
                {session.user.email}
              </span>
              <form
                action={async () => {
                  "use server";
                  await logout();
                }}
              >
                <Button type="submit" variant="outline" size="sm">
                  Odhlásit se
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
