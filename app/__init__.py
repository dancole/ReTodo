import argparse
import json
import os

from flask import Flask, render_template
import rethinkdb as r
from rethinkdb.errors import RqlRuntimeError, RqlDriverError

app = Flask(__name__)
app.config.from_object('config')

@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

# Located in the api folder
from app.api.views import app as apiModule
app.register_blueprint(apiModule)

# Located in the notes folder
from app.notes.views import app as notesModule
app.register_blueprint(notesModule)
