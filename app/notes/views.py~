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

app = Blueprint('notes', __name__, url_prefix='/')

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

@app.route("/")
def show_notes():
    return render_template('base.html')

