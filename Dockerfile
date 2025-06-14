FROM --platform=linux/amd64 node:20.19.0-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

ENV VITE_ENVIRONMENT_SERVER=release

COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
