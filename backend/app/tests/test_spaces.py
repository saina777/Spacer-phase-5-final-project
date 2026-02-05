from app.core.security import hash_password
from app.database.models import User

def test_create_and_list_space(client):
    # Setup admin user
    admin = {"name": "Admin", "email": "admin@example.com", "password": "1234", "role": "ADMIN"}
    client.post("/auth/register", json=admin)
    login = client.post("/auth/login", json={"email": admin["email"], "password": admin["password"]})
    token = login.json()["access_token"]

    # Create space
    headers = {"Authorization": f"Bearer {token}"}
    response = client.post("/spaces/", json={
        "title": "Test Space",
        "description": "Nice space",
        "location": "City",
        "price_per_hour": 100,
        "price_per_day": 500
    }, headers=headers)
    assert response.status_code == 200
    assert response.json()["title"] == "Test Space"

    # Public list
    response = client.get("/spaces/")
    assert response.status_code == 200
    assert len(response.json()) > 0