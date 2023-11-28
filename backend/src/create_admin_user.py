from db import DB
import bcrypt

database = DB('user_db.db')
test_database = DB('test_db.db')

# Admin user credentials
admin_username = 'admin'
admin_password = 'password'

hashed_password = bcrypt.hashpw(admin_password.encode('utf-8'), bcrypt.gensalt())
query = 'INSERT INTO users (name, password, role) VALUES (?, ?, ?)'
values = (admin_username, hashed_password, 1)

# Insert admin user into the table with the hashed password as bytes
print(database.insert_entry(query, values))
test_database.insert_entry(query, values)

