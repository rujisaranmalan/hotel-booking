import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import FinalizeBooking from "./FinalizeBooking";

export default async function PaymentDone(
  props: { searchParams: Promise<Record<string, string | undefined>> }
) {
  const sp = await props.searchParams;
  const method = sp.method ?? "Payment";
  const total  = Number(sp.total ?? 0);

  return (
    <div className="min-h-[60vh] grid place-items-center text-center px-4">
      {/* This client component will store the booking in localStorage */}
      <FinalizeBooking sp={sp} />

      <div className="space-y-5 max-w-xl">
        <div className="mx-auto size-24 rounded-full bg-white/10 ring-2 ring-white/40 grid place-items-center success-pop">
          <CheckCircle2 className="text-emerald-400" size={70} strokeWidth={2.5} />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold heading">
          Booking Successfully completed
        </h1>
        <p className="text-white/75">
          {method} confirmed for <b>฿{total.toLocaleString()}</b>. Check your Trips page.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="btn-primary">Home</Link>
          <Link href="/trips" className="btn-ghost">View Trips</Link>
        </div>
      </div>
    </div>
  );
}
