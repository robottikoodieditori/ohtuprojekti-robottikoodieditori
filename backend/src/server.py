from flask import Flask, request, send_from_directory, jsonify
from mockcompiler import MockCompiler
import user_service
from db import DB


app = Flask(__name__, static_folder="../build/static",
            template_folder="../build")
app.secret_key = "123"
app.config['DB_PATH'] = "user_db.db"
db = DB(app.config['DB_PATH'])


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


@app.route("/login", methods=["POST"])
def login():
    content = request.json
    token = user_service.login(content["name"], content["password"], db)
    if token:
        return jsonify({
            "name": content["name"],
            "token": token
        })
    else:
        return "Invalid Credentials", 400


@app.route("/register", methods=["POST"])
def register():
    content = request.json
    result = user_service.register(content["name"], content["password"], db)
    if result:
        return {"status": "OK"}
    else:
        return "Username already taken", 400

# Running app
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
