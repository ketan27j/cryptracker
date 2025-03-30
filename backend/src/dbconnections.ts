import { Pool } from 'pg';

/**
 * Connects to a PostgreSQL database and creates a HeliusAlert table
 * @param host Database host
 * @param port Database port
 * @param databaseName Database name
 * @param userName Database username
 * @param password Database password
 * @returns Boolean indicating success or failure
 */
export const connectAndCreateHeliusAlertTable = async (
  host: string,
  port: number,
  databaseName: string,
  userName: string,
  password: string
): Promise<boolean> => {
    console.log('Creating pool...');
  const pool = new Pool({
    host,
    port,
    database: databaseName,
    user: userName,
    password,
    ssl: {
      rejectUnauthorized: false
    }
  });
  console.log('Connecting to database...');

  try {
    // Test connection
    const client = await pool.connect();
    console.log('Connected to database');
    // Create HeliusAlert table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS "HeliusResponse" (
        "id" SERIAL PRIMARY KEY,
        "response" TEXT NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    await client.query(createTableQuery);
    
    console.log('Successfully connected to database and created HeliusAlert table');
    client.release();
    await pool.end();
    
    return true;
  } catch (error) {
    console.error('Error connecting to database or creating HeliusAlert table:', error);
    await pool.end();
    
    return false;
  }
};

/**
 * Connects to the cryptracker database and stores user's database connection details
 * @param host User's database host
 * @param port User's database port
 * @param dbName User's database name
 * @param userName User's database username
 * @param password User's database password
 * @returns Boolean indicating success or failure
 */
export const storeUserDatabaseConnection = async (
  host: string,
  port: number,
  dbName: string,
  userName: string,
  password: string
): Promise<boolean> => {
  // Connect to the system's cryptracker database
  const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'cryptracker',
    user: 'postgres',
    password: 'test'
  });

  try {
    // Get a client from the pool
    const client = await pool.connect();
    console.log('Connected to cryptracker database');

    // Create UserPostgresDatabase table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS "UserPostgresDatabase" (
        "id" SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL,
        "host" VARCHAR(255) NOT NULL,
        "port" INTEGER NOT NULL,
        "databaseName" VARCHAR(255) NOT NULL,
        "userName" VARCHAR(255) NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        "updateDateTime" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    await client.query(createTableQuery);
    
    // Check if a record already exists for this userId
    const checkExistingQuery = `
      SELECT id FROM "UserPostgresDatabase" WHERE "userId" = $1;
    `;
    
    const existingResult = await client.query(checkExistingQuery, [1]);
    
    if (existingResult.rows.length > 0) {
      // Update existing record
      const updateQuery = `
        UPDATE "UserPostgresDatabase" 
        SET "host" = $1, "port" = $2, "databaseName" = $3, "userName" = $4, "password" = $5, "updateDateTime" = CURRENT_TIMESTAMP
        WHERE "userId" = $6;
      `;
      
      await client.query(updateQuery, [host, port, dbName, userName, password, 1]);
      console.log('Successfully updated user database connection details');
    } else {
      // Insert new record
      const insertQuery = `
        INSERT INTO "UserPostgresDatabase" ("userId", "host", "port", "databaseName", "userName", "password")
        VALUES ($1, $2, $3, $4, $5, $6);
      `;
      
      await client.query(insertQuery, [1, host, port, dbName, userName, password]);
      console.log('Successfully inserted user database connection details');
    }
    
    client.release();
    await pool.end();
    
    return true;
  } catch (error) {
    console.error('Error storing user database connection details:', error);
    await pool.end();
    
    return false;
  }
};
