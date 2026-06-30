# ------------------------------------
# ---------- Stage 1: Build ----------
# ------------------------------------
FROM node:lts-alpine3.22 AS builder

WORKDIR /app
# Copy package files first for caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/utils/package.json ./packages/utils/package.json
COPY packages/data/package.json ./packages/data/package.json
COPY packages/styles/package.json ./packages/styles/package.json
COPY packages/env/package.json ./packages/env/package.json
COPY configs/tsup-config/package.json ./configs/tsup-config/package.json
COPY configs/vitest-config/package.json ./configs/vitest-config/package.json
COPY configs/eslint-config/package.json ./configs/eslint-config/package.json
COPY configs/typescript-config/package.json ./configs/typescript-config/package.json
COPY configs/prettier-config/package.json ./configs/prettier-config/package.json

# Install pnpm and all dependencies (dev + prod)
RUN corepack enable
RUN pnpm install

# Copy source code
COPY . .

# Declare build args (secrets for prerender)
ARG BETTER_AUTH_SECRET
ARG BETTER_AUTH_URL
ARG DATABASE_URL
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG RAZOR_PAY_KEY
ARG RAZOR_PAY_SECRET
ARG web_APP_HOST
ARG STORAGE_APP_HOST
ARG SOCKET_APP_HOST
ARG LIVE_APP_HOST

ARG VITE_web_APP_HOST
ARG VITE_STORAGE_APP_HOST
ARG VITE_RAZOR_PAY_KEY
ARG VITE_SOCKET_APP_HOST
ARG VITE_LIVE_APP_HOST


# Set temporary ENV for build (not persisted in final image)
ENV \
  BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET \
  BETTER_AUTH_URL=$BETTER_AUTH_URL \
  DATABASE_URL=$DATABASE_URL \
  GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID \
  GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET \
  RAZOR_PAY_KEY=$RAZOR_PAY_KEY \
  RAZOR_PAY_SECRET=$RAZOR_PAY_SECRET \
  web_APP_HOST=$web_APP_HOST \
  STORAGE_APP_HOST=$STORAGE_APP_HOST \
  SOCKET_APP_HOST=$SOCKET_APP_HOST \
  LIVE_APP_HOST=$LIVE_APP_HOST \
  VITE_web_APP_HOST=$VITE_web_APP_HOST \
  VITE_STORAGE_APP_HOST=$VITE_STORAGE_APP_HOST \
  VITE_RAZOR_PAY_KEY=$VITE_RAZOR_PAY_KEY \
  VITE_SOCKET_APP_HOST=$VITE_SOCKET_APP_HOST \
  VITE_LIVE_APP_HOST=$VITE_LIVE_APP_HOST

# Create a env file at the root of the proj
RUN cat > .env.production <<EOF
BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET
BETTER_AUTH_URL=$BETTER_AUTH_URL
DATABASE_URL=$DATABASE_URL
GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
RAZOR_PAY_KEY=$RAZOR_PAY_KEY
RAZOR_PAY_SECRET=$RAZOR_PAY_SECRET
web_APP_HOST=$web_APP_HOST
STORAGE_APP_HOST=$STORAGE_APP_HOST
SOCKET_APP_HOST=$SOCKET_APP_HOST
LIVE_APP_HOST=$LIVE_APP_HOST
VITE_web_APP_HOST=$VITE_web_APP_HOST
VITE_STORAGE_APP_HOST=$VITE_STORAGE_APP_HOST
VITE_RAZOR_PAY_KEY=$VITE_RAZOR_PAY_KEY
VITE_SOCKET_APP_HOST=$VITE_SOCKET_APP_HOST
VITE_LIVE_APP_HOST=$VITE_LIVE_APP_HOST
EOF

# build local workspace dependencies first
RUN pnpm build \
  --filter @repo/ui \
  --filter @repo/utils \
  --filter @repo/data \
  --filter @repo/styles \
  --filter @repo/env \
  --filter @repo/tsup-config \
  --filter @repo/vitest-config \
  --filter @repo/eslint-config \
  --filter @repo/typescript-config \
  --filter @repo/prettier-config 

# re-install to add local workspace dependencies files to projects
RUN pnpm install --frozen-lockfile

# Build app (uses build-time ENV)
RUN pnpm build --filter web



# -----------------------------------------
# ---------- Stage 2: Production ----------
# -----------------------------------------
FROM node:lts-alpine3.22 AS runner

WORKDIR /app

# Install pnpm (needed to serve)
RUN corepack enable

# Copy only package.json
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/utils/package.json ./packages/utils/package.json
COPY packages/data/package.json ./packages/data/package.json
COPY packages/styles/package.json ./packages/styles/package.json
COPY packages/env/package.json ./packages/env/package.json

# Copy built output from builder
COPY --from=builder /app/apps/web/dist ./apps/web/dist
COPY --from=builder /app/packages/ui/dist ./packages/ui/dist
COPY --from=builder /app/packages/utils/dist ./packages/utils/dist
COPY --from=builder /app/packages/data/dist ./packages/data/dist
COPY --from=builder /app/packages/styles/dist ./packages/styles/dist
COPY --from=builder /app/packages/env/dist ./packages/env/dist

# # install prod deps
RUN pnpm install --prod --frozen-lockfile

EXPOSE 3000

ENTRYPOINT ["node","apps/web/dist/server/index.mjs"]
