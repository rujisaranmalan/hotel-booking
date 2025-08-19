"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Order = {
  hotelId: string;
  hotelName?: string;
  location?: string;
  thumbnail?: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
};

type Props = { total: number; order: Order };

const METHODS = ["Debit Card", "UPI", "PhonePay", "Net Banking", "Credit Card"];

export default function PaymentForm({ total, order }: Props) {
  const router = useRouter();
  const [method, setMethod] = useState<string>(METHODS[0]);
  const [note, setNote] = useState("");

  const payNow = () => {
    const q = new URLSearchParams({
      method,
      total: String(total),
      ...Object.fromEntries(
        Object.entries(order).map(([k, v]) => [k, String(v ?? "")])
      ),
    }).toString();

    router.push(`/payment/done?${q}`);
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* left: method list */}
      <div className="space-y-3">
        {METHODS.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMethod(m)}
            className={`w-full flex items-center justify-start rounded-xl border px-4 py-3 ${
              method === m ? "ring-2 ring-indigo-500" : ""
            }`}
          >
            <span className="ml-1">{m}</span>
          </button>
        ))}
      </div>

      {/* right: note + pay */}
      <div className="rounded-xl border p-4">
        <textarea
          className="field w-full h-64"
          placeholder="Enter payment details (demo)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm">Amount due</div>
          <div className="text-lg font-semibold">฿{total.toLocaleString()}</div>
        </div>
        <button
          type="button"
          onClick={payNow}
          className="btn-primary w-full mt-3"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
