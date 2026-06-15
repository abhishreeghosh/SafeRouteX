from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import alerts, assistant, health, incidents, predictions, reports, routes
from app.core.config import settings

app = FastAPI(
    title="SafeRouteX API",
    version="1.0.0",
    description="Crime intelligence, safe routing, live alerts, and geospatial prediction APIs.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, tags=["health"])
app.include_router(incidents.router, prefix="/incidents", tags=["incidents"])
app.include_router(routes.router, prefix="/routes", tags=["routes"])
app.include_router(predictions.router, prefix="/predictions", tags=["predictions"])
app.include_router(alerts.router, prefix="/alerts", tags=["alerts"])
app.include_router(assistant.router, prefix="/assistant", tags=["assistant"])
app.include_router(reports.router, prefix="/reports", tags=["reports"])
