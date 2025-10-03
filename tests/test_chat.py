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
    """
    Test chat endpoint with context: initial and follow-up message using the same session_id
    """

    session_id = "test_123"

    first_request = {"message": "Co znamená zkratka P.En?", "session_id": session_id}

    first_response = client.post("/chat", json=first_request)
    assert first_response.status_code == status.HTTP_200_OK

    first_data = first_response.json()
    assert "response" in first_data
    assert "conversation_history" in first_data
    assert isinstance(first_data["response"], str)
    assert isinstance(first_data["conversation_history"], list)
    assert len(first_data["response"]) > 0

    followup_request = {"message": "A co znamená zkratka G?", "session_id": session_id}

    followup_response = client.post("/chat", json=followup_request)
    assert followup_response.status_code == status.HTTP_200_OK

    followup_data = followup_response.json()
    assert "response" in followup_data
    assert "conversation_history" in followup_data
    assert isinstance(followup_data["response"], str)
    assert isinstance(followup_data["conversation_history"], list)
    assert len(followup_data["response"]) > 0

    # Optionally, check that conversation history has grown
    assert len(followup_data["conversation_history"]) >= 2
    logger.info(f"Follow-up chat response: {followup_data['response']}")
