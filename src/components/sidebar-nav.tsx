"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  FileText,
  User,
} from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Přehled", icon: LayoutDashboard },
  { href: "/zakazky", label: "Zakázky", icon: ClipboardList },
  { href: "/zakaznici", label: "Zákazníci", icon: Users },
  { href: "/faktury", label: "Faktury", icon: FileText },
  { href: "/profile", label: "Profil", icon: User },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex-1 px-3 py-2 space-y-0.5">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + "/")
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Icon
              className={`size-5 shrink-0 ${
                isActive ? "text-blue-600" : "text-gray-400"
              }`}
            />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
