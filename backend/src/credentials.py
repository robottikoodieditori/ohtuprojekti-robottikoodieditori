import jwt


def get_token(username, user_id, secret_key):
    encoded_jwt = jwt.encode({"username": username, "user_id": user_id}, secret_key,
                             algorithm="HS256")
    return encoded_jwt


def decode_token(token, secret_key):
    credentials = jwt.decode(token, "mrsecret", algorithms=["HS256"])
    return credentials
