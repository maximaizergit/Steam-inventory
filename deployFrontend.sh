#!/bin/bash
set -e

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "Deployment started ..."
if [ -f "pidfile" ] && ps -p "$(cat pidfile)" > /dev/null 2>&1; then
  npm stop
fi

# Install dependencies and start the React application
npm install
npm start &
echo "Deployment finished!"
