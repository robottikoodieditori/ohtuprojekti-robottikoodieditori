'''Module which handles token encoding and decoding'''

from typing import Union
import jwt


def get_token(username: str, user_id: str, secret_key: str) -> str:
    '''
    Function which forms a personal token for given username and user id

    args:
        username (str)
        user_id (int)
        secret_key (str): a key used for encoding
    returns:
        encoded_jwt (str): token in encoded form
    '''
    encoded_jwt = jwt.encode({"username": username, "user_id": user_id}, secret_key,
                             algorithm="HS256")
    return encoded_jwt


def decode_token(token: str, secret_key: str) -> Union[dict, bool]:
    '''
    Function for decoding tokens into dict objects

    args:
        token (str): encoded token
        secret_key (str): a key used for decoding
    returns:
        credentials (dict): a dict-object which houses the contents of the token
        bool: False if failure
    '''
    try:
        credentials = jwt.decode(token, secret_key, algorithms=["HS256"])
    except jwt.exceptions.InvalidSignatureError:
        return False
    return credentials
