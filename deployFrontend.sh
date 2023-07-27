#!/bin/bash
set -e

echo "Deployment started ..."

# Остановить сеанс 'react', если он уже запущен
screen -X -S react quit || true

echo "Screen react stopped"

# Запустить сеанс 'react' в фоновом режиме
screen -d -m -S react

echo "Screen react started"

# Войти в сеанс 'react'
screen -r react

echo "Entered screen react"

cd /var/www/html/frontend/

# Установить зависимости с помощью npm
npm install

echo "npm install completed"

# Запустить приложение с помощью npm
npm start

echo "npm started"

echo "Deployment finished!"
