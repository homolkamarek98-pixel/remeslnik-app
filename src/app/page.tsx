import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Řemeslník.app
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Vytvoříte zakázku na telefonu, dokončíte ji v terénu — zákazník dostane
          fakturu automaticky.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            Vyzkoušet zdarma
          </Link>
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Přihlásit se
          </Link>
        </div>
      </div>
    </main>
  );
}
