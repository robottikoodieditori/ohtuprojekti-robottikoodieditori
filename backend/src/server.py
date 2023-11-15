from os import getenv
from sys import argv
from flask import Flask, request, send_from_directory, jsonify
from mockcompiler import MockCompiler
from user_service import UserService
from file_service import FileService
from db import DB


app = Flask(__name__, static_folder="../build/static", template_folder="../build")

DB_PATH = getenv('DB_PATH')
if len(argv) > 1:
    if argv[1] == 'test':
        DB_PATH = getenv('TEST_DB_PATH')

app.config["SECRET_KEY"] = getenv("SECRET_KEY")

db = DB(DB_PATH)
user_service = UserService(db, app.config["SECRET_KEY"])
file_service = FileService(db)


@app.route("/")
def main():
    return send_from_directory(directory=app.template_folder, path="index.html")


@app.route("/data")
def data():
    return {"status": "OK"}


@app.route("/send/compiler", methods=["POST"])
def send_to_compiler():
    content = request.json
    print(data)
    errors = MockCompiler.compile2(content["code"], "Koodi")
    return jsonify(errors)


@app.route("/login", methods=["POST"])
def login():
    content = request.json
    token = user_service.login(content["username"], content["password"])
    if token:
        return jsonify({"username": content["username"], "token": token})

    result = user_service.register(content["username"], content["password"])
    if result:
        token = user_service.login(content["username"], content["password"])
        if token:
            return jsonify({"username": content["username"], "token": token})

        return "Invalid Credentials", 400

    return "Username already taken", 400


@app.route("/files", methods=["POST"])
def get_user_files():
    content = request.json
    user_id = user_service.verify_token(content["token"])
    if user_id:
        result = file_service.get_user_files(user_id)
        return jsonify(result)
    return "Invalid Credentials", 400


@app.route("/file", methods=["POST"])
def save_file():
    content = request.json
    if not content.get('token', None):
        return "Invalid Credentials", 400
    user_id = user_service.verify_token(content["token"])
    if user_id:
        if content['action'] == 'save':
            result = file_service.save_file(
                content["filename"], content["textContent"], user_id
            )
            return jsonify(result)
        elif content['action'] == 'hide':
            # logic to hide
            pass
        elif content['action'] == 'delete':
            # logic to delete
            pass

    return "Invalid Credentials", 400


# Running app
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)