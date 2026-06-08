"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

export function MapboxLiveMap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token || token.includes("replace") || !ref.current) return;

    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: ref.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [77.2167, 28.6139],
      zoom: 12.2,
      pitch: 58,
      bearing: -18
    });

    map.on("load", () => {
      map.addSource("risk-zones", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: { risk: 88 },
              geometry: { type: "Point", coordinates: [77.209, 28.6139] }
            },
            {
              type: "Feature",
              properties: { risk: 76 },
              geometry: { type: "Point", coordinates: [77.2248, 28.6162] }
            },
            {
              type: "Feature",
              properties: { risk: 42 },
              geometry: { type: "Point", coordinates: [77.2182, 28.6201] }
            }
          ]
        }
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

    return () => map.remove();
  }, []);

  return <div ref={ref} className="absolute inset-0 z-0" aria-label="Mapbox live safety map" />;
}
