import { HOTELS } from "@/lib/mockData";
import BookNowForm from "@/components/BookNowForm";
import { Star } from "lucide-react";

export default async function HotelDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotel = HOTELS.find(h => h.id === id);
  if (!hotel) return <div className="p-6">Hotel not found.</div>;

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-6">
        <div className="glass-card overflow-hidden">
          <img src={hotel.thumbnail} className="w-full h-[360px] object-cover" />
          <div className="p-5">
            <h1 className="text-2xl font-bold heading">{hotel.name}</h1>
            <p className="subtle">{hotel.location}</p>
          </div>
        </div>

        <div className="glass-card p-5 space-y-4 h-fit">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-white">
              <Star className="fill-white text-white" size={16} />
              <span className="font-semibold">{hotel.rating.toFixed(1)}</span>
            </div>
            <span className="text-sm subtle">Excellent • 6,879 reviews</span>
          </div>
          <div className="text-sm subtle">Housekeeping ★★★★★ • Food ★★★★☆ • Service ★★★★★ • Staff ★★★★★</div>
          <div className="text-xs subtle">This property is in high demand today.</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="font-semibold heading">Available Rooms</div>
          <div className="flex flex-wrap gap-2">
            {hotel.roomTypes.map(rt => (
              <span key={rt.code} className="chip">{rt.label} • {rt.baseRatePerNight.toLocaleString()} THB / night</span>
            ))}
          </div>
        </div>
        <div><BookNowForm hotel={hotel} /></div>
      </div>
    </div>
  );
}
