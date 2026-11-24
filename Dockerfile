# syntax=docker/dockerfile:1

# ST2DCE project - minimal base image, multi-stage, non-root, pinned base tag.

# --- Stage 1: production dependencies --------------------------------------
FROM node:20-alpine AS deps

WORKDIR /app

COPY app/package.json app/package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# --- Stage 2: runtime ------------------------------------------------------
FROM node:20-alpine AS runtime

ENV NODE_ENV=production

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY app/package.json ./
COPY app/app.js app/server.js ./

# The runtime does not need npm/npx: they are only used at build time. Removing them
# shrinks the image and drops tooling we do not run (npm bundles a copy of tar, which
# keeps showing up in image vulnerability scans).
RUN rm -rf /usr/local/lib/node_modules/npm \
           /usr/local/bin/npm \
           /usr/local/bin/npx

EXPOSE 3000

# Never run the application as root
USER node

CMD ["node", "server.js"]
