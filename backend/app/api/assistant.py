from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class AssistantRequest(BaseModel):
    question: str
    lat: float | None = None
    lng: float | None = None


@router.post("/ask")
async def ask(payload: AssistantRequest) -> dict:
    question = payload.question.lower()
    if "route" in question:
        answer = "Guardian Route is the safest option right now with low hotspot exposure and active patrol coverage."
    elif "night" in question:
        answer = "Risk increases after 21:00. Stay near Central Grid and avoid Old Market side streets."
    else:
        answer = "The nearby risk level is moderate. SafeRouteX recommends monitored corridors and live alerts."

    return {
        "answer": answer,
        "confidence": 0.86,
        "signals": ["incidents", "prediction_grid", "route_risk", "community_reports"],
    }
