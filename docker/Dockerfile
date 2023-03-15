ARG build_image=node:fermium
ARG runtime_image=caddy:alpine

# build stage
FROM ${build_image} as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# production stage
FROM ${runtime_image} as production-stage
COPY --from=build-stage /app/dist /srv

# Fix permissions issue with Caddy image
# - Between version 2.6.2 and 2.6.3 there were some permissions changes on the official images that stopped them from working on OpenShift.
# - This update resolves that permissions issue for OCP.
RUN chown 1001:root /usr/bin/caddy