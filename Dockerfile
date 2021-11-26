FROM node:14-slim

COPY . /app
WORKDIR /app

ARG REACT_APP_CRASH_GAME_BACKEND_URL
ARG REACT_APP_BACKEND_URL
ARG REACT_APP_CASINO_GAMES_BACKEND_URL=
ARG REACT_APP_SOCKET_URL
ARG REACT_APP_NEWS_API_KEY
ARG REACT_APP_RECAPTCHA_KEY
ARG REACT_APP_GTM_ID
ARG REACT_APP_PUMP_DUMP_GAME_BACKEND_URL
ARG REACT_APP_SHOW_UPCOMING_FEATURES=true
ARG REACT_APP_GOOGLE_CLIENT_ID
ARG REACT_APP_FACEBOOK_CLIENT_ID
ARG REACT_APP_URL

RUN npm install
RUN npm run build

CMD npm run production

EXPOSE 3000
