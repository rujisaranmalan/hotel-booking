"use client";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import { formatCurrencyFromTHB } from "@/lib/currency";

export default function Money({ amountTHB }: { amountTHB: number }) {
  const { currency } = usePreferences();
  return <>{formatCurrencyFromTHB(amountTHB, currency)}</>;
}
