"use client";

import { useEffect, useState } from "react";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getReports, moderateReport, type CommunityReport } from "@/lib/api";
import { riskByDistrict } from "@/lib/data";
import { BrainCircuit, CheckCircle2, Gauge, SlidersHorizontal, UserCog } from "lucide-react";

export default function AdminPage() {
  const [reports, setReports] = useState<CommunityReport[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const pendingCount = reports.filter((report) => report.status === "pending").length;

  useEffect(() => {
    getReports("pending")
      .then(setReports)
      .catch(() => undefined);
  }, []);

  async function review(reportId: string, action: "approve" | "reject") {
    try {
      const updated = await moderateReport(reportId, action);
      setReports((current) => current.filter((report) => report.id !== updated.id));
      setMessage(`Report ${updated.id} ${action}d.`);
    } catch {
      setMessage("Moderation failed. Ensure the API is running.");
    }
  }

  return (
    <main className="min-h-screen bg-[#05070d] pt-16">
      <Nav />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyber-cyan">Admin console</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Operational controls</h1>
            {message ? <p className="mt-2 text-sm text-cyber-mint">{message}</p> : null}
          </div>
          <Button onClick={() => setMessage("Heatmap tuning published to prediction grid.")}>
            <SlidersHorizontal className="h-4 w-4" />
            Publish heatmap tuning
          </Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="p-5">
            <Gauge className="mb-4 h-6 w-6 text-cyber-cyan" />
            <h2 className="font-semibold text-white">Model health</h2>
            <p className="mt-2 text-sm text-white/70">Prediction drift remains inside policy threshold.</p>
            <Progress value={87} className="mt-5" />
          </Card>
          <Card className="p-5">
            <UserCog className="mb-4 h-6 w-6 text-cyber-mint" />
            <h2 className="font-semibold text-white">Moderation queue</h2>
            <p className="mt-2 text-sm text-white/70">{pendingCount || reports.length} community reports awaiting review.</p>
            <Progress value={Math.min(100, (pendingCount || 1) * 8)} className="mt-5" />
          </Card>
          <Card className="p-5">
            <BrainCircuit className="mb-4 h-6 w-6 text-cyber-amber" />
            <h2 className="font-semibold text-white">Simulation engine</h2>
            <p className="mt-2 text-sm text-white/70">Predictive policing scenario active for downtown grid.</p>
            <Progress value={72} className="mt-5" />
          </Card>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-[0.58fr_0.42fr]">
          <Card className="p-5">
            <h2 className="mb-5 font-semibold text-white">Heatmap controls</h2>
            <div className="space-y-5">
              {riskByDistrict.map((district) => (
                <div key={district.name}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-white">{district.name}</span>
                    <span className="text-white/50">Weight {district.risk}%</span>
                  </div>
                  <Progress value={district.risk} />
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <h2 className="mb-5 font-semibold text-white">Report moderation</h2>
            <div className="space-y-3">
              {reports.map((report) => (
                <div key={report.id} className="rounded-md border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-medium text-white">{report.description}</p>
                  <p className="mt-1 text-xs text-white/50">
                    {report.district} / {report.category} / {report.status}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => review(report.id, "approve")}>
                      <CheckCircle2 className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => review(report.id, "reject")}>
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
              {reports.length === 0 ? <p className="text-sm text-white/50">No pending reports in the queue.</p> : null}
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
