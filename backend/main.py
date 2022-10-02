import json

import flask
import pyodbc
from flask import request


def get_connection_info(file_name):
    # Initial empty dictionary to store connection details
    connections = {}

    # Open config file to get connection info
    with open(file_name) as f:
        lines = f.readlines()
        for line in lines:
            # remove all white space (space, tab, new line)
            line = ''.join(line.split())

            # get connection info
            connection_param, connection_value = line.split(":")
            connections[connection_param] = connection_value
    return connections


connection_detail = get_connection_info("connection.config")

ip = connection_detail["ip"]
port = int(connection_detail["port"])
namespace = connection_detail["namespace"]
username = connection_detail["username"]
password = connection_detail["password"]
driver = "{InterSystems IRIS ODBC35}"

# Create connection to InterSystems IRIS
connection_string = 'DRIVER={};SERVER={};PORT={};DATABASE={};UID={};PWD={}' \
    .format(driver, ip, port, namespace, username, password)
connection = pyodbc.connect(connection_string)
connection.setdecoding(pyodbc.SQL_CHAR, encoding='utf-8')
connection.setencoding(encoding='utf-8')
cursor = connection.cursor()
print("Connected to InterSystems IRIS")

app = flask.Flask(__name__)


@app.route('/api/items/id', methods=['GET'])
def get_id():
    var = request.args.get("id")
    sql = f"SELECT * FROM Items WHERE ID='{var}'"
    cursor.execute(sql)
    rows = cursor.fetchall()
    rows_parsed = []
    for row in rows:
        rows_parsed.append({
            "id": row[0],
            "name": row[1],
            "quantity": row[2],
            "brand": row[3],
            "price": row[4]
        })
    return json.dumps(rows_parsed)


@app.route('/api/items/all', methods=['GET'])
def get_all():
    sql = "SELECT * FROM Items"
    cursor.execute(sql)
    rows = cursor.fetchall()
    rows_parsed = []
    for row in rows:
        rows_parsed.append({
            "id": row[0],
            "name": row[1],
            "quantity": row[2],
            "brand": row[3],
            "price": row[4]
        })
    return json.dumps(rows_parsed)


order = []


@app.route('/order', methods=['POST'])
def create_order():
    items = request.get_json()

    order.append(items)

    return json.dumps({
        id: 0
    })


@app.route('/order/<id>/join', methods=['POST'])
def get_order_join(id):
    items = request.get_json()

    order.append(items)

    return json.dumps({
        id: 0
    })


@app.route('/order/<id>/status', methods=['GET'])
def get_order_status(id):
    return json.dumps(len(order) >= 2)


@app.route('/', defaults={'u_path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return 'You want path: %s' % path


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
