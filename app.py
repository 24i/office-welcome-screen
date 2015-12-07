import sqlite3
from flask import Flask, request, session, g, redirect, url_for, \
     abort, render_template, flash, jsonify

class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

DATABASE = 'database.db'
app = Flask(__name__,static_folder='src', template_folder='src')

def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()

def connect_to_database():
    return sqlite3.connect(DATABASE)

def get_db():
    # get_db() is the database connection
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = connect_to_database()
    return db

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

def insert_db(table, fields=(), values=()):
    cur = get_db().cursor()
    query = 'INSERT INTO %s (%s) VALUES (%s)' % (
        table,
        ', '.join(fields),
        ', '.join(['?'] * len(values))
    )
    cur.execute(query, values)
    get_db().commit()
    id = cur.lastrowid
    cur.close()
    return id

def reset_transactions():
    cur = get_db().cursor()
    query = 'UPDATE `transactions` SET `hide`=1 WHERE 1=1' 
    cur.execute(query)
    get_db().commit()
    cur.close()
    return True

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)
