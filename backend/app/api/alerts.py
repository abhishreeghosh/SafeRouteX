from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.services.alert_service import alert_feed

router = APIRouter()


@router.get("")
async def get_alerts() -> list[dict]:
    return alert_feed()


@router.websocket("/ws")
async def alert_socket(websocket: WebSocket) -> None:
    await websocket.accept()
    try:
        for alert in alert_feed():
            await websocket.send_json(alert)
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        return
