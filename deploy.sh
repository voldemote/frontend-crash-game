#!/bin/bash
defaultversion=dev
VERSION=${1:-$defaultversion}

npm run build
doctl registry login
docker build . -t registry.digitalocean.com/wallfair/frontend:$VERSION
docker push registry.digitalocean.com/wallfair/frontend:$VERSION