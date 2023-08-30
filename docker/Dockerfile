ARG build_image=node:fermium
ARG caddy_builder_image=caddy:builder-alpine
ARG runtime_image=caddy:alpine

# build stage
FROM ${build_image} as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# caddy build stage
FROM ${caddy_builder_image} as caddy-build-stage

# Install ratelimit/v0.3.0
RUN xcaddy build \
    --with github.com/RussellLuo/caddy-ext/ratelimit@ab1e18cfe426012af351a68463937ae2e934a2a1

# production stage
FROM ${runtime_image} as production-stage

COPY --from=caddy-build-stage /usr/bin/caddy /usr/bin/caddy
COPY --from=build-stage /app/dist /srv

# Fix permissions issue with Caddy image
# - Between version 2.6.2 and 2.6.3 there were some permissions changes on the official images that stopped them from working on OpenShift.
# - This update resolves that permissions issue for OCP.
RUN chown 1001:root /usr/bin/caddy