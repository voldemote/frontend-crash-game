FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.htpasswd /etc/nginx/conf.d/
COPY build /usr/share/nginx/html
EXPOSE 80