CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE,
    password TEXT
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