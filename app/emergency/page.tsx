import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Hospital, MapPin, PhoneCall, Radio, Share2, ShieldAlert, Siren, type LucideIcon } from "lucide-react";

const responders: { label: string; icon: LucideIcon; meta: string }[] = [
  { label: "Police", icon: PhoneCall, meta: "1.2 km" },
  { label: "Hospital", icon: Hospital, meta: "2.8 km" },
  { label: "Responder", icon: Radio, meta: "4 min" }
];

const emergencyActions: { title: string; icon: LucideIcon; copy: string }[] = [
  { title: "Share live location", icon: Share2, copy: "Send an encrypted real-time location link to trusted contacts." },
  { title: "Danger warning", icon: ShieldAlert, copy: "Trigger nearby alerts and reroute away from active hotspots." },
  { title: "Emergency contacts", icon: PhoneCall, copy: "Notify saved contacts with context and current route status." }
];

export default function EmergencyPage() {
  return (
    <main className="min-h-screen bg-[#05070d] pt-16">
      <Nav />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-cyber-red">Emergency mode</p>
          <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">One-tap safety response.</h1>
          <p className="mt-4 text-white/70">Share live location, alert trusted contacts, find nearby responders, and switch routing to monitored safety corridors.</p>
          <button className="mt-8 grid h-60 w-60 place-items-center rounded-full border border-cyber-red/50 bg-cyber-red/20 text-center shadow-danger transition hover:scale-105">
            <span>
              <Siren className="mx-auto mb-3 h-16 w-16 text-cyber-red" />
              <strong className="block text-3xl text-white">SOS</strong>
              <span className="mt-1 block text-sm text-white/70">Hold to activate</span>
            </span>
          </button>
        </div>
        <Card className="relative min-h-[560px] overflow-hidden">
          <div className="map-grid absolute inset-0 opacity-90" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 720 560" fill="none">
            <path className="route-line" d="M76 474 C 206 382, 288 352, 374 284 C 462 214, 542 148, 652 92" stroke="#45ffb4" strokeWidth="10" strokeLinecap="round" />
          </svg>
          <div className="absolute left-[46%] top-[44%] grid h-16 w-16 place-items-center rounded-full border border-cyber-cyan bg-cyber-cyan/20 text-cyber-cyan shadow-glow">
            <MapPin className="h-7 w-7" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-3">
            {responders.map((responder) => (
              <div key={responder.label} className="rounded-md border border-white/10 bg-black/50 p-4 backdrop-blur-xl">
                <responder.icon className="mb-3 h-5 w-5 text-cyber-mint" />
                <p className="font-semibold text-white">{responder.label}</p>
                <p className="text-sm text-white/50">{responder.meta}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-16 sm:px-6 md:grid-cols-3 lg:px-8">
        {emergencyActions.map((action) => (
          <Card key={action.title} className="p-5">
            <action.icon className="mb-4 h-6 w-6 text-cyber-cyan" />
            <h2 className="font-semibold text-white">{action.title}</h2>
            <p className="mt-2 text-sm leading-6 text-white/60">{action.copy}</p>
            <Button className="mt-5 w-full" variant="outline">Configure</Button>
          </Card>
        ))}
      </section>
    </main>
  );
}
