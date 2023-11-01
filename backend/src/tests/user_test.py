import unittest
from db import DB
import user_service

class TestUser(unittest.TestCase):
    def setUp(self):
        self.db = DB("test_db.db")
        self.db.delete_from_db()
        

    def test_register(self):
        result = user_service.register("Arska", "choppah", self.db)
        self.assertEqual(result, True)

    def test_login(self):
        user_service.register("Arska", "choppah", self.db)
        result = user_service.login("Arska", "choppah", self.db)
        self.assertTrue(result)