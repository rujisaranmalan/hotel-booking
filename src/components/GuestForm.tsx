"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

const GuestSchema = z.object({
  fullName: z.string().min(1, "Required"),
  email: z.string().email(),
  phone: z.string().min(1, "Required"),
  agree: z.literal(true, { errorMap: () => ({ message: "You must agree" }) })
});
type GuestFormData = z.infer<typeof GuestSchema>;

export default function GuestForm({ pricing }: { pricing: { subtotal:number; vat:number; total:number } }) {
  const router = useRouter();
  const sp = useSearchParams();

  const { register, handleSubmit, formState: { errors } } = useForm<GuestFormData>({
    resolver: zodResolver(GuestSchema)
  });

  function onSubmit(data: GuestFormData) {
    const params = new URLSearchParams(sp.toString());
    params.set("subtotal", String(pricing.subtotal));
    params.set("vat", String(pricing.vat));
    params.set("total", String(pricing.total));
    params.set("fullName", data.fullName);
    params.set("email", data.email);
    params.set("phone", data.phone);
    router.push(`/payment?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-4 border rounded-2xl">
      <div>
        <label className="block text-sm mb-1">Full name</label>
        <input className="w-full border rounded-xl px-3 py-2" {...register("fullName")} />
        {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName.message}</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input className="w-full border rounded-xl px-3 py-2" {...register("email")} />
        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">Phone</label>
        <input className="w-full border rounded-xl px-3 py-2" {...register("phone")} />
        {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register("agree")} /> I agree to the terms
      </label>
      {errors.agree && <p className="text-red-600 text-sm">{errors.agree.message}</p>}

      <button className="w-full py-2 rounded-xl bg-black text-white">Continue to payment</button>
    </form>
  );
}
