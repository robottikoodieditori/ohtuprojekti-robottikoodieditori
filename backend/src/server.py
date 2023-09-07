# Import flask and datetime module for showing date and time
import datetime
from flask import Flask

x = datetime.datetime.now().strftime("%H:%M:%S")

# Initializing flask app
app = Flask(__name__)


# Route for seeing a data
@app.route('/data')
def get_time():

    # Returning an api for showing in  reactjs
    return {
        "Date": x,
    }


# Running app
if __name__ == '__main__':
    app.run(debug=True)
