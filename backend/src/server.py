from flask import Flask, request, send_from_directory, jsonify
from os import getenv
from mockcompiler import MockCompiler
from user_service import UserService
from file_service import FileService
from db import DB


app = Flask(__name__, static_folder="../build/static",
            template_folder="../build")

app.config['DB_PATH'] = "user_db.db"
app.config['SECRET_KEY'] = getenv('SECRET_KEY')
db = DB(app.config['DB_PATH'])
user_service = UserService(db, app.config['SECRET_KEY'])
file_service = FileService(db)


@app.route('/')
def main():
    return send_from_directory(directory=app.template_folder, path='index.html')


@app.route('/data')
def data():
    return {'status': 'OK'}


@app.route("/send/compiler", methods=["POST"])
def send_to_compiler():
    content = request.json
    print(data)
    errors = MockCompiler.compile2(content["code"], "Koodi")
    return jsonify(errors)


@app.route("/send/name", methods=["POST"])
def send_name():
    content = request.json
    print(data)
    return jsonify({
        'status': 'OK',
        'name': content['name']
    })



@app.route("/send/getfile", methods=["POST"])
def send_content():
    data = request.json
    return jsonify({
        'status': 'OK',
        'content': data['filename']
        })

@app.route("/login", methods=["POST"])
def login():
    content = request.json
    token = user_service.login(content["username"], content["password"])
    if token:
        return jsonify({
            "username": content["username"],
            "token": token
        })
    else:
        result = user_service.register(content["username"], content["password"])
        if result:
            token = user_service.login(content["username"], content["password"])
            if token:
                return jsonify({
                    "username": content["username"],
                    "token": token
                })
            else:
                return "Invalid Credentials", 400

        else:
            return "Username already taken", 400


@app.route("/files", methods=["POST"])
def get_user_files():
    content = request.json
    files = user_service.get_user_files(content['username'])
    id = user_service.verify_token(content['token'])
    if not id:
        return "Invalid Credentials", 400
    print(files)
    return jsonify(files)


@app.route("/file/save", methods=["POST"])
def save_file():
    content = request.json
    print(content)
    id = user_service.verify_token(content['token'])
    if id:
        result = file_service.save_file(
            content['filename'], content['textContent'], id)

    return jsonify({result: result})


# Running app
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
