import PaymentForm from "@/components/PaymentForm";

export default function PaymentPage({ searchParams }: { searchParams: any }) {
  return (
    <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-6">
      <div className="rounded-2xl border bg-white shadow-card p-5">
        <div className="text-lg font-semibold mb-4">Payment Details</div>
        <PaymentForm />
      </div>

      <aside className="rounded-2xl border bg-white shadow-card p-5 h-fit">
        <div className="text-lg font-semibold mb-2">Order Summary</div>
        <div className="grid grid-cols-2 gap-y-1 text-sm">
          <span>Hotel</span><b>{searchParams.hotelId}</b>
          <span>Room</span><b>{searchParams.roomType}</b>
          <span>Dates</span><b>{searchParams.checkIn} → {searchParams.checkOut}</b>
          <span>Guests</span><b>{searchParams.guests}</b>
          <span>Base fare</span><b>฿{Number(searchParams.subtotal || 0).toFixed(2)}</b>
          <span>VAT</span><b>฿{Number(searchParams.vat || 0).toFixed(2)}</b>
        </div>
        <div className="border-t my-2" />
        <div className="flex justify-between text-primary text-base font-semibold">
          <span>Total Amount</span><b>฿{Number(searchParams.total || 0).toFixed(2)}</b>
        </div>
      </aside>
    </div>
  );
}
