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


@app.route('/api/all_category_names', methods=['GET'])
def get_all_category_names():
    sql = f"SELECT DISTINCT Category FROM Items"
    cursor.execute(sql)
    rows = cursor.fetchall()
    categories = []
    for row in rows:
        categories.append(row[0])
    return json.dumps(categories)


@app.route('/api/category', methods=['GET'])
def get_category():
    key = request.args.get('key')
    view = request.args.get('view', default=-1, type=int)
    sql = f"SELECT * FROM Items WHERE Category = '{key}'"
    cursor.execute(sql)
    rows = []
    if view == -1:
        rows = cursor.fetchall()
    else:
        rows = cursor.fetchmany(view)
    processed_rows = []
    for row in rows:
        processed_rows.append({
            "id": row[0],
            "name": row[1],
            "productId": row[2],
            "brandId": row[3],
            "brandName": row[4],
            "size": row[5],
            "imageUrl": row[6],
            "priceString": row[7],
            "category": row[8],
            "sustainable": row[9]
        })
    return json.dumps(processed_rows)


@app.route('/api/search', methods=['GET'])
def get_search():
    key = request.args.get('key')
    view = request.args.get('view', default=-1, type=int)
    sql = f"SELECT * FROM Items WHERE Name LIKE '%{key}%'"
    print(sql)
    cursor.execute(sql)
    rows = []
    if view == -1:
        rows = cursor.fetchall()
    else:
        rows = cursor.fetchmany(view)
    processed_rows = []
    for row in rows:
        processed_rows.append({
            "id": row[0],
            "name": row[1],
            "productId": row[2],
            "brandId": row[3],
            "brandName": row[4],
            "size": row[5],
            "imageUrl": row[6],
            "priceString": row[7],
            "category": row[8],
            "sustainable": row[9]
        })
    return json.dumps(processed_rows)


orders = []


@app.route('/api/orders', methods=['GET'])
def get_orders():
    return json.dumps([{'time': order['time'], 'count': order['count']} for order in orders])


@app.route('/api/orders', methods=['POST'])
def post_orders():
    data = request.get_json()
    time = data['time']
    items = data['items']

    for i in range(len(orders)):
        if orders[i]['time'] == time:
            orders[i]['items'].append(items)
            orders[i]['count'] += 1
            break
    else:
        orders.append({
            'time': time,
            'items': [items],
            'count': 1
        })
    return json.dumps("success")


@app.route('/', defaults={'u_path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return 'You pinged path: %s' % path


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
