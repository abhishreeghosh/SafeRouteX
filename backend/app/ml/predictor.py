import math
from random import Random


def predict_hotspots(horizon_hours: int) -> dict:
    rng = Random(42 + horizon_hours)
    hotspots = []
    centers = [
        ("Old Market", 28.6139, 77.2090, 0.88),
        ("North Pier", 28.6162, 77.2248, 0.79),
        ("Riverside", 28.6206, 77.2041, 0.58),
    ]
    for index, (district, lat, lng, base) in enumerate(centers):
        confidence = min(0.96, base + math.sin(horizon_hours + index) * 0.04)
        hotspots.append(
            {
                "district": district,
                "lat": lat + rng.uniform(-0.004, 0.004),
                "lng": lng + rng.uniform(-0.004, 0.004),
                "risk": round(confidence * 100),
                "confidence": round(confidence, 2),
            }
        )
    return {"horizon_hours": horizon_hours, "model": "spatio-temporal-risk-forecast", "hotspots": hotspots}
