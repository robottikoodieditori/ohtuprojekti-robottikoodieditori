#!/bin/bash

read -p "This script will set up the development environment. Do you want to continue? (y/n) " -n 1 -r
echo    # Move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi

ROOT_DIR="$PWD/.."

OS="$(uname)"

generate_secret_key() {
  openssl rand -hex 32
}

SECRET_KEY=$(generate_secret_key)

echo "SECRET_KEY=$SECRET_KEY" > "$ROOT_DIR/backend/.env"
echo "DB_PATH=user_db.db" >> "$ROOT_DIR/backend/.env"
echo "TEST_DB_PATH=test_db.db" >> "$ROOT_DIR/backend/.env"

touch "$ROOT_DIR/backend/user_db.db"
touch "$ROOT_DIR/backend/test_db.db"

sqlite3 "$ROOT_DIR/backend/user_db.db" < "$ROOT_DIR/backend/schema.sql"
sqlite3 "$ROOT_DIR/backend/user_db.db" < "$ROOT_DIR/backend/test_data.sql"


if [ "$OS" == "Darwin" ]; then
    osascript <<EOD
    tell application "Terminal"
        do script "cd \"$ROOT_DIR/frontend\" && npm install && npm start"
    end tell
EOD
elif [ "$OS" == "Linux" ]; then
    gnome-terminal -- bash -c "cd \"$ROOT_DIR/frontend\" && npm install; npm start"
fi

if [ "$OS" == "Darwin" ]; then
    osascript <<EOD
    tell application "Terminal"
        do script "cd \"$ROOT_DIR/backend\" && poetry install && poetry run invoke start"
    end tell
EOD
elif [ "$OS" == "Linux" ]; then
    gnome-terminal -- bash -c "cd \"$ROOT_DIR/backend\" && poetry install; poetry run invoke start"
fi
