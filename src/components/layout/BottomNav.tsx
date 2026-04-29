"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, BriefcaseIcon, UsersIcon, FileTextIcon } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Přehled", icon: HomeIcon },
  { href: "/jobs", label: "Zakázky", icon: BriefcaseIcon },
  { href: "/customers", label: "Zákazníci", icon: UsersIcon },
  { href: "/invoices", label: "Faktury", icon: FileTextIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t safe-area-inset-bottom z-50">
      <div className="flex items-stretch max-w-2xl mx-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs transition-colors ${
                active ? "text-orange-500" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? "stroke-orange-500" : ""}`} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
