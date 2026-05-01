import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { SidebarNav } from "@/components/sidebar-nav";
import { LogOut, Menu } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="h-full flex bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-60 lg:fixed lg:inset-y-0 lg:z-40 bg-white border-r border-gray-200">
        {/* Logo */}
        <div className="flex items-center h-16 px-5 border-b border-gray-200 shrink-0">
          <Link
            href="/dashboard"
            className="text-base font-bold text-gray-900 tracking-tight"
          >
            Řemeslník<span className="text-blue-600">.app</span>
          </Link>
        </div>

        {/* Navigation */}
        <SidebarNav />

        {/* User & Logout */}
        <div className="mt-auto px-3 py-4 border-t border-gray-200">
          <div className="px-3 mb-3">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">
              Přihlášen jako
            </p>
            <p className="text-sm text-gray-700 truncate font-medium">
              {session.user.email}
            </p>
          </div>
          <form
            action={async () => {
              "use server";
              await logout();
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <LogOut className="size-5 text-gray-400 shrink-0" />
              Odhlásit se
            </button>
          </form>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 lg:pl-60 min-h-screen">
        {/* Mobile top header */}
        <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-14 px-4">
            <Link
              href="/dashboard"
              className="text-base font-bold text-gray-900 tracking-tight"
            >
              Řemeslník<span className="text-blue-600">.app</span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 truncate max-w-36">
                {session.user.email}
              </span>
              {/* Mobile menu — simple icon, no JS needed for basic layout */}
              <Menu className="size-5 text-gray-500" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
