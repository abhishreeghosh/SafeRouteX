from fastapi import APIRouter
from app.ml.predictor import predict_hotspots

router = APIRouter()


@router.get("/hotspots")
async def hotspots(horizon_hours: int = 12) -> dict:
    return predict_hotspots(horizon_hours=horizon_hours)
