# Infrastructure Notes

This directory is reserved for cloud infrastructure modules. Recommended production layout:

- Vercel project for the Next.js frontend
- Railway or Render service for FastAPI
- Managed PostgreSQL with PostGIS enabled
- Managed Redis for alert caching and WebSocket fanout
- Object storage for report media uploads
- Secret manager for Clerk, Mapbox, database, Redis, and AI provider keys
