import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCzk(halers: number): string {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    minimumFractionDigits: 2,
  }).format(halers / 100);
}

export function calcVat(amountExclVat: number, vatRate: number): number {
  return Math.round(amountExclVat * (vatRate / 100));
}

export function generateInvoiceNumber(year: number, seq: number): string {
  return `${year}-${String(seq).padStart(4, "0")}`;
}

export function buildQrPaymentString({
  iban,
  amount,
  variableSymbol,
  message,
}: {
  iban: string;
  amount: number;
  variableSymbol: string;
  message?: string;
}): string {
  const amountCzk = (amount / 100).toFixed(2);
  let qr = `SPD*1.0*ACC:${iban}*AM:${amountCzk}*CC:CZK*VS:${variableSymbol}`;
  if (message) qr += `*MSG:${message.slice(0, 60)}`;
  return qr;
}
