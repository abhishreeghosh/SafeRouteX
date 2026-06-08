"use client";

import { useState } from "react";
import { AlertTriangle, BellRing, Layers, LocateFixed, Moon, Navigation2, Search, ShieldCheck } from "lucide-react";
import { AssistantPanel } from "@/components/assistant-panel";
import { MapboxLiveMap } from "@/components/mapbox-live-map";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { alerts, routeOptions } from "@/lib/data";

const categories = ["All", "Theft", "Assault", "Vandalism", "Fraud", "Emergency"];

export default function MapPage() {
  const [active, setActive] = useState("All");

  return (
    <main className="min-h-screen bg-[#05070d] pt-16">
      <Nav />
      <section className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[360px_1fr_380px]">
        <aside className="border-r border-white/10 bg-[#07111f]/90 p-4 backdrop-blur-xl">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-white/40" />
            <input className="h-11 w-full rounded-md border border-white/10 bg-white/10 pl-10 pr-3 text-sm text-white outline-none focus:border-cyber-cyan" placeholder="Search neighborhood or destination" />
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
            {routeOptions.map((route) => (
              <Card key={route.name} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-white">{route.name}</h2>
                    <p className="text-xs text-white/50">{route.eta} / {route.distance}</p>
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
          <MapboxLiveMap />
          <div className="map-grid pointer-events-none absolute inset-0 opacity-70 mix-blend-screen" />
          <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="bg-black/40">
              <Layers className="h-4 w-4" />
              Heatmap
            </Button>
            <Button variant="outline" size="sm" className="bg-black/40">
              <Moon className="h-4 w-4" />
              Night mode
            </Button>
            <Button size="sm">
              <LocateFixed className="h-4 w-4" />
              My location
            </Button>
          </div>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1100 760" fill="none">
            <path className="route-line" d="M104 628 C 244 548, 306 438, 482 406 C 660 374, 724 226, 996 116" stroke="#45ffb4" strokeWidth="12" strokeLinecap="round" />
            <path d="M112 672 C 278 604, 374 512, 548 488 C 706 464, 790 326, 1010 224" stroke="#ffd36e" strokeWidth="5" strokeLinecap="round" strokeDasharray="10 18" opacity=".8" />
            <path d="M88 574 C 238 440, 378 304, 540 286 C 718 266, 788 172, 1034 70" stroke="#ff4f79" strokeWidth="5" strokeLinecap="round" strokeDasharray="8 16" opacity=".7" />
          </svg>
          {[
            ["left-[20%] top-[22%]", "Critical theft cluster", "bg-cyber-red/25 border-cyber-red text-cyber-red"],
            ["left-[58%] top-[34%]", "Amber crowd density", "bg-cyber-amber/25 border-cyber-amber text-cyber-amber"],
            ["left-[76%] top-[19%]", "Predicted hotspot", "bg-cyber-red/25 border-cyber-red text-cyber-red"],
            ["left-[34%] top-[68%]", "Safe corridor", "bg-cyber-mint/20 border-cyber-mint text-cyber-mint"]
          ].map(([pos, label, cls]) => (
            <div key={label} className={`absolute ${pos} animate-float rounded-md border px-3 py-2 text-xs font-medium backdrop-blur-xl ${cls}`}>
              {label}
            </div>
          ))}
          <div className="absolute bottom-4 left-4 right-4 grid gap-3 md:grid-cols-3">
            {["Live crime heat", "Route risk", "Prediction layer"].map((item) => (
              <div key={item} className="rounded-md border border-white/10 bg-black/50 p-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">{item}</p>
                <p className="mt-2 text-lg font-semibold text-white">{item === "Route risk" ? "Low" : item === "Prediction layer" ? "Active" : "84%"}</p>
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
                <p className="text-sm text-white/50">Central Grid</p>
              </div>
            </div>
            <div className="mt-5 text-5xl font-semibold text-white">82</div>
            <Progress value={82} className="mt-3" />
          </Card>
          <Card className="p-4">
            <div className="mb-3 flex items-center gap-2 font-semibold text-white">
              <BellRing className="h-4 w-4 text-cyber-cyan" />
              Live alerts
            </div>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.title} className="rounded-md border border-white/10 bg-white/5 p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className={`mt-0.5 h-4 w-4 ${alert.severity === "critical" ? "text-cyber-red" : alert.severity === "medium" ? "text-cyber-amber" : "text-cyber-mint"}`} />
                    <div>
                      <p className="text-sm font-medium text-white">{alert.title}</p>
                      <p className="text-xs text-white/50">{alert.area} / {alert.ago}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <AssistantPanel />
          <Button variant="danger" size="lg" className="w-full">
            <Navigation2 className="h-5 w-5" />
            Start emergency route
          </Button>
        </aside>
      </section>
    </main>
  );
}
