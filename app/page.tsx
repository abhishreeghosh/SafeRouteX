import { Analytics } from "@/components/analytics";
import { AssistantPanel } from "@/components/assistant-panel";
import { FeatureGrid } from "@/components/feature-grid";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { MapPreview } from "@/components/map-preview";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cityMetrics, testimonials } from "@/lib/data";
import { ArrowRight, Quote } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <section className="border-y border-white/10 bg-[#030407] py-8">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {cityMetrics.map((metric) => (
            <div key={metric.label} className="rounded-md border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-white/50">{metric.label}</p>
              <div className="mt-3 flex items-end justify-between">
                <strong className="text-3xl text-white">{metric.value}</strong>
                <span className="text-sm text-cyber-mint">{metric.delta}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <MapPreview />
      <FeatureGrid />
      <Analytics />
      <section className="bg-[#07111f] py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyber-cyan">AI copilot</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Ask the city what is safe.</h2>
            <p className="mt-4 text-white/70">The assistant interprets active incidents, route risk, time of day, safety scores, and emergency resources into plain language answers.</p>
          </div>
          <AssistantPanel />
        </div>
      </section>
      <section className="bg-[#05070d] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyber-mint">Trusted by operators</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Built for command rooms and everyday riders.</h2>
            </div>
            <Link href="/map">
              <Button>
                Open live demo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <Card key={item.name} className="p-5">
                <Quote className="mb-5 h-6 w-6 text-cyber-cyan" />
                <p className="text-sm leading-7 text-white/70">{item.quote}</p>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-white/50">{item.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#07111f] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass grid gap-8 rounded-lg p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyber-cyan">Launch ready</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Deploy SafeRouteX as a full-stack demo.</h2>
              <p className="mt-4 max-w-3xl text-white/70">Next.js on Vercel, FastAPI on Railway or Render, PostgreSQL with PostGIS, Redis cache, WebSocket alerting, Docker Compose, CI, and environment templates are included.</p>
            </div>
            <Link href="/dashboard">
              <Button size="lg">
                Explore platform
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
