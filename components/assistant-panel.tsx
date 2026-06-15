"use client";

import { useState } from "react";
import { Bot, Loader2, Mic, Send } from "lucide-react";
import { askAssistant } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type AssistantPanelProps = {
  lat?: number;
  lng?: number;
};

export function AssistantPanel({ lat, lng }: AssistantPanelProps) {
  const [prompt, setPrompt] = useState("Is Old Market safe at night?");
  const [answer, setAnswer] = useState("Ask about routes, night safety, or nearby risk zones.");
  const [loading, setLoading] = useState(false);

  async function ask() {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const response = await askAssistant(prompt, lat, lng);
      setAnswer(`${response.answer} (confidence ${Math.round(response.confidence * 100)}%)`);
    } catch {
      setAnswer("SafeRouteX assistant is offline. Start the API with uvicorn to enable live answers.");
    } finally {
      setLoading(false);
    }
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
          onKeyDown={(event) => event.key === "Enter" && ask()}
          className="h-11 min-w-0 flex-1 rounded-md border border-white/10 bg-white/10 px-3 text-sm text-white outline-none focus:border-cyber-cyan"
          placeholder="Ask about safety, routes, or nearby risk"
        />
        <Button onClick={ask} size="icon" aria-label="Ask assistant" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </Card>
  );
}
