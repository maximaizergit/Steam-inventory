#!/bin/bash
set -e

echo "Deployment started ..."
            if [ -f \"pidfile\" ] && ps -p \$(cat pidfile) > /dev/null 2>&1; then
              npm stop
            fi

            # Install dependencies and start the React application
            npm install
            npm start &
echo "Deployment finished!"
