import { PricingInput, PricingResult, RoomType } from "./types";

const ROOM_RATE: Record<RoomType, number> = {
  standard: 1200,
  deluxe: 1800,
  suite: 2700,
};

// We’ll use a universal rate table for pricing API.
// (UI will still show hotel-specific labels; rates come from API by roomType.)
export function computePricing(input: PricingInput): PricingResult {
  const base = ROOM_RATE[input.roomType];
  const subtotal = round2(base * input.days);
  const vat = round2(subtotal * 0.07);
  const total = round2(subtotal + vat);
  return { subtotal, vat, total };
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}
