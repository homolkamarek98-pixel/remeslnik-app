import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="p-4 sm:p-6">
        <Link
          href="/"
          className="text-base font-bold text-gray-900 tracking-tight hover:opacity-80 transition-opacity"
        >
          Řemeslník<span className="text-primary">.app</span>
        </Link>
      </header>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
