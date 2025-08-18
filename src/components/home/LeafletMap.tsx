"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { MAP_POINTS } from "@/lib/homeMocks";
import Money from "@/components/Money";

export default function LeafletMap() {
  // Bangkok as center
  const center: [number, number] = [13.7563, 100.5018];

  return (
    <MapContainer center={center} zoom={6} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
        {MAP_POINTS.map((p) => (
          <CircleMarker
            key={p.id}
            center={[p.lat, p.lng]}
            radius={14}
            pathOptions={{ color: "#fff", weight: 2, fillColor: "#1e3a8a", fillOpacity: 0.9 }}
          >
            <Popup>
              <div className="space-y-1">
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm">⭐ {p.rating.toFixed(1)}</div>
                <div className="text-indigo-700 font-semibold bg-indigo-100 inline-block px-2 rounded">
                  <Money amountTHB={p.priceTHB} />
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
