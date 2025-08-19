"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
// (Optional) icons you’re already using on the left list

type Props = {
  total: number;
};

const METHODS = ["Debit Card", "UPI", "PhonePay", "Net Banking", "Credit Card"];

export default function PaymentForm({ total }: Props) {
  const router = useRouter();
  const [method, setMethod] = useState<string>("Debit Card"); // default selected
  const [note, setNote] = useState("");

  const payNow = () => {
    if (!method) return;
    router.push(`/payment/done?method=${encodeURIComponent(method)}&total=${total}`);
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* LEFT: methods (your existing buttons) */}
      <div className="space-y-3">
        {METHODS.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMethod(m)}
            className={`w-full flex items-center justify-start rounded-xl border px-4 py-3
              ${method === m ? "ring-2 ring-indigo-500" : ""}`}
            aria-pressed={method === m}
          >
            {/* your icon can go here */}
            <span className="ml-1">{m}</span>
          </button>
        ))}
      </div>

      {/* RIGHT: details + Pay Now */}
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
          disabled={!method}
          className="btn-primary w-full mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
