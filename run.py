import argparse
import json
import os

import rethinkdb as r
from rethinkdb.errors import RqlRuntimeError, RqlDriverError
from app import app

# RethinkDB server.
RDB_HOST =  os.environ.get('RDB_HOST') or 'localhost'
RDB_PORT = os.environ.get('RDB_PORT') or 28015
APP_DB = 'notes'

#### Setting up the app database
def dbSetup():
  connection = r.connect(host=RDB_HOST, port=RDB_PORT)
  try:
    r.db_create(APP_DB).run(connection)
    r.db(APP_DB).table_create('notes').run(connection)
    print 'Database setup completed. Now run the app without --setup.'
  except RqlRuntimeError:
    print 'App database already exists. Run the app without --setup.'
  finally:
    connection.close()

if __name__ == "__main__":
  parser = argparse.ArgumentParser(description='Run the Flask todo app')
  parser.add_argument('--setup', dest='run_setup', action='store_true')

  args = parser.parse_args()
  if args.run_setup:
    dbSetup()
  else:
    app.run(debug=True)
