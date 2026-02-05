def test_admin_create_user(client):
    # Setup admin
    client.post("/auth/register", json={"name":"Admin","email":"admin2@example.com","password":"1234"})
    login = client.post("/auth/login", json={"email":"admin2@example.com","password":"1234"})
    token = login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Try to create user (fail because role not admin)
    response = client.post("/users/", json={
        "name": "User2",
        "email": "user2@example.com",
        "password": "1234",
        "role": "CLIENT"
    }, headers=headers)
    assert response.status_code == 403