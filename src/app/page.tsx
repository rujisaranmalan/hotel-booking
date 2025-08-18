import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">Welcome to Travela</h1>
      <p className="text-white/80 max-w-prose">
        Find great stays at great prices. Ready to browse?
      </p>
      <Link href="/explore" className="btn-primary inline-block">Start Exploring</Link>
    </div>
  );
}
