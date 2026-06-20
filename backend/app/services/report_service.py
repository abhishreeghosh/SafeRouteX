from geoalchemy2.functions import ST_AsGeoJSON
from geoalchemy2.shape import to_shape
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.orm import UserReport


def _serialize(report: UserReport) -> dict:
    """Convert an ORM row (with a PostGIS geography point) into the plain dict the frontend expects."""
    point = to_shape(report.location)  # shapely Point, .x = lng, .y = lat
    return {
        "id": str(report.id),
        "category": report.category,
        "description": report.description,
        "lat": point.y,
        "lng": point.x,
        "district": report.district,
        "status": report.status,
        "reliability_score": float(report.reliability_score or 0),
        "created_at": report.created_at.isoformat() if report.created_at else None,
    }


async def list_reports(db: AsyncSession, status: str | None = None) -> list[dict]:
    stmt = select(UserReport).order_by(UserReport.created_at.desc())
    if status:
        stmt = stmt.where(UserReport.status == status)
    result = await db.execute(stmt)
    reports = result.scalars().all()
    return [_serialize(r) for r in reports]


async def create_report(db: AsyncSession, payload: dict) -> dict:
    report = UserReport(
        category=payload["category"].lower(),
        description=payload["description"],
        district=payload["district"],
        location=f"POINT({payload['lng']} {payload['lat']})",
        status="pending",
        reliability_score=0,
    )
    db.add(report)
    await db.commit()
    await db.refresh(report)
    return _serialize(report)


async def moderate_report(db: AsyncSession, report_id: str, action: str) -> dict | None:
    result = await db.execute(select(UserReport).where(UserReport.id == report_id))
    report = result.scalar_one_or_none()
    if not report:
        return None

    report.status = "approved" if action == "approve" else "rejected"
    report.reliability_score = 0.92 if action == "approve" else 0.18
    await db.commit()
    await db.refresh(report)
    return _serialize(report)
