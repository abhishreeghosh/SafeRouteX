"use client";

import { motion } from "framer-motion";
import { Layers, LocateFixed, Moon, Navigation, Satellite, SlidersHorizontal, type LucideIcon } from "lucide-react";
import { routeOptions } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const mapTools: { label: string; icon: LucideIcon }[] = [
  { label: "Heat", icon: Layers },
  { label: "Satellite", icon: Satellite },
  { label: "Night", icon: Moon },
  { label: "Filter", icon: SlidersHorizontal }
];

export function MapPreview() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#07111f] py-20">
      <div className="absolute inset-0 map-grid opacity-30" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <Card className="relative min-h-[620px] overflow-hidden">
          <div className="map-grid absolute inset-0" />
          <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
            {mapTools.map((tool) => (
              <Button key={tool.label} variant="outline" size="sm" className="bg-black/40">
                <tool.icon className="h-4 w-4" />
                {tool.label}
              </Button>
            ))}
          </div>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 620" fill="none">
            <path className="route-line" d="M84 520 C 218 424, 294 352, 416 340 C 576 326, 584 196, 782 112" stroke="#45ffb4" strokeWidth="10" strokeLinecap="round" />
            <path d="M120 540 C 230 494, 352 451, 468 410 C 612 360, 662 232, 790 196" stroke="#ffd36e" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 16" opacity=".8" />
            <path d="M94 492 C 210 396, 312 274, 478 244 C 600 222, 682 142, 812 74" stroke="#ff4f79" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 18" opacity=".65" />
          </svg>
          {[
            ["left-[18%] top-[25%]", "bg-cyber-red/25 border-cyber-red text-cyber-red", "Theft surge"],
            ["left-[51%] top-[33%]", "bg-cyber-amber/25 border-cyber-amber text-cyber-amber", "Crowd risk"],
            ["left-[68%] top-[18%]", "bg-cyber-red/25 border-cyber-red text-cyber-red", "Assault trend"],
            ["left-[35%] top-[70%]", "bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan", "Patrol zone"]
          ].map(([pos, cls, label]) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`absolute ${pos} rounded-full border px-3 py-2 text-xs font-medium shadow-glow backdrop-blur-xl ${cls}`}
            >
              {label}
            </motion.div>
          ))}
          <div className="absolute bottom-4 left-4 right-4 grid gap-3 md:grid-cols-3">
            {routeOptions.map((route) => (
              <div key={route.name} className="rounded-md border border-white/10 bg-black/50 p-4 backdrop-blur-xl">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{route.name}</p>
                    <p className="text-xs text-white/50">{route.eta} / {route.distance}</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-cyber-mint">{route.score}</span>
                </div>
                <Progress value={route.score} className="mt-3" />
              </div>
            ))}
          </div>
        </Card>
        <div className="space-y-5">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyber-cyan">AI safe navigation</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Routes optimized for risk, not just speed.</h2>
            <p className="mt-4 text-white/70">SafeRouteX scores every street segment with live incidents, forecast risk, lighting, footfall, weather, and confidence from community intelligence.</p>
          </div>
          {routeOptions.map((route) => (
            <Card key={route.name} className="p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-white/10 text-cyber-cyan">
                    <Navigation className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{route.name}</h3>
                    <p className="text-sm text-white/50">{route.exposure} exposure</p>
                  </div>
                </div>
                <strong className="text-2xl text-white">{route.score}</strong>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/70">{route.notes}</p>
            </Card>
          ))}
          <Button size="lg" className="w-full">
            <LocateFixed className="h-5 w-5" />
            Simulate safest route
          </Button>
        </div>
      </div>
    </section>
  );
}
