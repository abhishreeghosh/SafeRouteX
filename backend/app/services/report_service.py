from datetime import datetime, timezone
from uuid import uuid4

REPORTS: list[dict] = [
    {
        "id": "rep_001",
        "category": "theft",
        "description": "Suspicious activity near Old Market alley",
        "lat": 28.6139,
        "lng": 77.209,
        "district": "Old Market",
        "status": "pending",
        "reliability_score": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat(),
    },
    {
        "id": "rep_002",
        "category": "assault",
        "description": "Aggressive crowd reported at North Pier transit exit",
        "lat": 28.6162,
        "lng": 77.2248,
        "district": "North Pier",
        "status": "pending",
        "reliability_score": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat(),
    },
    {
        "id": "rep_003",
        "category": "vandalism",
        "description": "Broken street lighting on Riverside corridor",
        "lat": 28.6206,
        "lng": 77.2041,
        "district": "Riverside",
        "status": "pending",
        "reliability_score": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat(),
    },
]


def list_reports(status: str | None = None) -> list[dict]:
    if not status:
        return REPORTS
    return [report for report in REPORTS if report["status"] == status]


def create_report(payload: dict) -> dict:
    report = {
        "id": f"rep_{uuid4().hex[:8]}",
        "category": payload["category"].lower(),
        "description": payload["description"],
        "lat": payload["lat"],
        "lng": payload["lng"],
        "district": payload["district"],
        "status": "pending",
        "reliability_score": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    REPORTS.insert(0, report)
    return report


def moderate_report(report_id: str, action: str) -> dict | None:
    for report in REPORTS:
        if report["id"] != report_id:
            continue
        report["status"] = "approved" if action == "approve" else "rejected"
        report["reliability_score"] = 0.92 if action == "approve" else 0.18
        return report
    return None
