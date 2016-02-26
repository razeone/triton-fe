# import the Flask class from the flask module
from flask import Flask, render_template, redirect, url_for, request, session, g
from functools import wraps
import os 
import sqlite3

# create the application object
app = Flask(__name__)

app.secret_key = 'slikke'
app.database = "auth.db"

# Login required decorator
def login_required(f):
	@wraps(f)
	def wrap(*args, **kwargs):
		if 'logged_in' in session:
			return f(*args, **kwargs)
		else:
			flask('Necesitas identificarte primero.')
			return redirect(url_for('login'))
	return wrap


# use decorators to link the function to a url
@app.route('/')
def home():
	return "Hola" # return a string


@app.route('/login', methods=['GET', 'POST'])
def login():
	error = None
	if request.method == 'POST':
		if request.form['username'] != 'brianda' or request.form['password'] != 'slikke':
			error = 'Datos invalidos'
		else:
			session['logged_in'] = True
			return redirect(url_for('profile'))
	return render_template('login.html', error=error)

@app.route('/logout')
def logout():
	session.pop('logged_in', None)
	return redirect(url_for('/'))

def connect_db():
	return sqlite3.connect(app.database)
	


@app.route('/perfil')
def profile():
	g.db = connect_db()
	cur = g.db.execute('select * from profile')
	posts = [dict(name=row[0], lastname_paternal=row[1], 
				lastname_maternal=row[2], RFC=row[3], 
				user=row[4], create=row[5], modified=row[6])
				for row in cur.fetchall()]
	g.db.close()

	return render_template('Profile.html', posts=posts)

@app.route('/registro')
def registro():
	return render_template('registration.html')


























# start the server with the 'run()' method
if __name__ == '__main__':
	HOST = os.environ.get('SERVER_HOST', 'localhost')
	try:
		PORT = int(os.environ.get('SERVER_PORT', '3101'))
	except ValueError:
		PORT = 3101
	app.run(HOST, PORT)