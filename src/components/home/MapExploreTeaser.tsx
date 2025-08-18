"use client";

import dynamic from "next/dynamic";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import { t } from "@/lib/i18n";

const Map = dynamic(() => import("./LeafletMap"), { ssr: false });

export default function MapExploreTeaser() {
  const { language } = usePreferences();
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{t("mapExplore", language)}</h2>
        <span className="text-white/70 text-sm">{t("mapHint", language)}</span>
      </div>
      <div className="rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur">
        <Map />
      </div>
    </section>
  );
}
