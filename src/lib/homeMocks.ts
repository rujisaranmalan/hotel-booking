// src/lib/homeMock.ts
export type Destination = {
  id: string;
  city: string;
  region?: string;
  flag: string;
  image: string;
};

export const DESTINATIONS: Destination[] = [
  {
    id: "bangkok",
    city: "กรุงเทพมหานคร",
    region: "Thailand",
    flag: "https://flagcdn.com/w40/th.png",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "chiangmai",
    city: "เชียงใหม่",
    region: "Thailand",
    flag: "https://flagcdn.com/w40/th.png",
    image:
      "https://images.unsplash.com/photo-1578157695179-d7b7ddeb2f53?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "tokyo",
    city: "โตเกียว",
    region: "Japan",
    flag: "https://flagcdn.com/w40/jp.png",
    image:
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "pattaya",
    city: "พัทยากลาง",
    region: "Thailand",
    flag: "https://flagcdn.com/w40/th.png",
    image: "https://picsum.photos/seed/pattaya-city/1600/900",
  },
  {
    id: "hua-hin",
    city: "หัวหิน",
    region: "Thailand",
    flag: "https://flagcdn.com/w40/th.png",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "hatyai",
    city: "หาดจอมเทียน",
    region: "Thailand",
    flag: "https://flagcdn.com/w40/th.png",
    image:
      "https://images.unsplash.com/photo-1716478791561-d8fada58a879?q=80&w=1229&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const MAP_POINTS: Array<{
  id: string;
  name: string;
  lat: number;
  lng: number;
  priceTHB: number;
  rating: number;
}> = [
  { id: "h1", name: "JW Marriott Bangkok", lat: 13.744, lng: 100.549, priceTHB: 3200, rating: 4.7 },
  { id: "h2", name: "The Slate, Phuket",   lat: 8.112,  lng: 98.306,  priceTHB: 2800, rating: 4.6 },
  { id: "h3", name: "Chiang Mai Retreat",  lat: 18.787, lng: 98.993,  priceTHB: 1900, rating: 4.4 },
  { id: "h4", name: "Pattaya Beachfront",  lat: 12.925, lng: 100.884, priceTHB: 2100, rating: 4.3 },
  { id: "h5", name: "Hua Hin Colonial",    lat: 12.568, lng: 99.957,  priceTHB: 1600, rating: 4.1 },
  { id: "h6", name: "Krabi Cliff Villas",  lat: 8.063,  lng: 98.916,  priceTHB: 2300, rating: 4.5 },
];
