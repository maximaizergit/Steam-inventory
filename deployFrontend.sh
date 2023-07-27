#!/bin/bash
set -e
cd /var/www/html/frontend
# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "Deployment started ..."
if [ -f "pidfile" ] && ps -p "$(cat pidfile)" > /dev/null 2>&1; then
  npm stop
fi

# Install dependencies and start the React application in the background using nohup
npm install

nohup npm start > npm_start_log.txt 2>&1 &

echo $! > pidfile
echo "Deployment finished!"
exit 0
