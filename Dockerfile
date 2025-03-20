
# Use an official Node.js runtime as the base image for building
FROM node:23-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files separately to leverage Docker cache for npm install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application code
COPY public .
COPY src .
COPY next.config.mjs .
COPY payload.config.ts .

# Build the Next.js project (assumes "build" script is defined in package.json)
RUN npm run build


# Use a lightweight Node.js image for running the production app
FROM node:23-alpine AS runner

WORKDIR /app

# Set environment variable for production
ENV NODE_ENV production

# Copy only the built files and essential components from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

# Expose the port that Next.js listens on (default is 3000)
EXPOSE 3000

# Default command to start the Next.js application
CMD ["npm", "start"]
