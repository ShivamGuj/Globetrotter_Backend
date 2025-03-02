const { Client } = require('pg');
require('dotenv').config();

async function fixUserSchema() {
  console.log('Starting database schema fix for User entity...');
  
  // Get connection details from env
  const connectionString = process.env.DB_URL;
  let client;
  
  if (connectionString) {
    client = new Client({
      connectionString,
      ssl: { rejectUnauthorized: false }
    });
  } else {
    client = new Client({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || process.env.DB_DATABASE,
      ssl: { rejectUnauthorized: false }
    });
  }

  try {
    await client.connect();
    console.log('Connected to database');
    
    // Add email column if it doesn't exist
    console.log('Checking for email column...');
    await client.query(`
      DO $$
      BEGIN
          IF NOT EXISTS (
              SELECT FROM information_schema.columns 
              WHERE table_name = 'user' AND column_name = 'email'
          ) THEN
              ALTER TABLE "user" ADD COLUMN "email" VARCHAR(255) NULL;
              RAISE NOTICE 'Added email column to user table';
          ELSE
              RAISE NOTICE 'Email column already exists';
          END IF;
      END
      $$;
    `);
    
    // Add highscore column if it doesn't exist
    console.log('Checking for highscore column...');
    await client.query(`
      DO $$
      BEGIN
          IF NOT EXISTS (
              SELECT FROM information_schema.columns 
              WHERE table_name = 'user' AND column_name = 'highscore'
          ) THEN
              ALTER TABLE "user" ADD COLUMN "highscore" FLOAT DEFAULT 0;
              RAISE NOTICE 'Added highscore column to user table';
          ELSE
              RAISE NOTICE 'Highscore column already exists';
          END IF;
      END
      $$;
    `);
    
    // Add created_at column if it doesn't exist
    console.log('Checking for created_at column...');
    await client.query(`
      DO $$
      BEGIN
          IF NOT EXISTS (
              SELECT FROM information_schema.columns 
              WHERE table_name = 'user' AND column_name = 'created_at'
          ) THEN
              ALTER TABLE "user" ADD COLUMN "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
              RAISE NOTICE 'Added created_at column to user table';
          ELSE
              RAISE NOTICE 'created_at column already exists';
          END IF;
      END
      $$;
    `);
    
    // Add updated_at column if it doesn't exist
    console.log('Checking for updated_at column...');
    await client.query(`
      DO $$
      BEGIN
          IF NOT EXISTS (
              SELECT FROM information_schema.columns 
              WHERE table_name = 'user' AND column_name = 'updated_at'
          ) THEN
              ALTER TABLE "user" ADD COLUMN "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
              RAISE NOTICE 'Added updated_at column to user table';
          ELSE
              RAISE NOTICE 'updated_at column already exists';
          END IF;
      END
      $$;
    `);
    
    console.log('User schema fix completed');
  } catch (err) {
    console.error('Error fixing user schema:', err);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
}

fixUserSchema();
