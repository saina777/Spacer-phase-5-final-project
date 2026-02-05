def test_payment(client):
    # Login user
    login = client.post("/auth/login", json={"email":"user@example.com","password":"1234"})
    token = login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Get booking
    bookings = client.get("/bookings/me", headers=headers)
    booking_id = bookings.json()[0]["id"]

    response = client.post("/payments/", json={
        "booking_id": booking_id,
        "payment_method": "CARD"
    }, headers=headers)

    assert response.status_code == 200
    assert response.json()["status"] == "PAID"