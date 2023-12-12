import os
from sys import argv
from flask import Flask, request, send_from_directory, jsonify
from mockcompiler import MockCompiler
from user_service import UserService, fetch_token
from file_service import FileService, send_to_robot, remote_create_start_script
from db import DB
import json


app = Flask(__name__, static_folder="../build/static", template_folder="../build")

path = os.getcwd()
if path.endswith("src"):
    path = os.path.join(path, "..")

DB_PATH = os.getenv("DB_PATH")
if len(argv) > 1:
    if argv[1] == "test":
        DB_PATH = os.getenv("TEST_DB_PATH")

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["PASS_REQ"] = True

db = DB(os.path.join(path, DB_PATH))
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
    errors = MockCompiler.compile(content["code"], "Koodi")
    return jsonify(errors), 200


@app.route("/login", methods=["POST"])
def login():
    content = request.json
    if user_service.verify_user_existence(0, content["username"]):
        if not app.config["PASS_REQ"] and content["username"] != "admin":
            user_info = user_service.login_without_pass(content["username"])
            passreq = False
        else:
            user_info = user_service.login(content["username"], content["password"])
            passreq = True
        if user_info:
            return (
                jsonify(
                    {
                        "username": content["username"],
                        "token": user_info["token"],
                        "role": user_info["role"],
                        "passreq": passreq,
                    }
                ),
                200,
            )
        return "Invalid Credentials", 400

    if not app.config["PASS_REQ"]:
        result = user_service.register(content["username"], "")
    else:
        result = user_service.register(content["username"], content["password"])
    if result:
        user_info = user_service.login(content["username"], content["password"])
        passreq = True
        if user_info:
            return (
                jsonify(
                    {
                        "username": content["username"],
                        "token": user_info["token"],
                        "role": user_info["role"],
                        "passreq": passreq
                    }
                ),
                200,
            )


@app.route("/get_user_files", methods=["GET"])
def get_user_files():
    headers = request.headers
    token = fetch_token(headers)
    if not token:
        return "Token missing", 400
    user_id = user_service.verify_token(token)
    if not user_id:
        return "Invalid Credentials", 400
    

    result = file_service.get_user_files(user_id)
    return jsonify(result), 200

    
@app.route("/files/save", methods=["POST", "PUT"])
def file_save():
    headers = request.headers
    token = fetch_token(headers)
    if not token:
        return "Missing credentials", 400
    
    user_id = user_service.verify_token(token)
    if not user_id:
        return "Invalid credentials", 400
    
    content = request.json
    result = file_service.save_file(
        content["filename"], content["textContent"], user_id
    )
    return jsonify(result), 200

@app.route("/files/force_save", methods=["POST", "PUT"])
def force_save_file():
    headers = request.headers
    token = fetch_token(headers)
    if not token:
        return "Missing credentials", 400
    
    user_id = user_service.verify_token(token)
    if not user_id:
        return "Invalid credentials", 400
    if not user_service.verify_admin(token):
        return "User not admin", 403
    
    content = request.json
    result = file_service.save_file(
        content["filename"], content["textContent"], content["userId"]
    )

    return jsonify(result), 200


@app.route("/files/hide", methods=["PUT"])
def file_hide():
    headers = request.headers
    token = fetch_token(headers)
    if not token:
        return "Missing credentials", 400
    
    user_id = user_service.verify_token(token)
    if not user_id:
        return "Invalid credentials", 400
    
    content = request.json
    result = file_service.hide_logo_file(content["fileId"])
    return jsonify(result), 200

@app.route("/files/delete", methods=["DELETE"])
def delete_file():
    headers = request.headers
    token = fetch_token(headers)
    if not token:
        return "Missing credentials", 400
    
    user_id = user_service.verify_token(token)
    if not user_id:
        return "Invalid credentials", 400
    if not user_service.verify_admin(token):
        return "User not admin", 403
    
    content = request.json
    
    result = file_service.delete_logo_file(content["fileId"])
    return jsonify(result), 200


@app.route("/files/upload", methods=["POST"])
def upload_file():
    content_file = request.files["file"]
    content = json.loads(request.form.get("json_data"))
    if not content["token"]:
        return "Invalid Credentials", 400

    user_id = user_service.verify_token(content["token"])
    if not user_id:
        return

    file_content = content_file.read()
    decoded_file_content = file_content.decode()
    result = file_service.save_file(
        content_file.filename, decoded_file_content, content["user_id"]
    )
    result["content"] = decoded_file_content
    result["filename"] = content_file.filename
    return jsonify(result)


@app.route("/deploy/robot", methods=["POST"])
def deploy_to_robot():
    headers = request.headers
    token = fetch_token(headers)

    if not token:
        return "Missing credentials", 400
    
    if not user_service.verify_token(token):
        return "Invalid credentials", 400
    if not user_service.verify_admin(token):
        return "User not admin", 403
    
    content = request.json
    if not content.get("content", None):
        return "Content Missing", 400

    MockCompiler.compile(content["content"], "")
    return_code = send_to_robot()

    if return_code != 0:
        return "FAIL", 500
    success = remote_create_start_script()
    if not success:
        return "FAIL", 500
    return "OK", 200


@app.route("/admin/get_users", methods=["GET"])
def get_all_users():
    headers = request.headers
    token = fetch_token(headers)

    if not token:
        return "Missing token", 400
    if not user_service.verify_admin(token):
        return "User not admin", 403
    user_list = user_service.get_all_users()
    return user_list, 200


@app.route("/admin/get_files", methods=["GET"])
def get_all_files():
    headers = request.headers
    token = fetch_token(headers)

    if not token:
        return "Missing Credentials", 400
    if not user_service.verify_admin(token):
        return "User not admin", 403
    file_list = file_service.get_all_files()

    return jsonify(file_list), 200


@app.route("/config/password", methods=["POST"])
def toggle_password_required():
    content = request.json
    if user_service.verify_admin(content["token"]):
        app.config["PASS_REQ"] = not app.config["PASS_REQ"]
        return jsonify({"passReq": app.config["PASS_REQ"]}), 200
    else:
        return "Invalid Credentials", 400


@app.route("/config/get", methods=["GET"])
def get_password_required():
    return jsonify(app.config["PASS_REQ"]), 200


@app.route("/admin/change_password", methods=["PUT"])
def change_password():
    headers = request.headers
    token = fetch_token(headers)
    content = request.json

    if not token:
        return "Missing Credentials", 400
    if not user_service.verify_admin(token):
        return "User not admin", 403
    result = user_service.change_password(content["id"], content["password"])

    if result:
        return "OK", 200
    return "FAIL", 400


@app.route("/verify_token_authenticity", methods=["GET"])
def verify_token_authenticity():
    headers = request.headers
    token = fetch_token(headers)

    if not token:
        return "Missing Token", 400
    user_id = user_service.verify_token(token)

    if user_id:
        if user_service.verify_user_existence(user_id, None):
            return "OK", 200
    return "FAIL", 400


# Running app
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
