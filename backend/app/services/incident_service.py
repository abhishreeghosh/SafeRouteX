from datetime import datetime, timedelta, timezone

from geoalchemy2.shape import to_shape
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.orm import CrimeIncident


def _serialize(incident: CrimeIncident) -> dict:
    point = to_shape(incident.location)  # shapely Point, .x = lng, .y = lat
    return {
        "id": str(incident.id),
        "category": incident.category,
        "severity": incident.severity,
        "description": incident.description,
        "lat": point.y,
        "lng": point.x,
        "district": incident.district,
        "source": incident.source,
        "reported_at": incident.occurred_at.isoformat() if incident.occurred_at else None,
    }


async def list_incidents(db: AsyncSession, category: str | None, hours: int) -> list[dict]:
    since = datetime.now(timezone.utc) - timedelta(hours=hours)
    stmt = select(CrimeIncident).where(CrimeIncident.occurred_at >= since).order_by(CrimeIncident.occurred_at.desc())
    if category:
        stmt = stmt.where(CrimeIncident.category == category.lower())
    result = await db.execute(stmt)
    incidents = result.scalars().all()
    return [_serialize(i) for i in incidents]
