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
screen -d -m -S react

# Войти в сеанс 'react' и выполнить команды
screen -S react -X stuff $'cd /var/www/html/frontend/\n'
screen -S react -X stuff $'npm install\n'
screen -S react -X stuff $'npm start\n'

echo "Commands executed inside screen react"
echo "Deployment finished!"
