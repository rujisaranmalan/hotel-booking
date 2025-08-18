import TrendingDestinations from "@/components/home/TrendingDestinations";
import PopularStays from "@/components/home/PopularStays";
import MapExploreTeaser from "@/components/home/MapExploreTeaser";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <TrendingDestinations />
      <PopularStays />
      <MapExploreTeaser />
    </div>
  );
}
