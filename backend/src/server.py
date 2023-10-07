# pylint: skip-file

# Import flask and datetime module for showing date and time
import datetime
import json
from flask import Flask, request, render_template
from random import randint



from uselogomotion import main as uselogomotion

x = datetime.datetime.now().strftime("%H:%M:%S")

# Initializing flask app
app = Flask(__name__, static_folder='../build/static', template_folder='../build')


# Route for seeing a data
@app.route('/data')
def get_time():

    # Returning an api for showing in  reactjs
    return {
        "Date": x,
    }


@app.route('/send/compiler', methods=['POST'])
def send_to_compiler():
    data = request.data 
    data = data.decode('UTF-8').replace("'", '"')
    data = json.loads(data)
    #print(data['data'])
    #print(f"{data['data']}, | {str(data['data'])}")
    print(data)
    #uselogomotion(data['data'], f'{str(randint(1, 5000))}')
    return data

@app.route('/')
def index():
    return render_template('index.html')


# Running app
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
