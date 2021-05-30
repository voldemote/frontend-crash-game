npm run build
doctl registry login
docker build . -t registry.digitalocean.com/wallfair/frontend
docker push registry.digitalocean.com/wallfair/frontend