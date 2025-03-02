const { Client } = require('pg');
require('dotenv').config();

async function fixDatabase() {
  console.log('Starting database fix script...');
  
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'headout',
  });

  try {
    await client.connect();
    console.log('Connected to database');
    
    // Check if user table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'user'
      );
    `);
    
    if (tableCheck.rows[0].exists) {
      console.log('User table exists');
      
      // Check password column
      const columnCheck = await client.query(`
        SELECT column_name, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'user' AND column_name = 'password';
      `);
      
      if (columnCheck.rows.length > 0) {
        console.log('Password column exists, current nullable setting:', columnCheck.rows[0].is_nullable);
        
        // Make column nullable
        await client.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL;`);
        console.log('Made password column nullable');
        
        // Update NULL passwords
        const updateResult = await client.query(`
          UPDATE "user" SET "password" = 'default_password_CHANGE_ME'
          WHERE "password" IS NULL;
        `);
        console.log(`Updated ${updateResult.rowCount} users with default password`);
      } else {
        console.log('Password column does not exist');
        await client.query(`ALTER TABLE "user" ADD COLUMN "password" VARCHAR(255) NULL;`);
        console.log('Added password column');
      }
      
      // Check highScore column
      const highScoreCheck = await client.query(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'user' AND column_name = 'highScore';
      `);
      
      if (highScoreCheck.rows.length === 0) {
        console.log('highScore column does not exist, adding it');
        await client.query(`ALTER TABLE "user" ADD COLUMN "highScore" float DEFAULT 0;`);
        console.log('Added highScore column');
      } else {
        console.log('highScore column already exists');
      }
    } else {
      console.log('User table does not exist, nothing to fix');
    }
    
    console.log('Database fix complete');
  } catch (err) {
    console.error('Error fixing database:', err);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
}

fixDatabase();
