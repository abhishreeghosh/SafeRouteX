"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Radar, ShieldAlert, Sparkles, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThreeOrbit } from "@/components/three-orbit";
import { cityMetrics } from "@/lib/data";

const heroSignals: { label: string; icon: LucideIcon }[] = [
  { label: "Safe routing", icon: ShieldAlert },
  { label: "Live heatmaps", icon: Radar },
  { label: "Verified intelligence", icon: BadgeCheck }
];

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-radial-grid pt-24">
      <div className="absolute inset-0 grid-mask opacity-50" />
      <ThreeOrbit />
      <div className="relative z-10 mx-auto grid min-h-[calc(92vh-6rem)] max-w-7xl items-center gap-8 px-4 pb-12 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-6 border-cyber-cyan/40 bg-cyber-cyan/10 text-cyber-cyan">
              <Sparkles className="h-3.5 w-3.5" />
              AI crime intelligence platform
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="max-w-5xl text-5xl font-semibold leading-[0.98] text-white sm:text-6xl lg:text-7xl"
          >
            SafeRouteX
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl"
          >
            Predict dangerous zones, navigate through safer streets, and monitor live city risk with an AI-powered map built for modern public safety teams.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/map">
              <Button size="lg">
                Launch map
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg">
                View analytics
              </Button>
            </Link>
          </motion.div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {heroSignals.map((signal) => (
              <div key={signal.label} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/70">
                <signal.icon className="h-4 w-4 text-cyber-mint" />
                {signal.label}
              </div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative min-h-[480px] lg:min-h-[620px]"
        >
          <div className="absolute inset-0 rounded-lg border border-cyber-cyan/20 bg-cyber-cyan/5 blur-3xl" />
          <div className="glass relative h-full min-h-[480px] overflow-hidden rounded-lg">
            <div className="map-grid absolute inset-0 opacity-95" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(35,245,255,0.14),transparent)] animate-scan" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 680" fill="none">
              <path className="route-line" d="M66 554 C 160 465, 171 361, 292 333 S 412 242, 536 126" stroke="#45ffb4" strokeWidth="8" strokeLinecap="round" />
              <path d="M92 604 C 180 510, 218 438, 324 409 S 468 312, 548 212" stroke="#ff4f79" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 14" opacity="0.78" />
            </svg>
            {[
              ["left-[22%] top-[28%]", "critical", "12"],
              ["left-[62%] top-[40%]", "warning", "8"],
              ["left-[76%] top-[22%]", "critical", "19"],
              ["left-[38%] top-[68%]", "safe", "3"]
            ].map(([position, state, count]) => (
              <div key={position} className={`absolute ${position}`}>
                <div className={`animate-pulse-heat rounded-full p-4 ${state === "safe" ? "bg-cyber-cyan/20 shadow-glow" : state === "warning" ? "bg-cyber-amber/20 shadow-[0_0_36px_rgba(255,211,110,0.28)]" : "bg-cyber-red/20 shadow-danger"}`}>
                  <div className={`grid h-14 w-14 place-items-center rounded-full border text-sm font-bold ${state === "safe" ? "border-cyber-cyan text-cyber-cyan" : state === "warning" ? "border-cyber-amber text-cyber-amber" : "border-cyber-red text-cyber-red"}`}>
                    {count}
                  </div>
                </div>
              </div>
            ))}
            <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-2">
              {cityMetrics.slice(0, 2).map((metric) => (
                <div key={metric.label} className="rounded-md border border-white/10 bg-black/40 p-4 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/50">{metric.label}</p>
                  <div className="mt-2 flex items-end justify-between">
                    <strong className="text-2xl text-white">{metric.value}</strong>
                    <span className="text-sm text-cyber-mint">{metric.delta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
