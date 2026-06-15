const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers
    }
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${path}`);
  }

  return response.json() as Promise<T>;
}

export type Alert = {
  id: string;
  title: string;
  area: string;
  severity: "critical" | "medium" | "low";
};

export type RouteOption = {
  name: string;
  score: number;
  eta_minutes: number;
  distance_km: number;
  risk_exposure: string;
  path: { lat: number; lng: number }[];
};

export type SafeRouteResponse = {
  recommended: RouteOption;
  alternatives: RouteOption[];
  model: string;
};

export type Incident = {
  id: string;
  category: string;
  severity: number;
  lat: number;
  lng: number;
  district: string;
  reported_at: string;
};

export type Hotspot = {
  district: string;
  lat: number;
  lng: number;
  risk: number;
  confidence: number;
};

export type HotspotResponse = {
  horizon_hours: number;
  model: string;
  hotspots: Hotspot[];
};

export type AssistantResponse = {
  answer: string;
  confidence: number;
  signals: string[];
};

export type CommunityReport = {
  id: string;
  category: string;
  description: string;
  lat: number;
  lng: number;
  district: string;
  status: "pending" | "approved" | "rejected";
  reliability_score: number;
  created_at: string;
};

export function getAlerts() {
  return request<Alert[]>("/alerts");
}

export function getIncidents(category?: string, hours = 24) {
  const params = new URLSearchParams({ hours: String(hours) });
  if (category && category !== "All") {
    params.set("category", category.toLowerCase());
  }
  return request<Incident[]>(`/incidents?${params}`);
}

export function getSafeRoutes(origin: { lat: number; lng: number }, destination: { lat: number; lng: number }, nightMode = false) {
  return request<SafeRouteResponse>("/routes/safe", {
    method: "POST",
    body: JSON.stringify({ origin, destination, night_mode: nightMode })
  });
}

export function getHotspots(horizonHours = 12) {
  return request<HotspotResponse>(`/predictions/hotspots?horizon_hours=${horizonHours}`);
}

export function askAssistant(question: string, lat?: number, lng?: number) {
  return request<AssistantResponse>("/assistant/ask", {
    method: "POST",
    body: JSON.stringify({ question, lat, lng })
  });
}

export function getReports(status?: string) {
  const query = status ? `?status=${status}` : "";
  return request<CommunityReport[]>(`/reports${query}`);
}

export function submitReport(payload: {
  category: string;
  description: string;
  lat: number;
  lng: number;
  district: string;
}) {
  return request<CommunityReport>("/reports", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function moderateReport(id: string, action: "approve" | "reject") {
  return request<CommunityReport>(`/reports/${id}/moderate`, {
    method: "POST",
    body: JSON.stringify({ action })
  });
}

export function createAlertSocket(onAlert: (alert: Alert) => void) {
  const wsUrl = API_URL.replace(/^http/, "ws");
  const socket = new WebSocket(`${wsUrl}/alerts/ws`);

  socket.onmessage = (event) => {
    onAlert(JSON.parse(event.data) as Alert);
  };

  return socket;
}
