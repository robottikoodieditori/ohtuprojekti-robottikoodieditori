import bcrypt
import credentials


class UserService:
    def __init__(self, db, SECRET):
        self.db = db
        self.secret_key = SECRET

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

    def get_user_files(self, username, password):
        if not self.check_credentials(username, password):
            return 'FAIL'
        query = 'SELECT l.filename, l.content, u.name FROM logofiles l, users u WHERE u.name=? AND l.user_id=u.id'
        file_list = self.db.get_list_from_db(query, (username,))
        file_list = [{'filename': row[0], 'textContent': row[1],
                      'name': row[2]} for row in file_list]
        return file_list
    
    def get_all_users(self):
        try:
            query = 'SELECT id, name FROM users'
            users = self.db.get_list_from_db(query, ())
            return [{'id': user[0], 'name': user[1]} for user in users]
        except Exception as e:
            print(f"An error occurred: {e}")
            return 'FAIL'

