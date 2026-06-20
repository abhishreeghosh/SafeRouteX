from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_db
from app.services.report_service import create_report, list_reports, moderate_report

router = APIRouter()


class ReportCreate(BaseModel):
    category: str
    description: str = Field(min_length=8, max_length=500)
    lat: float
    lng: float
    district: str


class ModerationRequest(BaseModel):
    action: str


@router.get("")
async def get_reports(
    status: str | None = Query(default=None),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    return await list_reports(db, status=status)


@router.post("")
async def submit_report(payload: ReportCreate, db: AsyncSession = Depends(get_db)) -> dict:
    return await create_report(db, payload.model_dump())


@router.post("/{report_id}/moderate")
async def review_report(
    report_id: str,
    payload: ModerationRequest,
    db: AsyncSession = Depends(get_db),
) -> dict:
    if payload.action not in {"approve", "reject"}:
        raise HTTPException(status_code=400, detail="Action must be approve or reject")

    report = await moderate_report(db, report_id, payload.action)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report
