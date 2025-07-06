# TEST

# pytest --disable-warnings
# pytest --disable-warnings --log-cli-level=INFO
# pytest tests/test_chat.py -v --disable-warnings

import logging
from starlette import status
from fastapi.testclient import TestClient
from app.main import app

# Configure logging for tests
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

client = TestClient(app)


def test_chat_endpoint_success():
    """Test successful chat interaction"""
    payload = {"message": "Co znamená zkratka P.En?", "session_id": "test_123"}

    response = client.post("/chat", json=payload)
    assert response.status_code == status.HTTP_200_OK

    data = response.json()
    assert "response" in data
    assert "conversation_history" in data
    assert isinstance(data["response"], str)
    assert isinstance(data["conversation_history"], list)
    assert len(data["response"]) > 0
    logger.info(f"Chat response: {data['response']}")
