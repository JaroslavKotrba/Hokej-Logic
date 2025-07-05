# TEST

# pytest --disable-warnings
# pytest tests/test_health.py -v --disable-warnings

from starlette import status
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["version"] == "1.0.1"
    assert response.json()["status"] == "healthy"
