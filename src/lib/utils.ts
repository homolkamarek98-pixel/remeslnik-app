import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Převede haléře na Kč string: 12345 → "123,45 Kč" */
export function formatCzk(halers: number): string {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    minimumFractionDigits: 2,
  }).format(halers / 100);
}

/** Spočítá DPH z ceny bez DPH v haléřích */
export function calcVat(amountExclVat: number, vatRate: number): number {
  return Math.round(amountExclVat * (vatRate / 100));
}

/** Generuje číslo faktury formátu YYYY-NNNN */
export function generateInvoiceNumber(year: number, seq: number): string {
  return `${year}-${String(seq).padStart(4, "0")}`;
}

/** QR platba string dle CZ standardu SPD */
export function buildQrPaymentString({
  iban,
  amount,
  variableSymbol,
  message,
}: {
  iban: string;
  amount: number; // haléře
  variableSymbol: string;
  message?: string;
}): string {
  const amountCzk = (amount / 100).toFixed(2);
  let qr = `SPD*1.0*ACC:${iban}*AM:${amountCzk}*CC:CZK*VS:${variableSymbol}`;
  if (message) qr += `*MSG:${message.slice(0, 60)}`;
  return qr;
}
