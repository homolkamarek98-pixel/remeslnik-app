"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Nastala neočekávaná chyba
            </h1>
            <p className="text-gray-500 mb-6">
              Chyba byla automaticky nahlášena. Zkuste to prosím znovu.
            </p>
            <button
              onClick={reset}
              className="bg-orange-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-orange-600"
            >
              Zkusit znovu
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
