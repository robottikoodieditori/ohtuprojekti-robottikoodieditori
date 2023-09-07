def test_simple_request(client):
    """client is a 'test client' created by conftest.py
    'The test client makes requests to the application without running a live server'
    see https://flask.palletsprojects.com/en/2.3.x/testing/
    """
    response = client.get("/data")
    assert b"Date" in response.data
