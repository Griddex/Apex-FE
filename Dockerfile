FROM node:1.12-alpine as build

WORKDIR /app

ENV NODE_ENV production

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i --production

COPY . .

RUN npm run build

#NGINX
FROM nginx:1.12-alpine as prod

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



