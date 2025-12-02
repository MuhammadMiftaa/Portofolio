#!/bin/sh
set -e

echo "Starting Portfolio Application..."

# Start nginx in the background
echo "Starting Nginx..."
nginx

# Start Next.js application with Bun
echo "Starting Next.js with Bun..."
cd /app
exec bun server.js