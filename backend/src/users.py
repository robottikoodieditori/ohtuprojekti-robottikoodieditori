from flask import session, request

class User():
  def __init__(self, name):
    self.create_token(name)
  
  def create_token(self, name):
    session["username"] = name
  
  def get_user():
    return session.get("username", 0)