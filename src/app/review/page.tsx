import GuestForm from "@/components/GuestForm";
import { PricingResult, RoomType } from "@/lib/types";
import { computePricing } from "@/lib/pricing";        // or "@/lib/mockData" if that's where it lives
import { HOTELS } from "@/lib/mockData";
import { notFound } from "next/navigation";
import Money from "@/components/Money";

function daysBetween(a: string, b: string) {
  const start = new Date(a).getTime();
  const end = new Date(b).getTime();
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
}

export default async function ReviewPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // ✅ await the async searchParams
  const sp = await searchParams;

  const hotelId = (sp.hotelId as string) ?? "";
  const roomType = ((sp.roomType as string) ?? "standard") as RoomType;
  const checkIn = (sp.checkIn as string) ?? "";
  const checkOut = (sp.checkOut as string) ?? "";
  const guests = (sp.guests as string) ?? "2";

  const hotel = HOTELS.find((h) => h.id === hotelId);
  if (!hotel) return notFound();

  const nights =
    checkIn && checkOut ? Math.max(0, daysBetween(checkIn, checkOut)) : 0;

  const pricing: PricingResult | null =
    nights > 0 ? computePricing({ roomType, days: nights }) : null;

  const roomTypeLabel =
    hotel.roomTypes.find((rt) => rt.code === roomType)?.label ?? roomType;

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-6">
        {/* LEFT: Review facts */}
        <div className="panel p-5 md:p-6">
          <h3>Review your booking</h3>
          <div className="kv mt-3">
            <div className="k">Hotel</div>     <div className="v">{hotel.name}</div>
            <div className="k">Room</div>      <div className="v">{roomTypeLabel}</div>
            <div className="k">Check-in</div>  <div className="v">{checkIn || "-"}</div>
            <div className="k">Check-out</div> <div className="v">{checkOut || "-"}</div>
            <div className="k">Guests</div>    <div className="v">{guests}</div>
            <div className="k">Nights</div>    <div className="v">{nights}</div>
          </div>
        </div>

        {/* RIGHT: Price summary */}
        <div className="space-y-4">
          <div className="panel p-5 md:p-6 price-box">
            <h3>Price summary</h3>
            <div className="line">
              <span>Base fare</span>
              <span>
                ฿{(pricing?.subtotal ?? 0).toLocaleString()}
              </span>
            </div>
            <div className="line">
              <span>Total discount</span>
              <span>฿0.00</span>
            </div>
            <div className="line">
              <span>Taxes & service fees (VAT 7%)</span>
              <span>฿{(pricing?.vat ?? 0).toLocaleString()}</span>
            </div>
            <hr className="my-3 border-white/20" />
            <div className="line total">
              <span>Total Amount</span>
              <span>฿{(pricing?.total ?? 0).toLocaleString()}</span>
            </div>
          </div>

          <div className="panel p-5 md:p-6">
            <h3>Cancellation Charges</h3>
            <p className="text-white/85 text-sm leading-relaxed">
              Non refundable. Penalty may be charged by the airline &amp; by MMT
              based on how close to departure date you cancel. View fare rules to know more.
            </p>
          </div>
        </div>
      </div>
      <div className="line"><span>Base fare</span><span><Money amountTHB={pricing?.subtotal ?? 0} /></span></div>
      <div className="line"><span>Taxes & service fees (VAT 7%)</span><span><Money amountTHB={pricing?.vat ?? 0} /></span></div>
      <div className="line total"><span>Total Amount</span><span><Money amountTHB={pricing?.total ?? 0} /></span></div>

      {/* Guest form */}
      <div className="panel p-5 md:p-6">
        <h3>Guest Details</h3>
        {pricing ? (
          <GuestForm
            pricing={{
              subtotal: pricing.subtotal,
              vat: pricing.vat,
              total: pricing.total,
            }}
          />
        ) : (
          <p className="text-white/80 text-sm mt-2">
            Please select valid check-in and check-out dates to continue.
          </p>
        )}
      </div>
    </div>

    
  );
}
