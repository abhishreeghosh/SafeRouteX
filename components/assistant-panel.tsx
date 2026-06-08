"use client";

import { useState } from "react";
import { Bot, Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const answers: Record<string, string> = {
  night: "Old Market is elevated after 21:00. SafeRouteX recommends Guardian Route via Central Grid and avoiding the south alley cluster.",
  route: "The safest route home scores 91/100, adds 4 minutes, and stays within two monitored corridors.",
  dangerous: "The highest-risk nearby zones are Old Market, North Pier, and the transfer station perimeter."
};

export function AssistantPanel() {
  const [prompt, setPrompt] = useState("Is Old Market safe at night?");
  const [answer, setAnswer] = useState(answers.night);

  function ask() {
    const key = prompt.toLowerCase().includes("route")
      ? "route"
      : prompt.toLowerCase().includes("danger")
        ? "dangerous"
        : "night";
    setAnswer(answers[key]);
  }

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-md bg-cyber-violet/20 text-cyber-violet">
            <Bot className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-semibold text-white">SafeRouteX AI</h3>
            <p className="text-sm text-white/50">Contextual safety assistant</p>
          </div>
        </div>
        <Button variant="outline" size="icon" aria-label="Voice assistant">
          <Mic className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-5 rounded-md border border-white/10 bg-black/30 p-4 text-sm leading-6 text-white/70">{answer}</div>
      <div className="mt-4 flex gap-2">
        <input
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          className="h-11 min-w-0 flex-1 rounded-md border border-white/10 bg-white/10 px-3 text-sm text-white outline-none focus:border-cyber-cyan"
          placeholder="Ask about safety, routes, or nearby risk"
        />
        <Button onClick={ask} size="icon" aria-label="Ask assistant">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
