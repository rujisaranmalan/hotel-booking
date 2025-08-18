export const metadata = { title: "Trips | Travela" };

export default function TripsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Trips</h1>

      <div className="glass-card p-6">
        <p className="text-white/80">
          You don’t have any trips yet. Book a hotel from <b>Explore</b> to see it here.
        </p>
      </div>
    </div>
  );
}
