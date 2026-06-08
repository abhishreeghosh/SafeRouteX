def score_routes(origin: dict, destination: dict, night_mode: bool) -> dict:
    night_penalty = 9 if night_mode else 0
    routes = [
        {
            "name": "Guardian Route",
            "score": max(0, 91 - night_penalty // 3),
            "eta_minutes": 18,
            "distance_km": 6.8,
            "risk_exposure": "low",
            "path": [origin, {"lat": 28.619, "lng": 77.216}, destination],
        },
        {
            "name": "Balanced Route",
            "score": max(0, 76 - night_penalty),
            "eta_minutes": 14,
            "distance_km": 5.9,
            "risk_exposure": "medium",
            "path": [origin, {"lat": 28.616, "lng": 77.221}, destination],
        },
        {
            "name": "Fastest Route",
            "score": max(0, 43 - night_penalty),
            "eta_minutes": 11,
            "distance_km": 5.4,
            "risk_exposure": "high",
            "path": [origin, {"lat": 28.612, "lng": 77.228}, destination],
        },
    ]
    return {"recommended": routes[0], "alternatives": routes, "model": "segment-risk-v1"}
