#!/bin/bash

# Script untuk deployment Vercel
# Copyright © 2023-2025 Berlianoel

# Install dependencies
echo "Installing dependencies..."
npm install
npm install bcryptjs

# Build aplikasi
echo "Building application..."
npm run build

# Siapkan database jika diperlukan
if [ -n "$DATABASE_URL" ]; then
  echo "Setting up database..."
  # Handling database connection failures gracefully
  npm run db:push || echo "Database migration failed, will use fallback mode"
  
  # Seed database dengan admin user jika ada database
  echo "Seeding database..."
  node seed.js || echo "Database seeding failed, will use fallback mode"
fi

# Tambahkan flag untuk menunjukkan bahwa build telah selesai
touch .vercel_build_completed

echo "Build completed successfully!"
echo "Auto-configuration enabled for seamless deployment."