import { Pool } from 'pg';
import { prisma } from 'prisma-shared';

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
  password: string,
  userId: number
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
    console.log('Connected to cryptracker database');

    const response = await prisma.userPostgresDatabase.create({
      data: {
        host,
        port,
        databaseName: dbName,
        userName,
        password,
        userId: 1
      }
    });
    
    if (response) {
      console.log('Successfully inserted database connection details');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error saving database connection details:', error);
    return false;
  }
};
