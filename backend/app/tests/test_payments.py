from fastapi.testclient import TestClient

def test_payment_success(client: TestClient):
    login = client.post("/auth/login", json={"email": "user@example.com", "password": "1234"})
    token = login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    bookings = client.get("/bookings/me", headers=headers)
    booking_id = bookings.json()[0]["id"]

    response = client.post("/payments/", json={
        "booking_id": booking_id,
        "payment_method": "CARD"
    }, headers=headers)

    assert response.status_code == 200
    assert response.json()["status"] == "PAID"
    assert "invoice_number" in response.json()

def test_payment_booking_not_found(client: TestClient):
    login = client.post("/auth/login", json={"email": "user@example.com", "password": "1234"})
    token = login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    response = client.post("/payments/", json={
        "booking_id": 9999,
        "payment_method": "CARD"
    }, headers=headers)

    assert response.status_code == 404
    assert "Booking not found" in response.json()["detail"]

def test_payment_already_paid(client: TestClient):
    login = client.post("/auth/login", json={"email": "user@example.com", "password": "1234"})
    token = login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    bookings = client.get("/bookings/me", headers=headers)
    booking_id = bookings.json()[0]["id"]

    client.post("/payments/", json={"booking_id": booking_id, "payment_method": "CARD"}, headers=headers)

    response = client.post("/payments/", json={"booking_id": booking_id, "payment_method": "CARD"}, headers=headers)

    assert response.status_code == 400
    assert "Booking already paid" in response.json()["detail"]