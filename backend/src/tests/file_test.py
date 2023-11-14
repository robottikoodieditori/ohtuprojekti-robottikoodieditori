import unittest
from db import DB
from user_service import UserService
from file_service import FileService
import sqlite3
import os


class TestFile(unittest.TestCase):
    def setUp(self):
        try:
            os.remove("test_db.db")
        except:
            pass
        self.database = DB("test_db.db")
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
            created TIME,
            last_updated TIME,
            user_id INTEGER REFERENCES users
        )''')

        con.commit()
        self.user_service = UserService(self.database, 'mrsecret')
        self.file_service = FileService(self.database)

        self.user_service.register("User", "Password")
        result = self.user_service.login("User", "Password")
        self.id = self.user_service.verify_token(result)

    def tearDown(self):
        os.remove("test_db.db")

    def test_save_file(self):
        self.file_service.save_file('file', 'lorem ipsum', self.id)
        result = self.file_service.get_user_files(self.id)
        expected_object = {
            'filename': 'file',
            'textContent': 'lorem ipsum',
            'name': 'User'
        }
        result_object = {
            'filename': result[0]['filename'],
            'textContent': result[0]['textContent'],
            'name': result[0]['name']
        }
        self.assertDictEqual(expected_object, result_object)

    def test_update_file_contents(self):
        self.file_service.save_file('file2', 'lorem ipsum', self.id)
        self.file_service.save_file('file2', 'lorem ipsum new', self.id)
        result = self.file_service.get_user_files(self.id)
        expected_object = {
            'filename': 'file2',
            'textContent': 'lorem ipsum new',
            'name': 'User'
        }
        result_object = {
            'filename': result[0]['filename'],
            'textContent': result[0]['textContent'],
            'name': result[0]['name']
        }
        self.assertDictEqual(expected_object, result_object)