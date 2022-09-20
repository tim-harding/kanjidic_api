FROM node:latest AS build

WORKDIR /app

COPY src ./src
COPY public ./public
COPY index.html ./
COPY package.json ./
COPY package-lock.json ./
COPY svelte.config.js ./
COPY tsconfig.json ./
COPY tsconfig.lib.json ./
COPY vite.config.js ./
COPY vite.lib.config.js ./

RUN npm install
RUN npm run buildExample

FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d