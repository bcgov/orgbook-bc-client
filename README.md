[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Lifecycle:Maturing](https://img.shields.io/badge/Lifecycle-Maturing-007EC6)](https://github.com/bcgov/repomountie/blob/master/doc/lifecycle-badges.md)

# OrgBook BC Client

## Overview

This application implements the user interface for [OrgBook BC](https://orgbook.gov.bc.ca),
a publicly accessible directory of organizations registered to do business in British Columbia.
It is built with Vue 2 and served via Caddy.

API calls are proxied through Caddy (in Docker) or Vite's dev server (in development mode) to
an [Aries VCR](https://github.com/bcgov/aries-vcr) backend. This can be the production
OrgBook API (default), Dev or Test OrgBook instances, or a locally running instance.

---

## Running with Docker

### Against the production OrgBook API (no local VCR required)

1. **Build the image:**
   ```
   cd docker
   ./manage build
   ```

2. **Create a `docker/.env` file** to point at the production API:
   ```
   PUBLIC_API_HOST=https://orgbook.gov.bc.ca
   PUBLIC_API_PORT=443
   ```

> The development (`https://dev.orgbook.gov.bc.ca`) or test (`https://test.orgbook.gov.bc.ca`) OrgBook instances can also be used.

3. **Start the container:**
   ```
   ./manage start
   ```

4. Open **http://localhost:8081** in your browser.

> `docker/.env` is listed in `.gitignore` and will not be committed.

### Against a local Aries VCR instance

If you are running [Aries VCR](https://github.com/bcgov/aries-vcr) locally, the UI can attach
to its Docker network so they can communicate directly.

1. Uncomment the `networks` block in `docker/docker-compose.yml`:
   ```yaml
   networks:
     - orgbook

   networks:
     orgbook:
       name: vcr_vcr
       external: true
   ```

2. Leave `docker/.env` empty or absent (defaults will connect to `http://vcr-api:8080`).

3. Build and start as above.

---

## Development (Vite dev server)

The Vite dev server provides hot-reload and is the fastest way to iterate on UI changes.
It proxies `/api` requests to the production OrgBook API by default — no local backend needed.

### Setup

```bash
npm install
```

### Configure the API target

The default in `vite.config.ts` points to production and works out of the box. To use a
different backend, edit the `server.proxy` section:

```typescript
proxy: {
  "/api": {
    target: "https://orgbook.gov.bc.ca",          // production (default)
    // target: "https://dev.orgbook.gov.bc.ca",    // dev environment
    // target: "http://host.docker.internal:8080", // local VCR in Docker
    // target: "http://localhost:8080",             // local VCR native
    changeOrigin: true,
  },
},
```

### Start the dev server

```
npm run dev
```

The app will be available at **http://localhost:8081**.

---

## FAQ Content

The Help/FAQ page is driven by [`src/data/faq/en.ts`](src/data/faq/en.ts). Each answer is a
TypeScript template literal, so markdown formatting, links, and multi-line text are all
straightforward to edit. No rebuild is required to preview changes when using the dev server.

---

## Contributing

**Pull requests are always welcome!**

Please see the [Contributions Guide](CONTRIBUTING.md) for the repo.

Before contributing please run `npm run lint` and fix any linter warnings in your code contribution.

You may also create an issue if you would like to suggest additional resources to include in this repository.

All contributions to this repository should adhere to our [Code of Conduct](./CODE_OF_CONDUCT).
