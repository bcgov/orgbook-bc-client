# build stage
FROM node:fermium as build-stage
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build


# production stage
FROM caddy:alpine as production-stage
COPY --from=build-stage /app/dist /srv