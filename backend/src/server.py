# pylint: skip-file
from flask import Flask, request, send_from_directory, jsonify
from mockcompiler import MockCompiler
from users import User
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
    data = request.json
    print(data)
    errors = MockCompiler.compile2(data["code"], "Koodi")
    return jsonify(errors)


@app.route("/send/name", methods=["POST"])
def send_name():
    data = request.json
    print(data)
    return jsonify({
        'status': 'OK',
        'name': data['name']
    })


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    token = user_service.login(data["name"], data["password"], db)
    if token:
        return jsonify({
            "name": data["name"],
            "token": token
        })
    else:
        return "Invalid Credentials", 400


@app.route("/register", methods=["POST"])
def register():
    data = request.json
    result = user_service.register(data["name"], data["password"], db)
    if result:
        return {"status": "OK"}
    else:
        return "Username already taken", 400


@app.route('/asd')
def juuh():
    data = 'INSERT INTO users (name, password) VALUES (?,?)'
    values = ('Nimi', 'Salis')
    result = db.insert_entry(data, values)
    return f'asd {result}'


@app.route('/asd1')
def jaah():
    query = 'SELECT * FROM users'
    result = db.get_list_from_db(query)
    return str(len(result))

@app.route("/secretroute")
def delet():
    db.delete_from_db()
    return {"status": "OK"}


# Running app
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
