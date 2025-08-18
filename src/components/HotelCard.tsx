"use client";
import { Hotel } from "@/lib/types";
import Link from "next/link";

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <div className="glass-card overflow-hidden">
      <img src={hotel.thumbnail} alt={hotel.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold">{hotel.name}</h3>
        <p className="subtle text-sm">{hotel.location}</p>
        <Link className="btn-primary mt-3 inline-block text-sm" href={`/hotel/${hotel.id}`}>
          Explore hotel
        </Link>
      </div>
    </div>
  );
}
