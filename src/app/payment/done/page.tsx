import Link from "next/link";

export default function DonePage() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-40 h-40 rounded-full bg-primary/10 grid place-items-center mb-6">
        {/* Simple “astronaut” stand-in */}
        <div className="w-20 h-20 rounded-full border-4 border-primary relative">
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 w-12 h-12 rounded-full bg-primary/20" />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-center">Booking Successfully completed</h1>
      <p className="text-gray-600 text-center mt-2">
        Your trip schedule is ready. Please check under profile.
      </p>
      <Link href="/" className="mt-6 rounded-xl bg-primary text-white px-5 py-2">Home</Link>
    </div>
  );
}
