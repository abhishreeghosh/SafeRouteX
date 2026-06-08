from datetime import datetime, timedelta, timezone

INCIDENTS = [
    {"id": "inc_001", "category": "theft", "severity": 82, "lat": 28.6139, "lng": 77.2090, "district": "Old Market"},
    {"id": "inc_002", "category": "assault", "severity": 91, "lat": 28.6162, "lng": 77.2248, "district": "North Pier"},
    {"id": "inc_003", "category": "vandalism", "severity": 42, "lat": 28.6201, "lng": 77.2182, "district": "Central Grid"},
    {"id": "inc_004", "category": "fraud", "severity": 33, "lat": 28.6269, "lng": 77.2144, "district": "Tech Park"},
]


def list_incidents(category: str | None, hours: int) -> list[dict]:
    since = datetime.now(timezone.utc) - timedelta(hours=hours)
    records = INCIDENTS if not category else [item for item in INCIDENTS if item["category"] == category.lower()]
    return [{**item, "reported_at": since.isoformat()} for item in records]
