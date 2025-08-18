import type { Currency } from "@/components/providers/PreferencesProvider";

// Mock rates vs THB (tweak anytime)
const RATES: Record<Currency, number> = {
  THB: 1,
  USD: 0.028, // ~ 1 USD ≈ 36 THB
  EUR: 0.026, // ~ 1 EUR ≈ 38 THB
};

export function convertFromTHB(amountTHB: number, currency: Currency): number {
  return amountTHB * (RATES[currency] ?? 1);
}

export function formatCurrencyFromTHB(amountTHB: number, currency: Currency): string {
  const amount = convertFromTHB(amountTHB, currency);
  // choose a locale that renders the symbol nicely
  const locale = currency === "THB" ? "th-TH" : "en-US";
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
}
