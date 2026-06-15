"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getHotspots, type Hotspot } from "@/lib/api";
import { BrainCircuit } from "lucide-react";

export function DashboardHotspots() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);

  useEffect(() => {
    getHotspots(12)
      .then((response) => setHotspots(response.hotspots))
      .catch(() => undefined);
  }, []);

  if (hotspots.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <Card className="p-5">
        <div className="mb-5 flex items-center gap-2 font-semibold text-white">
          <BrainCircuit className="h-5 w-5 text-cyber-violet" />
          AI hotspot predictions (next 12 hours)
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {hotspots.map((hotspot) => (
            <div key={hotspot.district} className="rounded-md border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">{hotspot.district}</span>
                <span className="text-sm text-cyber-amber">{hotspot.risk}/100</span>
              </div>
              <Progress value={hotspot.risk} className="mt-3" />
              <p className="mt-2 text-xs text-white/50">Model confidence {Math.round(hotspot.confidence * 100)}%</p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
