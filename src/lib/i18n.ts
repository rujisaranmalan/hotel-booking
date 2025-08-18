// src/lib/i18n.ts
import type { Language } from "@/components/providers/PreferencesProvider";

const dict = {
  en: {
    exploreTitle: "What Are You Looking For?",
    tabHotel: "Hotel",
    tabFlight: "Flight",
    tabCar: "Car",
    placeholderLocation: "Bangkok",
    search: "Search",
    searching: "Searching…",
    comingSoon: "Coming soon",
    comingSoonBody: (which: string) =>
      `${which} search isn’t wired yet. Switch to Hotel to try the full flow.`,
    recentSearches: "Recent Searches",
    bestPlaces: "Best places to enjoy your stay",
    loading: "Loading…",
    noResults: "No results yet. Try searching a city.",
    sortByName: "Sort by: Name",
    sortByRating: "Sort by: Rating",
    sortByPrice: "Sort by: Price",
    filter: "Filter",
    close: "Close",
    viewDetails: "View Details",
    from: "From",
    recommended: "Recommended",
    trendingNow: "Trending destinations",
    trendingIntro: "Hand-picked places the community is loving across Thailand",
    highRatedUnique: "Stay at high-rated unique properties",
    handpickedIntro: "Curated gems with character and great reviews.",
    mapExplore: "Explore on the map",
    mapHint: "Zoom to find more stays",
  },
  th: {
    exploreTitle: "กำลังมองหาอะไรอยู่?",
    tabHotel: "โรงแรม",
    tabFlight: "ตั๋วเครื่องบิน",
    tabCar: "รถเช่า",
    placeholderLocation: "กรุงเทพฯ",
    search: "ค้นหา",
    searching: "กำลังค้นหา…",
    comingSoon: "เร็ว ๆ นี้",
    comingSoonBody: (which: string) =>
      `ยังไม่ได้เชื่อมต่อการค้นหา${which} โปรดสลับไปที่ "โรงแรม" เพื่อทดลองใช้งาน`,
    recentSearches: "การค้นหาล่าสุด",
    bestPlaces: "ที่พักที่น่าสนใจสำหรับคุณ",
    loading: "กำลังโหลด…",
    noResults: "ยังไม่มีผลลัพธ์ ลองค้นหาชื่อเมือง",
    sortByName: "เรียงตาม: ชื่อ",
    sortByRating: "เรียงตาม: คะแนน",
    sortByPrice: "เรียงตาม: ราคา",
    filter: "ตัวกรอง",
    close: "ปิด",
    viewDetails: "ดูรายละเอียด",
    from: "เริ่มต้นที่",
    recommended: "แนะนำ",
    trendingNow: "จุดหมายที่กำลังมาแรง",
    trendingIntro: "ตัวเลือกยอดนิยมที่ผู้คนกำลังชื่นชอบทั่วไทย",
    highRatedUnique: "เข้าพักในที่พักที่ได้คะแนนสูงซึ่งมีเอกลักษณ์เฉพาะตัว",
    handpickedIntro: "คัดสรรพิเศษ เน้นบรรยากาศและรีวิวเยี่ยม",
    mapExplore: "สำรวจบนแผนที่",
    mapHint: "ซูมเพื่อดูที่พักเพิ่มเติม",
  },
} as const;

export function t<K extends keyof typeof dict["en"]>(
  key: K,
  lang: Language,
  ...args: any[]
): string {
  const entry = (dict as any)[lang]?.[key] ?? (dict as any).en[key];
  return typeof entry === "function" ? entry(...args) : entry;
}
