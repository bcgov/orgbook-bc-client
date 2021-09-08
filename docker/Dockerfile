ARG build_image=node:fermium
ARG runtime_image=caddy:alpine

# build stage
FROM ${build_image} as build-stage
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build


# production stage
FROM ${runtime_image} as production-stage
COPY --from=build-stage /app/dist /srv