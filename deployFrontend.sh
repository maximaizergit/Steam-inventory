#!/bin/bash
set -e

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "Deployment started ..."

npm install

npm run build;

echo "Deployment finished!"
