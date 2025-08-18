import { NextResponse } from "next/server";
import { computePricing } from "@/lib/pricing";
import { PricingInput } from "@/lib/types";

export async function POST(req: Request) {
  const data = (await req.json()) as PricingInput;
  if (!data?.roomType || !Number.isFinite(data?.days) || data.days < 1) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const result = computePricing(data);
  return NextResponse.json(result);
}
