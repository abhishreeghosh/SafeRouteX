def alert_feed() -> list[dict]:
    return [
        {"id": "al_001", "title": "Robbery cluster detected", "area": "Old Market", "severity": "critical"},
        {"id": "al_002", "title": "Police activity nearby", "area": "Central Grid", "severity": "medium"},
        {"id": "al_003", "title": "Safer route available", "area": "Riverside", "severity": "low"},
    ]
