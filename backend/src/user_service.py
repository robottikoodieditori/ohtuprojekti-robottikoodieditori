import bcrypt
import credentials


def register(username, password, db):
    bytes = password.encode("utf-8")
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(bytes, salt)
    query = 'INSERT INTO users (name, password) VALUES (?,?)'
    values = (username, hash)
    result = db.insert_entry(query, values)
    if result == "Success":
        return True
    else:
        return False

def login(username, password, db):
    result = check_credentials(username, password, db)
    
    if result:
        token = credentials.get_token(username, password)
        return token
    else:
        return False
    
def check_credentials(username, password, db):
    db_entry = db.get_entry_from_db("SELECT name, password FROM users WHERE name = ?", (username,))
    if not db_entry:
        return False
    hash = db_entry[1]
    bytes = password.encode("utf-8")
    result = bcrypt.checkpw(bytes, hash)
    return result