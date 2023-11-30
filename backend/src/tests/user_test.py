import unittest
from db import DB
from user_service import UserService
import sqlite3
import os
import bcrypt


class TestUser(unittest.TestCase):
    def setUp(self):
        try:
            os.remove("test_case_db.db")
        except:
            pass
        self.db = DB("test_case_db.db")
        con = sqlite3.connect("test_case_db.db")
        cur = con.cursor()
        cur.execute(
            """CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            name TEXT UNIQUE,
            password TEXT,
            role INTEGER DEFAULT 0
        )""")
        cur.execute(
            """CREATE TABLE logofiles (
            id INTEGER PRIMARY KEY,
            filename TEXT,
            content TEXT,
            created TIME,
            last_updated TIME,
            visible INTEGER DEFAULT 1,
            user_id INTEGER REFERENCES users
        )""")

        con.commit()
        self.user_service = UserService(self.db, 'mrsecret')

    def tearDown(self):
        os.remove("test_case_db.db")

    def test_register(self):
        result = self.user_service.register("Arska", "choppah")
        self.assertEqual(result, True)

    def test_login(self):
        self.user_service.register("Arska", "choppah")
        result = self.user_service.login("Arska", "choppah")
        self.assertTrue(result)

    def test_get_all_users(self):
        self.user_service.register("user", "pass")
        self.user_service.register("user1", "pass")
        self.user_service.register("user2", "pass")
        self.user_service.register("user3", "pass")
        self.user_service.login("user", "pass")

        expected_list = [
            {"name": "user"},
            {"name": "user1"},
            {"name": "user2"},
            {"name": "user3"},
        ]

        result = self.user_service.get_all_users()

        result_list = [
            {"name": row['name']}
            for row in result
        ]

        self.assertListEqual(expected_list, result_list)

    def test_change_user_password(self):
        self.user_service.register("Arnold", "password")
        self.user_service.register("Anrold", "password")
        
        user_list = self.user_service.get_all_users()
        old_password = user_list[1]["password"]
        self.user_service.change_password("2", "new_password")
        user_list = self.user_service.get_all_users()

        self.assertNotEqual(old_password, user_list[1]["password"])
    
    def test_verify_admin(self):
        admin_password = 'password'
        hashed_password = bcrypt.hashpw(admin_password.encode('utf-8'), bcrypt.gensalt())
        query = 'INSERT INTO users (name, password, role) VALUES (?, ?, ?)'
        values = ('admin', hashed_password, 1)
        self.db.insert_entry(query, values)
        token = self.user_service.login('admin', 'password')
        result = self.user_service.verify_admin(token["token"])
        self.assertTrue(result)
