import PaymentForm from "@/components/PaymentForm";

type PaymentSearchParams = {
  hotelId?: string;
  hotelName?: string;
  location?: string;
  thumbnail?: string;
  roomType?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  subtotal?: string;
  vat?: string;
  total?: string;
};

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<PaymentSearchParams>;
}) {
  const sp = await searchParams;

  const subtotal = Number(sp.subtotal ?? 0);
  const vat = Number(sp.vat ?? 0);
  const total = Number(sp.total ?? 0);

  return (
    <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-6">
      <section className="panel-light p-6 space-y-4">
        <h1 className="text-xl font-bold">Payment Details</h1>
        <PaymentForm
          total={total}
          order={{
            hotelId: sp.hotelId ?? "",
            hotelName: sp.hotelName ?? "",
            location: sp.location ?? "",
            thumbnail: sp.thumbnail ?? "",
            roomType: sp.roomType ?? "standard",
            checkIn: sp.checkIn ?? "",
            checkOut: sp.checkOut ?? "",
            guests: Number(sp.guests ?? 1),
          }}
        />
      </section>

      <aside className="panel-light p-6 h-fit space-y-2">
        <div className="text-lg font-semibold">Order Summary</div>
        <div className="grid grid-cols-2 gap-y-1 text-sm">
          <span>Hotel</span><b>{sp.hotelId}</b>
          <span>Room</span><b>{sp.roomType}</b>
          <span>Dates</span><b>{sp.checkIn} → {sp.checkOut}</b>
          <span>Guests</span><b>{sp.guests}</b>
          <span>Base fare</span><b>฿{subtotal.toFixed(2)}</b>
          <span>VAT</span><b>฿{vat.toFixed(2)}</b>
        </div>
        <div className="border-t my-2" />
        <div className="flex justify-between text-base font-semibold">
          <span>Total Amount</span><b>฿{total.toFixed(2)}</b>
        </div>
      </aside>
    </div>
  );
}
