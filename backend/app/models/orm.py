import uuid
from datetime import datetime

from geoalchemy2 import Geography
from sqlalchemy import ARRAY, Integer, Numeric, String, Text
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.core.db import Base


class UserReport(Base):
    __tablename__ = "user_reports"

    id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[str | None] = mapped_column(Text, nullable=True)
    category: Mapped[str] = mapped_column(Text, nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    district: Mapped[str | None] = mapped_column(Text, nullable=True)
    media_urls: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    reliability_score: Mapped[float] = mapped_column(Numeric(4, 2), default=0)
    status: Mapped[str] = mapped_column(Text, default="pending")
    # Stored as a geography POINT in Postgres; we read/write it as WKT "POINT(lng lat)"
    location: Mapped[str] = mapped_column(Geography(geometry_type="POINT", srid=4326), nullable=False)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())


class CrimeIncident(Base):
    __tablename__ = "crime_incidents"

    id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    category: Mapped[str] = mapped_column(Text, nullable=False)
    severity: Mapped[int] = mapped_column(Integer, nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    occurred_at: Mapped[datetime] = mapped_column(nullable=False)
    location: Mapped[str] = mapped_column(Geography(geometry_type="POINT", srid=4326), nullable=False)
    district: Mapped[str | None] = mapped_column(Text, nullable=True)
    source: Mapped[str] = mapped_column(Text, default="open_data")
