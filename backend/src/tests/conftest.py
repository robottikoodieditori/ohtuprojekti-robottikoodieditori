import pytest
from src.server import app


@pytest.fixture()
def app_():
    app_ = app

    app_.config.update({
        "TESTING": True
    })

    yield app_


@pytest.fixture()
def client(app_):
    return app_.test_client()
