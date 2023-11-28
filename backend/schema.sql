CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE,
    password TEXT,
    role INTEGER DEFAULT 0
);

CREATE TABLE logofiles (
    id INTEGER PRIMARY KEY,
    filename TEXT,
    content TEXT,
    created TIME,
    last_updated TIME,
    visible INTEGER DEFAULT 1,
    user_id INTEGER REFERENCES users
);