# SafeRouteX

SafeRouteX is a full-scale AI-powered crime intelligence and safe navigation platform. It combines a cinematic Next.js product experience with a FastAPI backend scaffold for crime heatmaps, safest-route scoring, hotspot prediction, real-time alerts, emergency workflows, community reporting, and admin analytics.

## Tech Stack

- Frontend: Next.js, React, Tailwind CSS, Framer Motion, Recharts, Three.js, Mapbox-ready map layer, shadcn-style reusable UI primitives
- Backend: FastAPI, PostgreSQL/PostGIS, Redis, WebSockets
- AI/ML: Python, Scikit-learn-ready predictors, TensorFlow dependency, geospatial route risk scoring
- Auth: Clerk-ready Google login environment variables
- Deployment: Docker, Docker Compose, Vercel frontend, Railway/Render backend, GitHub Actions CI

## Features

- Interactive animated crime heatmap with category and time filtering
- AI safe route navigation with risk scores and night-mode route logic
- AI crime prediction dashboard and district safety rankings
- Real-time alerts through REST and WebSocket endpoints
- Emergency SOS mode with live location and responder discovery UI
- Community reporting and moderation-ready admin console
- Smart AI assistant for safety questions
- Responsive PWA manifest and app-like interface

## Project Structure

```text
app/                 Next.js App Router pages and API routes
components/          Reusable UI, map previews, analytics, assistant, nav
lib/                 Shared utilities and demo intelligence data
backend/app/         FastAPI routes, services, ML, and database schema
infra/               Reserved for cloud/IaC expansion
public/              PWA assets
.github/workflows/   CI pipeline
```

## Local Setup

Install frontend dependencies:

```bash
npm install
npm run dev
```

Run the API locally:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Or run the full stack with Docker:

```bash
docker compose up --build
```

Frontend runs on `http://localhost:3000`. FastAPI runs on `http://localhost:8000`.

## Environment

Copy `.env.example` to `.env.local` for frontend work and to `backend/.env` for backend work. Add:

- `NEXT_PUBLIC_MAPBOX_TOKEN`
- `NEXT_PUBLIC_API_URL`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `DATABASE_URL`
- `REDIS_URL`

## Deployment

- Deploy the Next.js app to Vercel.
- Deploy the FastAPI API to Railway or Render.
- Use managed PostgreSQL with PostGIS enabled.
- Use managed Redis for alert caching and real-time fanout.
- Configure CI/CD with the included GitHub Actions workflow.

## API Documentation

See [API.md](API.md). When the backend is running, interactive docs are available at `http://localhost:8000/docs`.

## Product Notes

The current repository includes production-style architecture and polished demo intelligence data. To connect live data, replace `backend/app/services/*` mock feeds with PostGIS queries, Mapbox Directions calls, moderation storage, and streaming alert ingestion.
