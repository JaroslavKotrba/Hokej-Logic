# TEST

# pytest --disable-warnings
# pytest --disable-warnings --log-cli-level=INFO
# pytest tests/test_clear.py -v --disable-warnings

import logging
from starlette import status
from fastapi.testclient import TestClient
from app.main import app

# Configure logging for tests
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

client = TestClient(app)


def test_clear_endpoint_success():
    """Test successful clearing of conversation history"""
    response = client.post("/clear")
    assert response.status_code == status.HTTP_200_OK

    data = response.json()
    assert "message" in data
    assert "status" in data
    assert data["status"] is True
    assert "cleared" in data["message"].lower()
    logger.info(f"Clear response: {data['message']}")
