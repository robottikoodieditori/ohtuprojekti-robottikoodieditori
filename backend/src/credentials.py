import jwt

def get_token(username, password):
    encoded_jwt = jwt.encode({username, password}, "mrsecret", algorithm="HS256")
    return encoded_jwt

def decode_token(token):
    credentials = jwt.decode(token, "mrsecret", algorithms=["HS256"])
    return credentials
