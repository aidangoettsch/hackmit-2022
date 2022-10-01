import json

import flask
import irisnative
import pyodbc


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
print("Connected to InterSystems IRIS")

app = flask.Flask(__name__)


@app.route('/')
def hello_world():
    cursor = connection.cursor()
    sql = "SELECT * FROM Persons"
    cursor.execute(sql)
    row = cursor.fetchone()
    row_parsed = [item for item in row]
    return json.dumps(row_parsed)


if __name__ == '__main__':
    app.run(port=5000, debug=True)
