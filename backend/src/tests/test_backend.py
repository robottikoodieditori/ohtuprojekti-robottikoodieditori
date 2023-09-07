from test_backend import __version__


def test_version():
    assert __version__ == '0.1.0'


def test_simple_request(client):
    response = client.get("/data")
    assert b"Date" in response.data
