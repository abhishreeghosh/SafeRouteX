from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_db
from app.services.incident_service import list_incidents

router = APIRouter()


@router.get("")
async def get_incidents(
    category: str | None = Query(default=None),
    hours: int = Query(default=24, ge=1, le=168),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    return await list_incidents(db, category=category, hours=hours)
