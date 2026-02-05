from datetime import datetime, timedelta

def test_book_space(client):
    # Register & login user
    client.post("/auth/register", json={"name":"User","email":"user@example.com","password":"1234"})
    login = client.post("/auth/login", json={"email":"user@example.com","password":"1234"})
    token = login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Get a space
    spaces = client.get("/spaces/")
    space_id = spaces.json()[0]["id"]

    start_time = datetime.utcnow().isoformat()
    end_time = (datetime.utcnow() + timedelta(hours=2)).isoformat()

    response = client.post("/bookings/", json={
        "space_id": space_id,
        "start_time": start_time,
        "end_time": end_time
    }, headers=headers)

    assert response.status_code == 200
    assert response.json()["status"] == "CONFIRMED"