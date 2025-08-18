import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json(); // booking summary
  // Pretend we charge a card / redirect to gateway and succeed.
  return NextResponse.json({ status: "success", ref: "PMT-" + Date.now() });
}
