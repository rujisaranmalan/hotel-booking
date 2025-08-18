import { NextResponse } from "next/server";
import { HOTELS } from "@/lib/mockData";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const location = (searchParams.get("location") || "").toLowerCase().trim();

  if (!location) {
    return NextResponse.json({ hotels: [] });
  }

  const hotels = HOTELS.filter(h =>
    h.location.toLowerCase().includes(location)
  );

  return NextResponse.json({ hotels });
}
