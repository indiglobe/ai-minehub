# ------------------------------------
# ---------- Stage 1: Build ----------
# ------------------------------------
FROM node:lts-alpine3.22 AS builder

WORKDIR /app

# Copy package files first for caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/socket/package.json ./apps/socket/package.json

COPY packages/types/package.json ./packages/types/package.json

COPY configs/typescript-config/package.json ./configs/typescript-config/package.json
COPY configs/prettier-config/package.json ./configs/prettier-config/package.json
COPY configs/eslint-config/package.json ./configs/eslint-config/package.json

# Install pnpm and all dependencies (dev + prod)
RUN corepack enable
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Declare build args (secrets for prerender)
ARG VITE_SOCKET_APP_HOST
ARG VITE_WEB_APP_HOST
ARG VITE_RAZOR_PAY_KEY

ARG BETTER_AUTH_SECRET
ARG BETTER_AUTH_URL
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG DATABASE_URL
ARG SOCKET_APP_HOST
ARG WEB_APP_HOST
ARG RAZOR_PAY_KEY
ARG RAZOR_PAY_SECRET


# Set temporary ENV for build (not persisted in final image)
ENV \
  VITE_SOCKET_APP_HOST=$VITE_SOCKET_APP_HOST \
  VITE_WEB_APP_HOST=$VITE_WEB_APP_HOST \
  VITE_RAZOR_PAY_KEY=$VITE_RAZOR_PAY_KEY \
  BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET \
  BETTER_AUTH_URL=$BETTER_AUTH_URL \
  GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID \
  GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET \
  DATABASE_URL=$DATABASE_URL \
  SOCKET_APP_HOST=$SOCKET_APP_HOST \
  WEB_APP_HOST=$WEB_APP_HOST \
  RAZOR_PAY_KEY=$RAZOR_PAY_KEY \
  RAZOR_PAY_SECRET=$RAZOR_PAY_SECRET

# Create a env file at the root of the proj
RUN cat > .env.production <<EOF
VITE_SOCKET_APP_HOST=$VITE_SOCKET_APP_HOST
VITE_WEB_APP_HOST=$VITE_WEB_APP_HOST
VITE_RAZOR_PAY_KEY=$VITE_RAZOR_PAY_KEY
BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET
BETTER_AUTH_URL=$BETTER_AUTH_URL
GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
DATABASE_URL=$DATABASE_URL
SOCKET_APP_HOST=$SOCKET_APP_HOST
WEB_APP_HOST=$WEB_APP_HOST
RAZOR_PAY_KEY=$RAZOR_PAY_KEY
RAZOR_PAY_SECRET=$RAZOR_PAY_SECRET
EOF

# Build app (uses build-time ENV)
RUN pnpm build --filter socket



# -----------------------------------------
# ---------- Stage 2: Production ----------
# -----------------------------------------
FROM node:lts-alpine3.22 AS runner

WORKDIR /app

# Install pnpm (needed to serve)
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/socket/package.json ./apps/socket/package.json

# Copy built output from builder
COPY --from=builder /app/apps/socket/dist ./apps/socket/dist

# install prod deps
RUN pnpm install --prod --frozen-lockfile

ENV PORT=3000

EXPOSE $PORT

ENTRYPOINT ["node","apps/socket-server/dist/index.mjs"]
