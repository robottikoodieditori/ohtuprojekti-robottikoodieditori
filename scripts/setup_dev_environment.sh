#!/bin/bash

# Prompt for confirmation
read -p "This script will set up the development environment. Do you want to continue? (y/n) " -n 1 -r
echo    # Move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi

# Determine the root directory by navigating up one level from the scripts directory
ROOT_DIR="$PWD/.."

# Determine OS
OS="$(uname)"

# Function to generate a random secret key
generate_secret_key() {
  openssl rand -hex 32
}

# Generate a secret key
SECRET_KEY=$(generate_secret_key)

# Write the secret key to the .env file in the backend directory
echo "SECRET_KEY=$SECRET_KEY" > "$ROOT_DIR/backend/.env"

# Create an empty user_db.db file in the backend directory
touch "$ROOT_DIR/backend/user_db.db"

sqlite3 "$ROOT_DIR/backend/user_db.db" < "$ROOT_DIR/backend/schema.sql"
sqlite3 "$ROOT_DIR/backend/user_db.db" < "$ROOT_DIR/backend/test_data.sql"


# Install and run frontend in a new terminal
if [ "$OS" == "Darwin" ]; then  # macOS
    osascript <<EOD
    tell application "Terminal"
        do script "cd \"$ROOT_DIR/frontend\" && npm install && npm start"
    end tell
EOD
elif [ "$OS" == "Linux" ]; then
    gnome-terminal -- bash -c "cd \"$ROOT_DIR/frontend\" && npm install; npm start"
fi

# Install and run backend in another new terminal
if [ "$OS" == "Darwin" ]; then  # macOS
    osascript <<EOD
    tell application "Terminal"
        do script "cd \"$ROOT_DIR/backend\" && poetry install && poetry run invoke start"
    end tell
EOD
elif [ "$OS" == "Linux" ]; then
    gnome-terminal -- bash -c "cd \"$ROOT_DIR/backend\" && poetry install; poetry run invoke start"
fi
