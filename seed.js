#!/usr/bin/env node
/**
 * CrimsonRealm Database Seeder
 * Copyright © 2023-2025 Berlianoel
 * All rights reserved.
 * This entire codebase was created by Berlianoel.
 */

import { db } from './server/db.js';
import { users } from './shared/schema.js';
import bcrypt from 'bcryptjs';

async function seedDatabase() {
  console.log('Seeding database...');

  // Cek apakah sudah ada admin user
  const existingAdmin = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.isAdmin, true)
  });

  if (!existingAdmin) {
    // Buat admin user jika belum ada
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await db.insert(users).values({
      username: 'admin',
      password: hashedPassword,
      isAdmin: true
    });
    
    console.log('Admin user created successfully');
  } else {
    console.log('Admin user already exists');
  }

  console.log('Database seeding completed');
}

seedDatabase()
  .catch(error => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });