#!/bin/bash
set -e

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "Deployment started ..."
if [ -f "pidfile" ] && ps -p "$(cat pidfile)" > /dev/null 2>&1; then
  echo "Stopping the currently running npm start..."
  pid=$(cat pidfile)
  kill $pid
  wait $pid 2>/dev/null # Wait for the process to terminate
  echo "Stopped npm start with PID $pid."
fi

# Install dependencies
npm install

# Start the React application in the background using nohup
echo "Starting npm start in the background..."
nohup npm start > /dev/null 2>&1 &

# Save the PID of the newly started npm start process
echo $! > pidfile

echo "Deployment finished!"
