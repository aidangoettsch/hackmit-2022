import json
import flask
from flask import request

app = flask.Flask(__name__)

@app.route('/order', methods=['POST'])
def create_order():
    return json.dumps({
        id: 0
    })

@app.route('/order/<id>/status', methods=['GET'])
def get_order_status(id):

    return json.dumps({})

@app.route('/order/<id>/join', methods=['POST'])
def get_order_status(id):

    return json.dumps({})

@app.route('/order/suggest', methods=['GET'])
def suggest_order(id):

    return json.dumps({})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
