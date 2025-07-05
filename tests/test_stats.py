# TEST

# pytest --disable-warnings
# pytest tests/test_stats.py -v --disable-warnings

import os
from starlette import status
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_stats_endpoint():
    api_key = os.getenv("ADMIN_API_KEY")
    response = client.get("/stats", headers={"X-API-Key": api_key})
    assert response.status_code == status.HTTP_200_OK

    data = response.json()
    assert "total_interactions" in data
    assert "average_response_time" in data
    assert "error_rate" in data
    assert "category_distribution" in data
    assert "conversations" in data
