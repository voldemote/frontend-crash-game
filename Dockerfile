FROM node:14-slim

COPY . /app
WORKDIR /app

RUN npm run build

CMD npm run production

EXPOSE 3000
