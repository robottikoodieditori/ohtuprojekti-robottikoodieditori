import unittest
from db import DB
from user_service import UserService
from file_service import FileService
import sqlite3
import os


class TestFile(unittest.TestCase):
    def setUp(self):
        try:
            os.remove("test_case_db.db")
        except:
            pass
        self.database = DB("test_case_db.db")
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
        )"""
        )

        con.commit()
        self.user_service = UserService(self.database, "mrsecret")
        self.file_service = FileService(self.database)

        self.user_service.register("User", "Password")
        result = self.user_service.login("User", "Password")
        self.id = self.user_service.verify_token(result["token"])

    def tearDown(self):
        os.remove("test_case_db.db")

    def test_save_file(self):
        self.file_service.save_file("file", "lorem ipsum", self.id)
        result = self.file_service.get_user_files(self.id)
        expected_object = {
            "filename": "file",
            "textContent": "lorem ipsum",
            "name": "User",
        }
        result_object = {
            "filename": result[0]["filename"],
            "textContent": result[0]["textContent"],
            "name": result[0]["name"],
        }
        self.assertDictEqual(expected_object, result_object)

    def test_update_file_contents(self):
        self.file_service.save_file("file2", "lorem ipsum", self.id)
        self.file_service.save_file("file2", "lorem ipsum new", self.id)
        result = self.file_service.get_user_files(self.id)
        expected_object = {
            "filename": "file2",
            "textContent": "lorem ipsum new",
            "name": "User",
        }
        result_object = {
            "filename": result[0]["filename"],
            "textContent": result[0]["textContent"],
            "name": result[0]["name"],
        }
        self.assertDictEqual(expected_object, result_object)

    def test_hide_file(self):
        self.file_service.save_file("file to hide", "bad code", self.id)
        result = self.file_service.get_user_files(self.id)

        expected_object = {
            "filename": "file to hide",
            "textContent": "bad code",
            "name": "User",
        }
        result_object = {
            "filename": result[0]["filename"],
            "textContent": result[0]["textContent"],
            "name": result[0]["name"],
        }

        # assert file is returned while <visible> has not been changed
        self.assertDictEqual(expected_object, result_object)

        file_id = result[0]["file_id"]
        self.file_service.hide_logo_file(file_id)

        result = self.file_service.get_user_files(self.id)

        # assert file list is empty
        self.assertEqual([], result)

    def test_unhide_file(self):
        self.file_service.save_file(
            "Hide this!", "Uninteresting Code", self.id)
        result = self.file_service.get_user_files(self.id)
        expected_object = {
            "filename": "Hide this!",
            "textContent": "Uninteresting Code",
            "name": "User",
        }
        result_object = {
            "filename": result[0]["filename"],
            "textContent": result[0]["textContent"],
            "name": result[0]["name"],
        }
        self.assertDictEqual(expected_object, result_object)
        file_id = result[0]["file_id"]
        self.file_service.hide_logo_file(file_id)
        result = self.file_service.get_user_files(self.id)

        self.assertEqual([], result)

        self.file_service.hide_logo_file(file_id)
        result = self.file_service.get_user_files(self.id)
        result_object = {
            "filename": result[0]["filename"],
            "textContent": result[0]["textContent"],
            "name": result[0]["name"],
        }
        self.assertDictEqual(expected_object, result_object)

    def test_get_all_files(self):
        self.file_service.save_file('file1', 'blob', self.id)
        self.file_service.save_file('file2', 'bloba', self.id)
        self.file_service.save_file('file3', 'blob', self.id)
        result = self.file_service.get_all_files()

        result_list = [
            {
                "filename": row["filename"],
                "textContent": row["textContent"],
                "user_id": row["user_id"],
                "username": row["username"]
            }
            for row in result
        ]

        expected_list = [
            {
                "filename": "file1",
                "textContent": "blob",
                "user_id": self.id,
                "username": "User"
            },
            {
                "filename": "file2",
                "textContent": "bloba",
                "user_id": self.id,
                "username": "User"
            },
            {
                "filename": "file3",
                "textContent": "blob",
                "user_id": self.id,
                "username": "User"
            },
        ]

        self.assertListEqual(expected_list, result_list)
