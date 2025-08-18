"use client";
import { CreditCard, Landmark, Wallet, Smartphone, Banknote } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const METHODS = [
  { id: "debit", label: "Debit Card", icon: CreditCard },
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "phonepay", label: "PhonePay", icon: Wallet },
  { id: "netbank", label: "Net Banking", icon: Landmark },
  { id: "credit", label: "Credit Card", icon: Banknote },
];

export default function PaymentForm() {
  const sp = useSearchParams();
  const router = useRouter();
  const [method, setMethod] = useState(METHODS[0].id);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const payload = Object.fromEntries(sp.entries());
    (payload as any).paymentMethod = method;

    const res = await fetch("/api/payments/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    setLoading(false);
    if (json.status === "success") router.push("/payment/done");
  }

  return (
    <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        {METHODS.map((m) => {
          const Icon = m.icon;
          const selected = method === m.id;
          return (
            <button
              type="button"
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left
              ${selected ? "border-primary ring-2 ring-primary/20 bg-primary/5" : "bg-white hover:bg-gray-50"}`}
            >
              <Icon size={18} className="text-primary" />
              <span className="font-medium">{m.label}</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border p-4 space-y-3">
        <div className="text-sm text-gray-600">
          {method === "upi" ? "UPI payment" : "Enter payment details"} (demo)
        </div>
        {/* In real app: fields based on method. We'll keep demo simple. */}
        <button
          disabled={loading}
          className="w-full rounded-xl bg-primary text-white py-2 font-medium"
        >
          {loading ? "Processing…" : "Pay Now"}
        </button>
      </div>
    </form>
  );
}
