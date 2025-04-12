#!/bin/bash

# Build the client
echo "Building client..."
npm run build

# Copy any static assets
echo "Copying static assets..."
mkdir -p dist/public
if [ -d "client/public" ]; then
  cp -r client/public/* dist/public/ || true
fi

# Create a .env file if not exists (for Railway)
if [ ! -f ".env" ]; then
  echo "Creating default .env file..."
  cp .env.example .env || echo "NODE_ENV=production" > .env
fi

echo "Build completed successfully!"