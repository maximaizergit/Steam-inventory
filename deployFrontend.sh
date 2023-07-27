#!/bin/bash
set -e

echo "Deployment started ..."

screen -X -S react quit || true

echo "Screen react stopped"

screen -d -m -S react

screen -r react

echo "Screen react stated"

cd /var/www/html/frontend/

npm install

echo "Start install npm install"

npm start

echo "Npm started"

echo "Deployment finished!"
