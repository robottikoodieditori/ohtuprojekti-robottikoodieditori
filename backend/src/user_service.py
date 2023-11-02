import bcrypt
import credentials


def register(username, password, data_base):
    pass_bytes = password.encode("utf-8")
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(pass_bytes, salt)
    query = 'INSERT INTO users (name, password) VALUES (?,?)'
    values = (username, hashed)
    result = data_base.insert_entry(query, values)
    if result == "OK":
        return True

    return False


def login(username, password, data_base):
    result = check_credentials(username, password, data_base)

    if result:
        token = credentials.get_token(username, password)
        return token

    return False


def check_credentials(username, password, data_base):
    db_entry = data_base.get_entry_from_db(
        "SELECT name, password FROM users WHERE name = ?", (username,))
    if not db_entry:
        return False
    hashed = db_entry[1]
    pass_bytes = password.encode("utf-8")
    result = bcrypt.checkpw(pass_bytes, hashed)
    return result
