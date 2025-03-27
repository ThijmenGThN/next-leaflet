
# Build the development layer
FROM node:23-alpine AS builder

ARG PAYLOAD_SECRET
ARG NEXT_PUBLIC_DOMAIN
ARG DATABASE_HOST
ARG DATABASE_PORT
ARG DATABASE_USER
ARG DATABASE_PASS
ARG DATABASE_TABLE

ENV COMPOSE_PROFILES=prod
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV NEXT_PUBLIC_DOMAIN=$NEXT_PUBLIC_DOMAIN
ENV DATABASE_HOST=$DATABASE_HOST
ENV DATABASE_PORT=$DATABASE_PORT
ENV DATABASE_USER=$DATABASE_USER
ENV DATABASE_PASS=$DATABASE_PASS
ENV DATABASE_TABLE=$DATABASE_TABLE

# Set working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy rest of the application code
COPY . .

RUN npm run build


# Build the production image
FROM node:23-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3000

CMD ["npm", "start"]
