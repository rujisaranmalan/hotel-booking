"use client";

import DatePicker, { registerLocale } from "react-datepicker";
import { enGB, th } from "date-fns/locale";
import { addDays } from "date-fns";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Hotel } from "@/lib/types";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import Money from "@/components/Money";
import { t } from "@/lib/i18n";
import type { LucideIcon } from "lucide-react";

import {
  Calendar,
  MapPin,
  Users,
  SlidersHorizontal,
  Plane,
  Car,
  Hotel as HotelIcon,
} from "lucide-react";

type SortKey = "name" | "price" | "rating";
type Tab = "hotel" | "flight" | "car";

registerLocale("en", enGB);
registerLocale("th", th);

export default function SearchHotels() {
  const [tab, setTab] = useState<Tab>("hotel");
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);

  const [results, setResults] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("name");
  const [filterOpen, setFilterOpen] = useState(false);

  // ✅ one hook call; get both language + currency
  const { language } = usePreferences();

  const dpLocale = language === "th" ? "th" : "en";

  async function onSearch(e: React.FormEvent) {
    e.preventDefault();
    if (tab !== "hotel") return; // only hotel search is implemented
    setLoading(true);
    setResults([]);
    const res = await fetch(
      `/api/hotels?location=${encodeURIComponent(location)}`
    );
    const json = await res.json();
    setResults(json.hotels ?? []);
    setLoading(false);
  }

  const sorted = useMemo(() => {
    const copy = [...results];
    switch (sortBy) {
      case "name":
        copy.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        copy.sort((a, b) => b.rating - a.rating);
        break;
      case "price": {
        const minRate = (h: Hotel) =>
          Math.min(...h.roomTypes.map((r) => r.baseRatePerNight));
        copy.sort((a, b) => minRate(a) - minRate(b));
        break;
      }
    }
    return copy;
  }, [results, sortBy]);

  const tabBtn = (tLabel: string, tKey: Tab, Icon: LucideIcon) => (
    <button
      type="button"
      onClick={() => setTab(tKey)}
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 border transition
        ${
          tab === tKey
            ? "bg-white/25 border-white/40 text-white"
            : "bg-white/10 border-white/20 text-white/70 hover:bg-white/15"
        }`}
      aria-pressed={tab === tKey}
    >
      <Icon size={16} /> {tLabel}
    </button>
  );

  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      {/* LEFT: Search / Tabs */}
      <div className="space-y-5">
        <div>
          <h1 className="text-3xl font-extrabold drop-shadow">
            {t("exploreTitle", language)}
          </h1>
          <div className="mt-3 flex items-center gap-2 text-sm">
            {tabBtn(t("tabHotel", language), "hotel", HotelIcon)}
            {tabBtn(t("tabFlight", language), "flight", Plane)}
            {tabBtn(t("tabCar", language), "car", Car)}
          </div>
        </div>

        {/* HOTEL FORM (only when tab=hotel) */}
        {tab === "hotel" ? (
          <form onSubmit={onSearch} className="space-y-3">
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-2 backdrop-blur">
              <MapPin className="text-white/90" size={18} />
              <input
                className="w-full bg-transparent text-white placeholder-white/70 outline-none"
                placeholder={t("placeholderLocation", language)}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
  {/* CHECK-IN */}
  <div className="space-y-1">
    <label className="text-xs font-medium text-white/80">Check-in</label>
    <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-2 backdrop-blur">
      <Calendar className="text-white/90" size={18} />
      <DatePicker
        selected={checkIn}
        onChange={(d) => {
          setCheckIn(d);
          if (d) {
            const minOut = addDays(d, 1);
            if (!checkOut || checkOut <= d) setCheckOut(minOut); // keep out > in
          }
        }}
        minDate={new Date()}
        selectsStart
        startDate={checkIn}
        endDate={checkOut}
        locale={dpLocale}
        dateFormat="dd/MM/yyyy"
        placeholderText="dd/mm/yyyy"
        className="w-full bg-transparent text-white outline-none"
        calendarClassName="dp-theme"
        popperClassName="dp-popper"
        portalId="dp-portal"
        popperProps={{ strategy: "fixed" }}
      />
    </div>
  </div>

  {/* CHECK-OUT */}
  <div className="space-y-1">
    <label className="text-xs font-medium text-white/80">Check-out</label>
    <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-2 backdrop-blur">
      <Calendar className="text-white/90" size={18} />
      <DatePicker
        selected={checkOut}
        onChange={(d) => {
          if (checkIn && d && d <= checkIn) {
            setCheckOut(addDays(checkIn, 1)); // force +1 day
          } else {
            setCheckOut(d);
          }
        }}
        minDate={checkIn ? addDays(checkIn, 1) : addDays(new Date(), 1)}
        selectsEnd
        startDate={checkIn}
        endDate={checkOut}
        locale={dpLocale}
        dateFormat="dd/MM/yyyy"
        placeholderText="dd/mm/yyyy"
        className="w-full bg-transparent text-white outline-none"
        calendarClassName="dp-theme"
        popperClassName="dp-popper"
        portalId="dp-portal"
        popperProps={{ strategy: "fixed" }}
      />
    </div>
  </div>
</div>

            <button className="rounded-xl bg-white text-indigo-900 font-semibold px-5 py-2 hover:bg-white/90">
              {loading ? t("searching", language) : t("search", language)}
            </button>
          </form>
        ) : (
          /* FLIGHT / CAR placeholder */
          <div className="bg-white/10 border border-white/20 rounded-2xl p-5 backdrop-blur">
            <p className="text-white/90 font-medium">{t("comingSoon", language)}</p>
            <p className="text-white/70 text-sm mt-1">
              {t(
                "comingSoonBody",
                language,
                tab === "flight" ? t("tabFlight", language) : t("tabCar", language)
              )}
            </p>
          </div>
        )}

        {/* Recent searches */}
        <div className="space-y-3">
          <h3 className="font-semibold">{t("recentSearches", language)}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {["Bangkok", "Phuket"].map((city, i) => (
              <div
                key={i}
                className="bg-white/10 border border-white/20 rounded-2xl overflow-hidden backdrop-blur flex items-center"
              >
                <img
                  src={`https://picsum.photos/seed/${city}/220/120`}
                  className="w-40 h-24 object-cover"
                  alt={city}
                />
                <div className="p-3 flex-1">
                  <div className="text-sm font-semibold leading-tight">
                    Hotel JW Marriott
                  </div>
                  <div className="text-xs text-white/80">
                    {city} • 4.5 ★ • 1,000/night
                  </div>
                </div>
                <div className="bg-white text-indigo-900 text-xs px-3 py-2 rounded-l-xl">
                  Book Now
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-white/10 border border-white/20 backdrop-blur">
        <img
          alt="Hero"
          src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1640&auto=format&fit=crop"
          className="w-full h-[360px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/25 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <div className="text-2xl font-semibold">Incredible India</div>
          <p className="text-white/90 text-sm max-w-prose">
            “For where thy treasure is, here also will thy heart be.”
          </p>
          <button className="rounded-xl bg-white text-indigo-900 font-semibold px-4 py-2 hover:bg-white/90">
            Take Tour
          </button>
        </div>
      </div>

      {/* RESULTS + RIGHT RAIL */}
      <div className="lg:col-span-2 grid lg:grid-cols-[1fr_320px] gap-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">{t("bestPlaces", language)}</h2>
            <div className="flex gap-2">
              <select
                className="bg-white/10 border border-white/20 rounded-xl px-3 py-1 text-sm backdrop-blur"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
              >
                <option className="text-neutral-900" value="name">
                  {t("sortByName", language)}
                </option>
                <option className="text-neutral-900" value="rating">
                  {t("sortByRating", language)}
                </option>
                <option className="text-neutral-900" value="price">
                  {t("sortByPrice", language)}
                </option>
              </select>
              <button
                type="button"
                onClick={() => setFilterOpen(true)}
                className="bg-white/10 border border-white/20 rounded-xl px-3 py-1 text-sm backdrop-blur"
              >
                <SlidersHorizontal className="inline-block mr-1" size={16} />{" "}
                {t("filter", language)}
              </button>
            </div>
          </div>

          {loading && <p className="text-white/80">{t("loading", language)}</p>}
          {!loading && sorted.length === 0 && (
            <p className="text-white/70">{t("noResults", language)}</p>
          )}

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {sorted.map((h) => {
              const minRateTHB = Math.min(
                ...h.roomTypes.map((r) => r.baseRatePerNight)
              ); // ✅ define per card
              return (
                <div
                  key={h.id}
                  className="bg-white/10 border border-white/20 rounded-2xl overflow-hidden backdrop-blur"
                >
                  <img
                    src={h.thumbnail}
                    alt={h.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <div className="font-semibold">{h.name}</div>
                    <span className="text-white/80 text-sm">
                      ⭐ {h.rating.toFixed(1)} • {t("from", language)}{" "}
                      <Money amountTHB={minRateTHB} />
                    </span>
                    <div className="pt-2">
                      <Link
                        href={`/hotel/${h.id}`}
                        className="rounded-xl bg-white text-indigo-900 text-sm px-3 py-1 inline-block"
                      >
                        {t("viewDetails", language)}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-6 space-y-3">
            <div className="font-semibold">{t("recommended", language)}</div>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white/10 border border-white/20 rounded-2xl backdrop-blur flex gap-3 p-2"
              >
                <img
                  src={`https://picsum.photos/seed/r${i}/90/70`}
                  className="w-24 h-16 object-cover rounded-lg"
                  alt=""
                />
                <div className="text-xs">
                  <div className="font-medium">Trip to Thailand &amp;</div>
                  <div className="text-white/80">
                    Get 30% off on hotel booking
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {filterOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setFilterOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[360px] bg-white/10 border border-white/20 rounded-l-2xl backdrop-blur p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{t("filter", language)}</h3>
              <button
                className="bg-white/10 border border-white/20 rounded-xl px-3 py-1"
                onClick={() => setFilterOpen(false)}
              >
                {t("close", language)}
              </button>
            </div>
            <div className="mt-4 space-y-4 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" /> Free cancellation
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" /> Breakfast included
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" /> Pool
              </label>
              <p className="text-white/70">
                Demo only; adjust filters to your dataset.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
