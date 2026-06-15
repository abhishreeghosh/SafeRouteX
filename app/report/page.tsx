"use client";

import { useState } from "react";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { submitReport } from "@/lib/api";
import { MapPin, Send, ShieldCheck } from "lucide-react";

const categories = ["theft", "assault", "vandalism", "fraud", "emergency"];
const districts = ["Old Market", "North Pier", "Central Grid", "Tech Park", "Riverside"];

export default function ReportPage() {
  const [category, setCategory] = useState("theft");
  const [district, setDistrict] = useState("Old Market");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const coords = await new Promise<{ lat: number; lng: number }>((resolve) => {
      if (!navigator.geolocation) {
        resolve({ lat: 28.6139, lng: 77.209 });
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
        () => resolve({ lat: 28.6139, lng: 77.209 })
      );
    });

    try {
      const report = await submitReport({
        category,
        description,
        district,
        lat: coords.lat,
        lng: coords.lng
      });
      setStatus(`Report ${report.id} submitted for moderation.`);
      setDescription("");
    } catch {
      setStatus("Submission failed. Start the SafeRouteX API and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#05070d] pt-16">
      <Nav />
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.24em] text-cyber-cyan">Community intel</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Submit a safety report</h1>
          <p className="mt-4 text-white/70">Anonymous community reports feed the moderation queue and improve neighborhood risk models.</p>
        </div>
        <Card className="p-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm text-white/70">Category</label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-11 w-full rounded-md border border-white/10 bg-white/10 px-3 text-sm text-white outline-none focus:border-cyber-cyan"
              >
                {categories.map((item) => (
                  <option key={item} value={item} className="bg-cyber-ink">
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/70">District</label>
              <select
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
                className="h-11 w-full rounded-md border border-white/10 bg-white/10 px-3 text-sm text-white outline-none focus:border-cyber-cyan"
              >
                {districts.map((item) => (
                  <option key={item} value={item} className="bg-cyber-ink">
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/70">Description</label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
                minLength={8}
                rows={5}
                className="w-full rounded-md border border-white/10 bg-white/10 px-3 py-3 text-sm text-white outline-none focus:border-cyber-cyan"
                placeholder="Describe what you observed, when it happened, and any safety concerns."
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <MapPin className="h-4 w-4 text-cyber-mint" />
              GPS coordinates are attached automatically when available.
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              <Send className="h-4 w-4" />
              {loading ? "Submitting..." : "Submit report"}
            </Button>
          </form>
          {status ? (
            <div className="mt-5 flex items-center gap-2 rounded-md border border-cyber-mint/30 bg-cyber-mint/10 p-4 text-sm text-cyber-mint">
              <ShieldCheck className="h-4 w-4" />
              {status}
            </div>
          ) : null}
        </Card>
      </section>
    </main>
  );
}
