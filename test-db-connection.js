const { Client } = require('pg');
require('dotenv').config();

async function testConnection() {
  console.log('Testing database connection...');
  console.log(`Host: ${process.env.DB_HOST || 'localhost'}`);
  console.log(`Port: ${process.env.DB_PORT || '5432'}`);
  console.log(`Username: ${process.env.DB_USERNAME || 'postgres'}`);
  console.log(`Database: ${process.env.DB_DATABASE || 'headout'}`);
  console.log(`Password: ${'*'.repeat(process.env.DB_PASSWORD?.length || 0)}`);
  console.log(`SSL: ${process.env.DB_SSL || 'false'}`);
  
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres', 
    database: process.env.DB_DATABASE || 'headout',
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  });

  try {
    await client.connect();
    console.log('✅ Connection successful!');
    
    // Quick test query
    const res = await client.query('SELECT current_timestamp as now');
    console.log('Test query result:', res.rows[0]);
    
    await client.end();
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    
    // Suggest solutions based on error types
    if (err.message.includes('password authentication failed')) {
      console.log('\nSolution for password authentication error:');
      console.log('1. Check that the password in .env is correct');
      console.log('2. Or use SQLite by adding USE_SQLITE=true to your .env file');
      console.log('3. Or create the postgres user with the password in your .env:');
      console.log('   ALTER USER postgres WITH PASSWORD \'your_password\';');
    } else if (err.message.includes('SSL')) {
      console.log('\nSolution for SSL error:');
      console.log('1. Add DB_SSL=false to your .env file');
      console.log('2. Or use SQLite by adding USE_SQLITE=true to your .env file');
    }
  }
}

testConnection();
