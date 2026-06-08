import {
  Activity,
  BellRing,
  BrainCircuit,
  CloudLightning,
  Map,
  Radar,
  Route,
  ShieldAlert,
  Siren,
  Users
} from "lucide-react";

export const cityMetrics = [
  { label: "Protected riders", value: "2.4M", delta: "+18%" },
  { label: "Live alert streams", value: "428", delta: "+31%" },
  { label: "Routes scored today", value: "91K", delta: "+42%" },
  { label: "Prediction accuracy", value: "87.6%", delta: "+5.2%" }
];

export const crimeSeries = [
  { time: "00", assault: 31, theft: 42, vandalism: 18, risk: 55 },
  { time: "03", assault: 25, theft: 35, vandalism: 16, risk: 48 },
  { time: "06", assault: 18, theft: 29, vandalism: 12, risk: 34 },
  { time: "09", assault: 21, theft: 61, vandalism: 25, risk: 58 },
  { time: "12", assault: 29, theft: 76, vandalism: 30, risk: 66 },
  { time: "15", assault: 34, theft: 88, vandalism: 28, risk: 72 },
  { time: "18", assault: 48, theft: 95, vandalism: 34, risk: 84 },
  { time: "21", assault: 63, theft: 82, vandalism: 41, risk: 91 }
];

export const riskByDistrict = [
  { name: "North Pier", risk: 78, trend: "+12", incidents: 142 },
  { name: "Central Grid", risk: 62, trend: "-4", incidents: 98 },
  { name: "Old Market", risk: 88, trend: "+21", incidents: 183 },
  { name: "Tech Park", risk: 31, trend: "-9", incidents: 44 },
  { name: "Riverside", risk: 54, trend: "+3", incidents: 73 }
];

export const routeOptions = [
  {
    name: "Guardian Route",
    score: 91,
    eta: "18 min",
    distance: "6.8 km",
    exposure: "Low",
    notes: "Avoids Old Market heat cluster and keeps near active patrol corridors."
  },
  {
    name: "Balanced Route",
    score: 76,
    eta: "14 min",
    distance: "5.9 km",
    exposure: "Medium",
    notes: "Fastest safe compromise with one monitored amber segment."
  },
  {
    name: "Fastest Route",
    score: 43,
    eta: "11 min",
    distance: "5.4 km",
    exposure: "High",
    notes: "Crosses two predicted night-time theft hotspots."
  }
];

export const features = [
  {
    title: "Crime Heatmap",
    icon: Map,
    copy: "Animated clusters, category filters, time windows, satellite mode, and live risk intensity layers."
  },
  {
    title: "Safe Routing AI",
    icon: Route,
    copy: "Scores every segment against historical incidents, lighting, crowd density, weather, and live alerts."
  },
  {
    title: "Prediction Engine",
    icon: BrainCircuit,
    copy: "Forecasts emerging hotspots with time-series models and geospatial neighborhood embeddings."
  },
  {
    title: "Emergency Mode",
    icon: Siren,
    copy: "SOS workflows, trusted contact sharing, nearby responder discovery, and live location handoff."
  },
  {
    title: "Community Intel",
    icon: Users,
    copy: "Anonymous reports with media evidence, reliability scores, moderation queues, and audit trails."
  },
  {
    title: "Real-Time Alerts",
    icon: BellRing,
    copy: "WebSocket alert streams for dangerous zones, weather-crime correlation, and route rerouting."
  },
  {
    title: "Safety Reports",
    icon: Activity,
    copy: "AI-generated summaries for cities, campuses, logistics teams, and public safety command centers."
  },
  {
    title: "Crowd Signal Fusion",
    icon: Radar,
    copy: "Combines report velocity, open data, transit density, and synthetic predictive simulations."
  },
  {
    title: "Weather Correlation",
    icon: CloudLightning,
    copy: "Models how rain, visibility, events, and nighttime movement shift urban risk patterns."
  },
  {
    title: "Admin Controls",
    icon: ShieldAlert,
    copy: "Moderation, heatmap tuning, model drift monitoring, and operational command dashboards."
  }
];

export const alerts = [
  { title: "Robbery cluster detected", area: "Old Market", severity: "critical", ago: "2m ago" },
  { title: "Police activity nearby", area: "Central Grid", severity: "medium", ago: "8m ago" },
  { title: "Safer route available", area: "Riverside", severity: "low", ago: "12m ago" }
];

export const testimonials = [
  {
    quote: "SafeRouteX makes urban risk understandable in seconds. It feels like mission control for public safety.",
    name: "Anika Shah",
    role: "Smart City Director"
  },
  {
    quote: "The routing model gives our night teams context they never had before. Faster decisions, fewer blind spots.",
    name: "Marcus Lee",
    role: "Logistics Security Lead"
  },
  {
    quote: "The interface is polished enough for executives and detailed enough for analysts. That combination is rare.",
    name: "Riley Chen",
    role: "Civic Data Founder"
  }
];
