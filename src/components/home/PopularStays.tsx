"use client";

import { HOTELS } from "@/lib/mockData";
import Money from "@/components/Money";
import Link from "next/link";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import { t } from "@/lib/i18n";

export default function PopularStays() {
  const { language } = usePreferences();
  const top = [...HOTELS]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const minRate = (id: string) => {
    const h = HOTELS.find((x) => x.id === id)!;
    return Math.min(...h.roomTypes.map((r) => r.baseRatePerNight));
  };

  return (
    <section className="space-y-2">
      <h2 className="text-xl font-bold">{t("highRatedUnique", language)}</h2>
      <p className="text-white/80 text-sm">{t("handpickedIntro", language)}</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {top.map((h) => (
          <div key={h.id} className="rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur">
            <img src={h.thumbnail} alt={h.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <div className="font-semibold">{h.name}</div>
              <div className="text-white/80 text-xs">{h.location}</div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-white/80 text-sm">⭐ {h.rating.toFixed(1)}</span>
                <span className="text-white font-semibold text-sm">
                  <Money amountTHB={minRate(h.id)} /> <span className="text-white/70 text-xs">/ night</span>
                </span>
              </div>
              <Link href={`/hotel/${h.id}`} className="mt-2 inline-block rounded-xl bg-white text-indigo-900 text-sm px-3 py-1">
                {t("viewDetails", language)}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
