"use client";

import { useEffect, useMemo } from "react";
import { useBookings } from "@/components/providers/BookingsProvider";
import type { Booking } from "@/lib/types";

export default function FinalizeBooking({ sp }: { sp: Record<string, string | undefined> }) {
  const { addBooking, bookings } = useBookings();

  const payload = useMemo(() => {
    const id = [
      sp.hotelId, sp.checkIn, sp.checkOut, sp.roomType, sp.total
    ].filter(Boolean).join("|"); // deterministic id for idempotency

    const b: Booking = {
      id,
      hotelId: sp.hotelId ?? "",
      hotelName: sp.hotelName ?? "Hotel",
      location: sp.location ?? "",
      thumbnail: sp.thumbnail ?? undefined,
      roomType: sp.roomType ?? "standard",
      checkIn: sp.checkIn ?? "",
      checkOut: sp.checkOut ?? "",
      guests: Number(sp.guests ?? 1),
      totalTHB: Number(sp.total ?? 0),
      method: sp.method ?? "Payment",
      createdAt: new Date().toISOString(),
    };
    return b;
  }, [sp]);

  useEffect(() => {
    if (!bookings.some(x => x.id === payload.id)) {
      addBooking(payload);
    }
    // no UI; this component only saves the booking
  }, [addBooking, bookings, payload]);

  return null;
}
