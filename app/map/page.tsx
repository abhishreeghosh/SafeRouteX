"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertTriangle, BellRing, Layers, LocateFixed, Moon, Navigation2, Search, ShieldCheck } from "lucide-react";
import { AssistantPanel } from "@/components/assistant-panel";
import { MapboxLiveMap } from "@/components/mapbox-live-map";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createAlertSocket, getAlerts, getIncidents, getSafeRoutes, type Alert, type Incident, type RouteOption } from "@/lib/api";
import { routeOptions as fallbackRoutes } from "@/lib/data";

const categories = ["All", "Theft", "Assault", "Vandalism", "Fraud", "Emergency"];
const defaultOrigin = { lat: 28.6139, lng: 77.209 };
const defaultDestination = { lat: 28.6269, lng: 77.2144 };

function formatRoute(route: RouteOption) {
  return {
    name: route.name,
    score: route.score,
    eta: `${route.eta_minutes} min`,
    distance: `${route.distance_km} km`,
    exposure: route.risk_exposure,
    notes: `${route.risk_exposure} exposure route scored by ${route.name}.`
  };
}

export default function MapPage() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const [nightMode, setNightMode] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [routes, setRoutes] = useState(fallbackRoutes);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [location, setLocation] = useState<{ lat: number; lng: number } | undefined>();
  const [neighborhoodScore, setNeighborhoodScore] = useState(82);

  useEffect(() => {
    getSafeRoutes(defaultOrigin, defaultDestination, nightMode)
      .then((response) => setRoutes(response.alternatives.map(formatRoute)))
      .catch(() => setRoutes(fallbackRoutes));

    getAlerts()
      .then(setAlerts)
      .catch(() => undefined);

    let socket: WebSocket | undefined;
    try {
      socket = createAlertSocket((alert) => {
        setAlerts((current) => [alert, ...current.filter((item) => item.id !== alert.id)].slice(0, 6));
      });
    } catch {
      socket = undefined;
    }

    return () => socket?.close();
  }, [nightMode]);

  useEffect(() => {
    getIncidents(active)
      .then((data) => {
        setIncidents(data);
        if (data.length > 0) {
          const avgSeverity = Math.round(data.reduce((sum, item) => sum + item.severity, 0) / data.length);
          setNeighborhoodScore(Math.max(0, 100 - avgSeverity));
        }
      })
      .catch(() => undefined);
  }, [active]);

  function locateUser() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  }

  const filteredAlerts = search
    ? alerts.filter((alert) => `${alert.title} ${alert.area}`.toLowerCase().includes(search.toLowerCase()))
    : alerts;

  return (
    <main className="min-h-screen bg-[#05070d] pt-16">
      <Nav />
      <section className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[360px_1fr_380px]">
        <aside className="border-r border-white/10 bg-[#07111f]/90 p-4 backdrop-blur-xl">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-white/40" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-11 w-full rounded-md border border-white/10 bg-white/10 pl-10 pr-3 text-sm text-white outline-none focus:border-cyber-cyan"
              placeholder="Search neighborhood or destination"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`rounded-full border px-3 py-1.5 text-xs transition ${active === category ? "border-cyber-cyan bg-cyber-cyan/20 text-cyber-cyan" : "border-white/10 bg-white/5 text-white/70 hover:text-white"}`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="mt-5 space-y-3">
            {routes.map((route) => (
              <Card key={route.name} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-white">{route.name}</h2>
                    <p className="text-xs text-white/50">
                      {route.eta} / {route.distance}
                    </p>
                  </div>
                  <strong className="text-2xl text-white">{route.score}</strong>
                </div>
                <Progress value={route.score} className="mt-3" />
                <p className="mt-3 text-xs leading-5 text-white/70">{route.notes}</p>
              </Card>
            ))}
          </div>
        </aside>
        <section className="relative min-h-[680px] overflow-hidden">
          {showHeatmap ? <MapboxLiveMap incidents={incidents} center={location} nightMode={nightMode} /> : null}
          <div className="map-grid pointer-events-none absolute inset-0 opacity-70 mix-blend-screen" />
          <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="bg-black/40" onClick={() => setShowHeatmap((value) => !value)}>
              <Layers className="h-4 w-4" />
              {showHeatmap ? "Heatmap on" : "Heatmap off"}
            </Button>
            <Button variant={nightMode ? "primary" : "outline"} size="sm" className="bg-black/40" onClick={() => setNightMode((value) => !value)}>
              <Moon className="h-4 w-4" />
              Night mode
            </Button>
            <Button size="sm" onClick={locateUser}>
              <LocateFixed className="h-4 w-4" />
              My location
            </Button>
          </div>
          <div className="absolute bottom-4 left-4 right-4 grid gap-3 md:grid-cols-3">
            {[
              { label: "Live crime heat", value: `${incidents.length || 4} signals` },
              { label: "Route risk", value: nightMode ? "Elevated" : "Low" },
              { label: "Prediction layer", value: "Active" }
            ].map((item) => (
              <div key={item.label} className="rounded-md border border-white/10 bg-black/50 p-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">{item.label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
        <aside className="space-y-4 border-l border-white/10 bg-[#07111f]/90 p-4 backdrop-blur-xl">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-md bg-cyber-mint/20 text-cyber-mint">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-semibold text-white">Neighborhood score</h2>
                <p className="text-sm text-white/50">{active === "All" ? "Central Grid" : active}</p>
              </div>
            </div>
            <div className="mt-5 text-5xl font-semibold text-white">{neighborhoodScore}</div>
            <Progress value={neighborhoodScore} className="mt-3" />
          </Card>
          <Card className="p-4">
            <div className="mb-3 flex items-center gap-2 font-semibold text-white">
              <BellRing className="h-4 w-4 text-cyber-cyan" />
              Live alerts
            </div>
            <div className="space-y-3">
              {filteredAlerts.map((alert) => (
                <div key={alert.id} className="rounded-md border border-white/10 bg-white/5 p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className={`mt-0.5 h-4 w-4 ${alert.severity === "critical" ? "text-cyber-red" : alert.severity === "medium" ? "text-cyber-amber" : "text-cyber-mint"}`} />
                    <div>
                      <p className="text-sm font-medium text-white">{alert.title}</p>
                      <p className="text-xs text-white/50">{alert.area}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <AssistantPanel lat={location?.lat} lng={location?.lng} />
          <Link href="/emergency">
            <Button variant="danger" size="lg" className="w-full">
              <Navigation2 className="h-5 w-5" />
              Start emergency route
            </Button>
          </Link>
        </aside>
      </section>
    </main>
  );
}
