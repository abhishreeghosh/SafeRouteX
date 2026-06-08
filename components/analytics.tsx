"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Activity, BrainCircuit, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { crimeSeries, riskByDistrict } from "@/lib/data";

export function Analytics() {
  return (
    <section className="bg-[#05070d] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyber-mint">Predictive intelligence</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Forecasts that operators can trust.</h2>
          </div>
          <p className="max-w-xl text-white/70">ML forecasts combine incident history, weather, crowd density, report velocity, and location embeddings to power safety scores across the city.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-cyber-cyan" />
                24-hour risk forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={crimeSeries}>
                    <defs>
                      <linearGradient id="risk" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="#23f5ff" stopOpacity={0.65} />
                        <stop offset="95%" stopColor="#23f5ff" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                    <XAxis dataKey="time" stroke="rgba(255,255,255,.45)" />
                    <YAxis stroke="rgba(255,255,255,.45)" />
                    <Tooltip contentStyle={{ background: "#07111f", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, color: "#fff" }} />
                    <Area type="monotone" dataKey="risk" stroke="#23f5ff" fill="url(#risk)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-cyber-amber" />
                District safety index
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={riskByDistrict} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid stroke="rgba(255,255,255,.08)" horizontal={false} />
                    <XAxis type="number" stroke="rgba(255,255,255,.45)" />
                    <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,.45)" width={92} />
                    <Tooltip contentStyle={{ background: "#07111f", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, color: "#fff" }} />
                    <Bar dataKey="risk" fill="#ff4f79" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-5 p-5">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Model", "Gradient boosted spatio-temporal risk scoring"],
              ["Inputs", "Crime records, community reports, footfall, weather, lighting"],
              ["Output", "Neighborhood scores, route exposure, confidence intervals"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-white/10 bg-white/5 p-4">
                <BrainCircuit className="mb-4 h-5 w-5 text-cyber-mint" />
                <p className="text-xs uppercase tracking-[0.18em] text-white/50">{label}</p>
                <p className="mt-2 text-sm leading-6 text-white/70">{value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
