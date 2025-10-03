# TEST

# pytest --disable-warnings
# pytest tests/test_stats.py -v --disable-warnings

import os
import pytest
from starlette import status
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_stats_endpoint_missing_api_key():
    """
    Test /stats endpoint without API key, should return 401 or 403
    """

    response = client.get("/stats")
    assert response.status_code in (
        status.HTTP_401_UNAUTHORIZED,
        status.HTTP_403_FORBIDDEN,
    )


def test_stats_endpoint_invalid_api_key():
    """
    Test /stats endpoint without API key, should return 401 or 403
    """

    response = client.get("/stats", headers={"X-API-Key": "invalid_key"})
    assert response.status_code in (
        status.HTTP_401_UNAUTHORIZED,
        status.HTTP_403_FORBIDDEN,
    )


def test_stats_endpoint_response_types():
    """
    Test /stats endpoint with valid API key, should return 200 OK
    """

    api_key = os.getenv("ADMIN_API_KEY")

    if not api_key:
        pytest.skip("ADMIN_API_KEY not set in environment")
    response = client.get("/stats", headers={"X-API-Key": api_key})
    assert response.status_code == status.HTTP_200_OK

    data = response.json()
    assert isinstance(data["total_interactions"], int)
    assert isinstance(data["average_response_time"], (float, int))
    assert isinstance(data["error_rate"], (float, int))
    assert isinstance(data["category_distribution"], dict)
    assert isinstance(data["conversations"], list)
