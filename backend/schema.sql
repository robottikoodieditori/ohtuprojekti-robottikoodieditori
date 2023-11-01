CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE,
    password TEXT
);

CREATE TABLE logofiles (
    id INTEGER PRIMARY KEY,
    content TEXT,
    user_id INTEGER REFERENCES users
)