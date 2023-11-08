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
            created TIME,
            last_updated TIME,
            user_id INTEGER REFERENCES users
        )''')

        con.commit()
        self.user_service = UserService(self.db, 'mrsecret')
        self.file_service = FileService(self.db)

    def tearDown(self):
        os.remove("test_db.db")

    def test_save_file(self):

        self.user_service.register("User", "Password")
        result = self.user_service.login("User", "Password")
        id = self.user_service.verify_token(result)
        self.file_service.save_file('file', 'lorem ipsum', id)
        result = self.file_service.get_user_files(id)
        expected_list = [{'filename': 'file',
                          'textContent': 'lorem ipsum',
                          'name': 'User'}]
        self.assertEqual(expected_list['filename'], result['filename'])
        self.assertEqual(expected_list['textContent'], result['textContent'])
        self.assertEqual(expected_list['name'], result['name'])


