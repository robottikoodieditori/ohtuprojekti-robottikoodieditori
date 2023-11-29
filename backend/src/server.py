from os import getenv
from sys import argv
from flask import Flask, request, send_from_directory, jsonify
from mockcompiler import MockCompiler
from user_service import UserService
from file_service import FileService, send_to_robot, remote_create_start_script
from db import DB
import json


app = Flask(__name__, static_folder="../build/static", template_folder="../build")

DB_PATH = getenv("DB_PATH")
if len(argv) > 1:
    if argv[1] == "test":
        DB_PATH = getenv("TEST_DB_PATH")

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
    errors = MockCompiler.compile2(content["code"], "Koodi")
    return jsonify(errors), 200


@app.route("/login", methods=["POST"])
def login():
    content = request.json
    user_info = user_service.login(content["username"], content["password"])
    if user_info:
        return jsonify({"username": content["username"], "token": user_info["token"], "role": user_info["role"]}), 200

    result = user_service.register(content["username"], content["password"])
    if result:
        user_info = user_service.login(content["username"], content["password"])
        if user_info:
            return jsonify({"username": content["username"], "token": user_info["token"], "role": user_info["role"]}), 200

        return "Invalid Credentials", 400

    return "Username already taken", 400

@app.route("/get_user_files", methods=["POST"])
def get_user_files():
    content = request.json
    user_id = user_service.verify_token(content["token"])
    if user_id:
        result = file_service.get_user_files(user_id)
        return jsonify(result), 200
    return "Invalid Credentials", 400

@app.route("/file_service", methods=["POST"])
def handle_file_request():
    content = request.json
    if not content.get("token", None):
        return "Invalid Credentials", 400
    user_id = user_service.verify_token(content["token"])
    if user_id:
        if content['action'] == 'save':
            result = file_service.save_file(
                content["filename"], content["textContent"], user_id
            )
            return jsonify(result), 200
        elif content['action'] == 'hide':
            result = file_service.hide_logo_file(content['fileId'])
            return jsonify(result), 200

        elif content['action'] == 'admin-delete':
            result = file_service.delete_logo_file(content["fileId"])
            return jsonify(result)
            pass

        elif content['action'] == 'admin-save':
            result = file_service.save_file(
                content["filename"], content["textContent"], content["userId"]
            )
            return jsonify(result)
    return "Invalid Credentials", 400

@app.route("/upload", methods=["POST"])
def upload_file():
    content_file = request.files['file']
    content = json.loads(request.form.get('json_data'))
    if not content['token']:
        return "Invalid Credentials", 400

    user_id = user_service.verify_token(content["token"])
    if user_id:
        file_content = content_file.read()
        decoded_file_content = file_content.decode()
        result = file_service.save_file(
            content_file.filename, decoded_file_content, content['user_id']
        )
        result['content'] = decoded_file_content
        result['filename'] = content_file.filename
        return jsonify(result)

@app.route("/deploy/robot", methods=["POST"])
def deploy_to_robot():
    content = request.json

    if not content.get("token", None):
        return "Invalid Credentials", 400

    user_id = user_service.verify_token(content["token"])
    if not user_id:
        return "Invalid Credentials", 400
    
    if not content.get("content", None):
        return "Content Missing", 400
    
    MockCompiler.compile2(content['content'], '')
    return_code = send_to_robot()

    if return_code != 0:
        return "FAIL", 500
    success = remote_create_start_script()
    if not success:
        return "FAIL", 500
    return "OK", 200

@app.route("/admin/get_users", methods=["POST"])
def get_all_users():
    content = request.json

    if not content.get("token", None):
        return "Missing Credentials", 400
    if not user_service.verify_admin(content["token"]):
        return "User not admin", 403
    user_list = user_service.get_all_users()
    return user_list

@app.route("/admin/get_files", methods=["POST"])
def get_all_files():
    content = request.json

    if not content.get("token", None):
        return "Missing Credentials", 400
    if not user_service.verify_admin(content["token"]):
        return "User not admin", 403
    file_list = file_service.get_all_files()

    return jsonify(file_list), 200

@app.route("/admin/change_password", methods=["POST"])
def change_password():
    content = request.json

    if not content.get("token", None):
        return "Missing Credentials", 400
    if not user_service.verify_admin(content["token"]):
        return "User not admin", 403
    result = user_service.change_password(content["id"], content["password"])

    if result:
        return "OK", 200
    return "FAIL", 400

# Running app
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
