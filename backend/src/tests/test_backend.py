def test_simple_request(client):
    response = client.get("/data")
    assert b"Date" in response.data
