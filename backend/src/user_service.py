from typing import Union
import bcrypt
import credentials

class UserService:
    '''
    Class for handling user registration and credentials verification.

    args:
        db (obj): an object for handling communications with the database
        secret (str): the secret key for creating session tokens and other cookies
    '''
    def __init__(self, database: object, secret: str):
        self.database = database
        self.secret_key = secret

    def register(self, username: str, password: str) -> bool:
        '''
        Method which handles user registration. Fails if username not unique.

        args:
            username (str)
            password (str)
        returns:
            bool: True if registration succesful False otherwise
        '''
        pass_bytes = password.encode("utf-8")
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(pass_bytes, salt)
        query = 'INSERT INTO users (name, password) VALUES (?,?)'
        values = (username, hashed)
        result = self.database.insert_entry(query, values)
        if result == "OK":
            return True

        return False

    def login(self, username: str, password: str) -> Union[dict, bool]:
        '''
        Method which verifies given username and password with database user contents.
        Forms a cookie token for later user verification if credentials match with database contents

        args:
            username (str)
            password (str)
        returns:
            token (dict): returns a decoded token if user verification is succesful
            bool: False otherwise
        '''
        result = self.check_credentials(username, password)

        if result:
            token = credentials.get_token(username, result, self.secret_key)
            return token

        return False

    def verify_token(self, token: str) -> Union[int, bool]:
        '''
        Method which verifies an user given token's legitimacy

        args:
            token (str): user given token
        returns:
            user_id (int): user's personal id if succesful
            bool: False otherwise 
        '''
        result = credentials.decode_token(token, self.secret_key)
        if result['user_id']:
            return result['user_id']
        return False

    def check_credentials(self, username: str, password: str) -> Union[int, bool]:
        '''
        Method which compares user given credentials with existing credentials in database

        args:
            username (str)
            password (str)
        returns:
            user_id (int): user's personal id if succesful
            bool: False otherwise
        '''
        db_entry = self.database.get_entry_from_db(
            "SELECT name, password, id FROM users WHERE name = ?", (username,))
        if not db_entry:
            return False
        hashed = db_entry[1]
        pass_bytes = password.encode("utf-8")
        result = bcrypt.checkpw(pass_bytes, hashed)
        return db_entry[2] if result else False
