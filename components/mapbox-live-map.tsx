"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import type { Incident } from "@/lib/api";

type MapboxLiveMapProps = {
  incidents?: Incident[];
  center?: { lat: number; lng: number };
  nightMode?: boolean;
};

export function MapboxLiveMap({ incidents = [], center, nightMode = false }: MapboxLiveMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token || token.includes("replace") || !ref.current) return;

    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: ref.current,
      style: nightMode ? "mapbox://styles/mapbox/navigation-night-v1" : "mapbox://styles/mapbox/dark-v11",
      center: [center?.lng ?? 77.2167, center?.lat ?? 28.6139],
      zoom: 12.2,
      pitch: 58,
      bearing: -18
    });

    mapRef.current = map;

    map.on("load", () => {
      const features =
        incidents.length > 0
          ? incidents.map((incident) => ({
              type: "Feature" as const,
              properties: { risk: incident.severity },
              geometry: { type: "Point" as const, coordinates: [incident.lng, incident.lat] }
            }))
          : [
              { type: "Feature" as const, properties: { risk: 88 }, geometry: { type: "Point" as const, coordinates: [77.209, 28.6139] } },
              { type: "Feature" as const, properties: { risk: 76 }, geometry: { type: "Point" as const, coordinates: [77.2248, 28.6162] } },
              { type: "Feature" as const, properties: { risk: 42 }, geometry: { type: "Point" as const, coordinates: [77.2182, 28.6201] } }
            ];

      if (map.getSource("risk-zones")) {
        (map.getSource("risk-zones") as mapboxgl.GeoJSONSource).setData({
          type: "FeatureCollection",
          features
        });
        return;
      }

      map.addSource("risk-zones", {
        type: "geojson",
        data: { type: "FeatureCollection", features }
      });

      map.addLayer({
        id: "risk-heat",
        type: "heatmap",
        source: "risk-zones",
        paint: {
          "heatmap-weight": ["interpolate", ["linear"], ["get", "risk"], 0, 0, 100, 1],
          "heatmap-intensity": 1.4,
          "heatmap-radius": 48,
          "heatmap-opacity": 0.74,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(35,245,255,0)",
            0.35,
            "rgba(35,245,255,0.58)",
            0.65,
            "rgba(255,211,110,0.76)",
            1,
            "rgba(255,79,121,0.9)"
          ]
        }
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [center?.lat, center?.lng, incidents, nightMode]);

  useEffect(() => {
    if (!center || !mapRef.current) return;
    mapRef.current.flyTo({ center: [center.lng, center.lat], zoom: 13.5, essential: true });
  }, [center]);

  return <div ref={ref} className="absolute inset-0 z-0" aria-label="Mapbox live safety map" />;
}
