FROM node:20.18-alpine AS build

COPY package.json package.lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27.3-alpine

COPY --from=build /build /var/www/html
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD [ "nginx", "-g", "daemon off;" ]
