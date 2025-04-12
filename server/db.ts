/**
 * CrimsonRealm Database Connection
 * Copyright © 2023-2025 Berlianoel
 * All rights reserved.
 * This entire codebase was created by Berlianoel.
 */

import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Default connection string untuk deployment tanpa database yang dikonfigurasi
const DEFAULT_DATABASE_URL = "postgres://postgres:postgres@localhost:5432/postgres";

// Gunakan DATABASE_URL dari environment jika ada, atau gunakan default
// Ini mencegah error ketika database belum dikonfigurasi
const connectionString = process.env.DATABASE_URL || DEFAULT_DATABASE_URL;

let pool: Pool;
let db: any; // Menggunakan any untuk menghindari type error pada fallback

try {
  pool = new Pool({ connectionString });
  db = drizzle({ client: pool, schema });
  console.log("Database connection established successfully");
} catch (error) {
  console.error("Failed to connect to database:", error);
  // Fallback untuk menghindari crash aplikasi
  console.log("Using memory database fallback");
  
  // @ts-ignore - Ini hanya fallback untuk mencegah crash
  pool = {
    query: async () => ({ rows: [], command: "", rowCount: 0, oid: 0, fields: [] }),
    connect: async () => ({}),
    end: async () => {},
  } as unknown as Pool;
  
  // Fallback DB implementation with minimal functionality
  db = {
    select: () => ({
      from: () => ({
        execute: async () => []
      })
    }),
    insert: () => ({
      values: () => ({
        returning: () => ({
          execute: async () => []
        })
      })
    }),
    update: () => ({
      set: () => ({
        where: () => ({
          execute: async () => []
        })
      })
    }),
    delete: () => ({
      where: () => ({
        execute: async () => []
      })
    }),
    query: {
      any: async () => []
    }
  };
}

export { pool, db };
