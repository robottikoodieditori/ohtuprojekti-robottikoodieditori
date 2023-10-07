from server import app
import os
import pytest
import sys

CURR_DIR = os.path.dirname(__file__)
sys.path.append(os.path.join(CURR_DIR, ".."))


@pytest.fixture()
def app_():
    app_ = app

    app_.config.update({"TESTING": True})

    yield app_


@pytest.fixture()
def client(app_):
    return app_.test_client()
