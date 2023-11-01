import bcrypt
import credentials


def register(username, password):
    bytes = password.encode("utf-8")
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(bytes, salt)
    print(hash)

def login(username, password):
    result = check_credentials(username, password)
    
    if result:
        token = credentials.get_token(username, password)
        return token
    else:
        return False
    
def check_credentials(username, password):
    bytes = password.encode("utf-8")
    result = bcrypt.checkpw(bytes, hash)
    return result