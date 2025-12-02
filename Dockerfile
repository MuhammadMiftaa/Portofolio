# Stage 1: Dependencies
FROM oven/bun:1 AS deps
WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Stage 2: Builder
FROM oven/bun:1 AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for environment variables
ARG MONGODB_URI
ARG NEXT_PUBLIC_GITHUB_TOKEN

# Set environment variables
ENV MONGODB_URI=$MONGODB_URI
ENV NEXT_PUBLIC_GITHUB_TOKEN=$NEXT_PUBLIC_GITHUB_TOKEN
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the application
RUN bun run build

# Stage 3: Runner with Nginx
FROM fholzer/nginx-brotli:v1.28.0 AS runner
WORKDIR /app

# Install Node.js and Bun in the nginx image
RUN apk add --no-cache nodejs npm curl unzip
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

# Copy nginx configuration
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Build arguments for runtime environment variables
ARG MONGODB_URI
ARG NEXT_PUBLIC_GITHUB_TOKEN

# Set runtime environment variables
ENV MONGODB_URI=$MONGODB_URI
ENV NEXT_PUBLIC_GITHUB_TOKEN=$NEXT_PUBLIC_GITHUB_TOKEN
ENV NODE_ENV=production
ENV PORT=3000

# Expose ports
EXPOSE 80
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Start script
COPY --from=builder /app/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]