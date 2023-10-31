# pylint: skip-file

# Import flask and datetime module for showing date and time
import json
from flask import Flask, request, send_from_directory
from mockcompiler import MockCompiler
from users import User


# Initializing flask app
app = Flask(__name__, static_folder="../build/static", template_folder="../build")
app.secret_key = "123"

# Route for seeing a data


@app.route("/data")
def get_time():
    # Returning an api for showing in  reactjs
    return {"Date": ""}

@app.route('/')
def main():
    return send_from_directory(directory=app.template_folder, path='index.html')


@app.route("/send/compiler", methods=["POST"])
def send_to_compiler():
    data = request.data
    data = data.decode("UTF-8").replace("'", '"')
    data = json.loads(data)
    errors = MockCompiler.compile2(data["data"], "Koodi")
    # print(errors)
    return errors


@app.route("/send/name", methods=["POST"])
def send_name():
    data = request.data
    data = data.decode()
    data = json.loads(data)
    User(data["name"])
    return User.get_user()


# Running app
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
