#!/bin/bash
set -e

echo "Deployment started ..."

screen -X -S react quit

screen -S react

cd /var/www/html/frontend

npm install

npm run build

npm start

echo "Deployment finished!"
