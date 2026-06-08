# SafeRouteX API

Base URL: `http://localhost:8000`

## Health

`GET /health`

Returns service status.

## Incidents

`GET /incidents?category=theft&hours=24`

Returns crime incident points with severity, category, district, and coordinates.

## Safe Routes

`POST /routes/safe`

```json
{
  "origin": { "lat": 28.6139, "lng": 77.209 },
  "destination": { "lat": 28.6269, "lng": 77.2144 },
  "night_mode": true
}
```

Returns recommended route, alternatives, risk scores, ETA, distance, and exposure level.

## Predictions

`GET /predictions/hotspots?horizon_hours=12`

Returns future hotspot predictions with model confidence.

## Alerts

`GET /alerts`

Returns current alert feed.

`WS /alerts/ws`

Streams alert events to connected clients.

## AI Assistant

`POST /assistant/ask`

```json
{
  "question": "Is this area safe at night?",
  "lat": 28.6139,
  "lng": 77.209
}
```

Returns a natural-language answer, confidence score, and contributing safety signals.
