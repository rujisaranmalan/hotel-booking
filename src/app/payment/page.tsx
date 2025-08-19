import PaymentForm from "@/components/PaymentForm";

export default function PaymentPage({ searchParams }: { searchParams: any }) {
  const subtotal = Number(searchParams.subtotal || 0);
  const vat      = Number(searchParams.vat || 0);
  const total    = Number(searchParams.total || 0);

  return (
    <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-6">
      <section className="panel-light p-6 space-y-4">
        <h1 className="text-xl font-bold">Payment Details</h1>
        {/* ⬇️ pass total to the form */}
        <PaymentForm total={total} />
      </section>

      <aside className="panel-light p-6 h-fit">
        <div className="text-lg font-semibold mb-2">Order Summary</div>
        <div className="grid grid-cols-2 gap-y-1 text-sm">
          <span>Hotel</span><b>{searchParams.hotelId}</b>
          <span>Room</span><b>{searchParams.roomType}</b>
          <span>Dates</span><b>{searchParams.checkIn} → {searchParams.checkOut}</b>
          <span>Guests</span><b>{searchParams.guests}</b>
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
