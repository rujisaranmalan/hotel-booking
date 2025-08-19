"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Booking } from "@/lib/types";

const KEY = "hb.bookings.v1";

type Ctx = {
  bookings: Booking[];
  addBooking: (b: Booking) => void;
  removeBooking: (id: string) => void;
  clearBookings: () => void;
};
const BookingsContext = createContext<Ctx | null>(null);

export function BookingsProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setBookings(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(bookings));
    } catch {}
  }, [bookings]);

  const addBooking = (b: Booking) =>
    setBookings((prev) => {
      if (prev.some(x => x.id === b.id)) return prev; // idempotent
      return [b, ...prev];
    });

  const removeBooking = (id: string) =>
    setBookings((prev) => prev.filter((b) => b.id !== id));

  const clearBookings = () => setBookings([]);

  const value = useMemo(() => ({ bookings, addBooking, removeBooking, clearBookings }), [bookings]);

  return <BookingsContext.Provider value={value}>{children}</BookingsContext.Provider>;
}

export const useBookings = () => {
  const ctx = useContext(BookingsContext);
  if (!ctx) throw new Error("useBookings must be used within BookingsProvider");
  return ctx;
};
