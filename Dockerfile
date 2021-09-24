FROM nginx:1.17.1-alpine

ENV REACT_APP_NEWS_API_KEY=dcc5a2750201e19f396c43f98d1d07f0
ENV REACT_APP_CRASH_GAME_BACKEND_URL=crash-game-backend
ENV REACT_APP_BACKEND_URL=backend
ENV REACT_APP_NEWS_API_SSL_MODE=true

COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.htpasswd /etc/nginx/conf.d/
COPY build /usr/share/nginx/html

EXPOSE 80
