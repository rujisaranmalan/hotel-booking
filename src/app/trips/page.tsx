"use client";

import { useBookings } from "@/components/providers/BookingsProvider";
import Money from "@/components/Money";

function nights(a: string, b: string) {
  const A = new Date(a).getTime();
  const B = new Date(b).getTime();
  return Math.max(0, Math.ceil((B - A) / (1000*60*60*24)));
}

export default function TripsPage() {
  const { bookings, removeBooking } = useBookings();
  const today = new Date().toISOString().slice(0,10);

  const upcoming = bookings
    .filter(b => b.checkOut >= today)
    .sort((a,b) => a.checkIn.localeCompare(b.checkIn));

  const past = bookings
    .filter(b => b.checkOut < today)
    .sort((a,b) => b.checkIn.localeCompare(a.checkIn));

  const Section = ({title, items}:{title:string; items: typeof bookings}) => (
    <section className="space-y-3">
      <h2 className="text-lg font-bold heading">{title}</h2>
      {items.length === 0 ? (
        <div className="glass-card p-4 text-white/80">No trips here yet.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(b => (
            <div key={b.id} className="glass-card overflow-hidden">
              {b.thumbnail && <img src={b.thumbnail} alt="" className="w-full h-32 object-cover" />}
              <div className="p-4 space-y-1">
                <div className="font-semibold">{b.hotelName}</div>
                <div className="text-white/80 text-sm">{b.location}</div>
                <div className="text-white/80 text-sm">
                  {b.checkIn} → {b.checkOut} • {nights(b.checkIn,b.checkOut)} night(s) • {b.guests} guest(s)
                </div>
                <div className="text-sm">Room: <b>{b.roomType}</b></div>
                <div className="text-sm">Paid: <b><Money amountTHB={b.totalTHB} /></b> via {b.method}</div>
                <div className="pt-2 flex gap-2">
                  <button className="btn-ghost text-xs" onClick={()=>removeBooking(b.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="space-y-8">
      <Section title="Upcoming Trips" items={upcoming}/>
      <Section title="Past Trips" items={past}/>
    </div>
  );
}
