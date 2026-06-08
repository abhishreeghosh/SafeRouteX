import { Analytics } from "@/components/analytics";
import { Nav } from "@/components/nav";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cityMetrics, riskByDistrict } from "@/lib/data";
import { Activity, Building2, CloudRain, ShieldCheck, Users, type LucideIcon } from "lucide-react";

const signalCards: { label: string; icon: LucideIcon; body: string; value: number }[] = [
  { label: "Crowd density", icon: Users, body: "High near Station Gate", value: 74 },
  { label: "Patrol coverage", icon: ShieldCheck, body: "Strong in Central Grid", value: 88 },
  { label: "Report velocity", icon: Activity, body: "Rising in Old Market", value: 69 }
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#05070d] pt-16">
      <Nav />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.24em] text-cyber-cyan">Analytics dashboard</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Crime intelligence command center</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cityMetrics.map((metric) => (
            <Card key={metric.label} className="p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-white/50">{metric.label}</p>
              <div className="mt-4 flex items-end justify-between">
                <strong className="text-3xl text-white">{metric.value}</strong>
                <span className="text-sm text-cyber-mint">{metric.delta}</span>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-[0.7fr_0.3fr]">
          <Card className="p-5">
            <div className="mb-5 flex items-center gap-2 font-semibold text-white">
              <Building2 className="h-5 w-5 text-cyber-cyan" />
              City comparison
            </div>
            <div className="space-y-4">
              {riskByDistrict.map((district) => (
                <div key={district.name}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-white">{district.name}</span>
                    <span className="text-white/70">{district.risk}/100 / {district.incidents} incidents</span>
                  </div>
                  <Progress value={district.risk} />
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <div className="mb-5 flex items-center gap-2 font-semibold text-white">
              <CloudRain className="h-5 w-5 text-cyber-amber" />
              Weather correlation
            </div>
            <div className="space-y-4 text-sm text-white/70">
              <p>Rain is projected to increase vehicle break-in probability by 13% near transit lots.</p>
              <p>Low visibility after 20:00 raises Old Market assault risk confidence to 0.78.</p>
              <p>Event crowd outflow adds a temporary 22% theft risk spike.</p>
            </div>
          </Card>
        </div>
      </section>
      <Analytics />
      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-16 sm:px-6 md:grid-cols-3 lg:px-8">
        {signalCards.map((card) => (
          <Card key={card.label} className="p-5">
            <card.icon className="mb-4 h-6 w-6 text-cyber-cyan" />
            <h2 className="font-semibold text-white">{card.label}</h2>
            <p className="mt-2 text-sm text-white/60">{card.body}</p>
            <Progress value={card.value} className="mt-5" />
          </Card>
        ))}
      </section>
    </main>
  );
}
