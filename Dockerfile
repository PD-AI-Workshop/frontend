FROM node:24-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm@10.6.5 && \
    pnpm install

FROM node:24-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm install -g pnpm@10.6.5 && \
    pnpm build

FROM node:24-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package.json \ 
    /app/pnpm-lock.yaml \
    /app/next.config.* \
    ./

COPY --from=builder /app/.next ./.next

COPY --from=builder /app/public ./public

RUN apk add --no-cache curl && \
    npm install -g pnpm@10.6.5 && \
    pnpm install --prod --frozen-lockfile && \
    pnpm store prune

EXPOSE 3000

CMD ["pnpm", "start"]