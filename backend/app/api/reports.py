from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field

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
async def get_reports(status: str | None = Query(default=None)) -> list[dict]:
    return list_reports(status=status)


@router.post("")
async def submit_report(payload: ReportCreate) -> dict:
    return create_report(payload.model_dump())


@router.post("/{report_id}/moderate")
async def review_report(report_id: str, payload: ModerationRequest) -> dict:
    if payload.action not in {"approve", "reject"}:
        raise HTTPException(status_code=400, detail="Action must be approve or reject")

    report = moderate_report(report_id, payload.action)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report
