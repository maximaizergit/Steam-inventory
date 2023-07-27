#!/bin/bash
set -e
NPM_PATH=/root/.nvm/versions/node/v18.17.0/bin/npm

echo "Deployment started ..."
if [ -f "pidfile" ] && ps -p "$(cat pidfile)" > /dev/null 2>&1; then
  npm stop
fi

# Install dependencies and start the React application
npm install
npm start &

echo "Deployment finished!"