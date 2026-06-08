import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({ message: "" }));
  const message = String(body.message ?? "").toLowerCase();

  const answer = message.includes("route")
    ? "Guardian Route is safest right now with a 91/100 score and low exposure."
    : message.includes("danger")
      ? "Old Market and North Pier are currently the highest-risk nearby zones."
      : "This area is moderately safe before 20:00, then risk rises due to theft clusters.";

  return NextResponse.json({
    answer,
    confidence: 0.86,
    sources: ["live-alerts", "route-risk", "prediction-grid"]
  });
}
