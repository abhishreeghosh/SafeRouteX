from fastapi import APIRouter, Query
from app.services.incident_service import list_incidents

router = APIRouter()


@router.get("")
async def get_incidents(
    category: str | None = Query(default=None),
    hours: int = Query(default=24, ge=1, le=168),
) -> list[dict]:
    return list_incidents(category=category, hours=hours)
