"use client";

import { DESTINATIONS } from "@/lib/homeMocks";
import Link from "next/link";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import { t } from "@/lib/i18n";

export default function TrendingDestinations() {
  const { language } = usePreferences();

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold">{t("trendingNow", language)}</h2>
      <p className="text-white/80 text-sm">{t("trendingIntro", language)}</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DESTINATIONS.map((d) => (
          <Link
            key={d.id}
            href={`/explore?location=${encodeURIComponent(d.city)}`}
            className="relative rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur group"
          >
            <img src={d.image} alt={d.city} className="h-40 w-full object-cover group-hover:scale-[1.02] transition" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            <div className="absolute top-3 left-3 flex items-center gap-2 text-white font-semibold">
              <span className="rounded-lg bg-black/40 px-2 py-1 backdrop-blur">{d.city}</span>
              <img src={d.flag} alt="" className="w-6 h-4 rounded-sm shadow" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
