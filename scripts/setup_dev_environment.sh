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
        do script "cd \"$ROOT_DIR/robottikoodieditori-backend\" && poetry install && poetry run invoke start"
    end tell
EOD
elif [ "$OS" == "Linux" ]; then
    gnome-terminal -- bash -c "cd \"$ROOT_DIR/robottikoodieditori-backend\" && poetry install; poetry run invoke start"
fi


# #!/bin/bash

# # Prompt for confirmation
# read -p "This script will set up the development environment. Do you want to continue? (y/n) " -n 1 -r
# echo    # Move to a new line
# if [[ ! $REPLY =~ ^[Yy]$ ]]
# then
#     exit 1
# fi

# # Navigate to frontend directory
# cd ../frontend

# # Install frontend dependencies
# echo "Installing frontend dependencies..."
# npm install

# # Start the frontend
# echo "Starting the frontend..."
# npm start &  # Start in background so the script can continue

# # Navigate to backend directory
# cd ../robottikoodieditori-backend

# # Install backend dependencies
# echo "Installing backend dependencies..."
# poetry install

# # Start the backend
# echo "Starting the backend..."
# poetry run invoke start
