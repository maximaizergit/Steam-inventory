#!/bin/bash
set -e

echo "Deployment started ..."

screen -X -S react quit

echo "Screen react stopped"

screen -S react

echo "Screen react stated"

cd /var/www/html/frontend/

npm install

echo "Start install npm install"

npm start

echo "Npm started"

echo "Deployment finished!"
