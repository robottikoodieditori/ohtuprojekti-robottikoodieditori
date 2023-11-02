import jwt


def get_token(username, user_id):
    encoded_jwt = jwt.encode({"username": username, "user_id": user_id}, "mrsecret",
                             algorithm="HS256")
    return encoded_jwt


def decode_token(token):
    credentials = jwt.decode(token, "mrsecret", algorithms=["HS256"])
    return credentials
