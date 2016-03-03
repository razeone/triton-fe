# sql.py - Create a SQLite3 table and populate it with data

import sqlite3

# create a new database if the database doesn't already exist
with sqlite3.connect('auth.db') as connection:

    # get a cursor object used to execute SQL commands
    c = connection.cursor()

    # create the table
    c.execute('CREATE TABLE user( ID integer autoincremente unique not null, email VARCHAR(200) UNIQUE NOT NULL, password VARCHAR(100) NOT NULL, created DATETIME default current_timestamp Not Null, modified DATETIME default current_timestamp, Primary key(id)')
    c.execute('CREATE TABLE profile(Id Integer AUTOINCREMENT UNIQUE Not Null, name NVARCHAR(100) Not Null, lastname_paternal NVARCHAR(100) Not Null, lastname_maternal NVARCHAR(100) Not Null, RFC Blob Not Null, user Interger, created DATETIME default current_timestamp Not Null, modified DATETIME default current_timestamp, Primary Key (id), Foreign Key (user) References user (id))')

    # insert dummy data into the table
    c.execute('INSERT INTO user VALUES("brianda_gdelatorre@outlook.com", "slikke")')
    c.execute('INSERT INTO profile VALUES("Brianda","G", "de la Torre", "GATB930131RR9")')
    c.execute('INSERT INTO posts VALUES("Excellent", "I\'m excellent.")')
