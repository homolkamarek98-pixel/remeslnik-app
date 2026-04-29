import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: {
    default: "Řemeslník.app",
    template: "%s | Řemeslník.app",
  },
  description:
    "Správa zakázek a faktur pro řemeslníky. Vytvořte zakázku, dokončete ji v terénu, zákazník dostane fakturu automaticky.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Řemeslník",
  },
};

export const viewport: Viewport = {
  themeColor: "#f97316",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
