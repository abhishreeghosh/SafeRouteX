from fastapi import APIRouter
from pydantic import BaseModel

from app.services.route_risk import score_routes

router = APIRouter()


class Coordinate(BaseModel):
    lat: float
    lng: float


class RouteRequest(BaseModel):
    origin: Coordinate
    destination: Coordinate
    night_mode: bool = False


@router.post("/safe")
async def safe_route(payload: RouteRequest) -> dict:
    return score_routes(payload.origin.model_dump(), payload.destination.model_dump(), payload.night_mode)
