import argparse
import json
import os

from flask import Flask, g, jsonify, Blueprint, render_template, request, abort

import rethinkdb as r
from rethinkdb.errors import RqlRuntimeError, RqlDriverError

# RethinkDB server.
RDB_HOST =  os.environ.get('RDB_HOST') or 'localhost'
RDB_PORT = os.environ.get('RDB_PORT') or 28015
APP_DB = 'notes'
APP_TABLE = 'notes'

app = Blueprint('api', __name__, url_prefix='/api')

#### Managing connections

# The pattern we're using for managing database connections is to have **a connection per request**. 
# We're using Flask's `@app.before_request` and `@app.teardown_request` for 
# [opening a database connection](http://www.rethinkdb.com/api/#py:accessing_rql-connect) and 
# [closing it](http://www.rethinkdb.com/api/#py:accessing_rql-close) respectively.
@app.before_request
def before_request():
    try:
        g.rdb_conn = r.connect(host=RDB_HOST, port=RDB_PORT, db=APP_DB)
    except RqlDriverError:
        abort(503, "No database connection could be established.")

@app.teardown_request
def teardown_request(exception):
    try:
        g.rdb_conn.close()
    except AttributeError:
        pass

@app.route("/notes", methods=['GET'])
def get_todos():
    selection = list(r.table(APP_TABLE).run(g.rdb_conn))
    return json.dumps(selection)

@app.route("/notes", methods=['POST'])
def new_todo():
    inserted = r.table(APP_TABLE).insert(request.json).run(g.rdb_conn)
    return jsonify(id=inserted['generated_keys'][0])

@app.route("/notes/<string:todo_id>", methods=['GET'])
def get_todo(todo_id):
    todo = r.table(APP_TABLE).get(todo_id).run(g.rdb_conn)
    return json.dumps(todo)

@app.route("/notes/<string:todo_id>", methods=['PUT'])
def update_todo(todo_id):
    return jsonify(r.table(APP_TABLE).get(todo_id).replace(request.json).run(g.rdb_conn))

@app.route("/notes/<string:todo_id>", methods=['PATCH'])
def patch_todo(todo_id):
    return jsonify(r.table(APP_TABLE).get(todo_id).update(request.json).run(g.rdb_conn))

@app.route("/notes/<string:todo_id>", methods=['DELETE'])
def delete_todo(todo_id):
    return jsonify(r.table(APP_TABLE).get(todo_id).delete().run(g.rdb_conn))

