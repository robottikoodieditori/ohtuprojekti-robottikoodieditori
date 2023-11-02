import unittest
from db import DB
import user_service
import sqlite3
import os

class TestUser(unittest.TestCase):
    def setUp(self):
        try:
            os.remove("test_db.db")
        except:
            pass
        self.db = DB("test_db.db")
        con = sqlite3.connect("test_db.db")
        cur = con.cursor()
        cur.execute('''CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            name TEXT UNIQUE,
            password TEXT
        )''')
        cur.execute('''CREATE TABLE logofiles (
            id INTEGER PRIMARY KEY,
            filename TEXT,
            content TEXT,
            user_id INTEGER REFERENCES users
        )''')
        
        con.commit()
    
    def tearDown(self):
        os.remove("test_db.db")

    def test_register(self):
        result = user_service.register("Arska", "choppah", self.db)
        self.assertEqual(result, True)

    def test_login(self):
        user_service.register("Arska", "choppah", self.db)
        result = user_service.login("Arska", "choppah", self.db)
        self.assertTrue(result)