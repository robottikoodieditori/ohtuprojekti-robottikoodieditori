import bcrypt
import credentials


class UserService:
    def __init__(self, db, secret):
        self.db = db
        self.secret_key = secret

    def register(self, username, password):
        pass_bytes = password.encode("utf-8")
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(pass_bytes, salt)
        query = 'INSERT INTO users (name, password) VALUES (?,?)'
        values = (username, hashed)
        result = self.db.insert_entry(query, values)
        if result == "OK":
            return True

        return False

    def login(self, username, password):
        result = self.check_credentials(username, password)

        if result:
            token = credentials.get_token(username, result, self.secret_key)
            return token

        return False

    def verify_token(self, token):
        result = credentials.decode_token(token, self.secret_key)
        if result['user_id']:
            return result['user_id']
        return False

    def check_credentials(self, username, password):
        db_entry = self.db.get_entry_from_db(
            "SELECT name, password, id FROM users WHERE name = ?", (username,))
        if not db_entry:
            return False
        hashed = db_entry[1]
        pass_bytes = password.encode("utf-8")
        result = bcrypt.checkpw(pass_bytes, hashed)
        return db_entry[2] if result else False
