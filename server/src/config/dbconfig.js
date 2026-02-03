import mysql from 'mysql2/promise';

import dotenv from "dotenv";
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const isProd = process.env.NODE_ENV === 'production';

//this is a config object to be used
const dbconfig = {
  host: isProd ? process.env.DB_HOST_PROD : process.env.DB_HOST_DEV,
  user: isProd ? process.env.DB_USER_PROD : process.env.DB_USER_DEV,
  password: isProd ? process.env.DB_PASSWORD_PROD : process.env.DB_PASSWORD_DEV,
  database: isProd ? process.env.DB_NAME_PROD : process.env.DB_NAME_DEV,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

//creating connection pool with mysql2
const db = mysql.createPool(dbconfig);


// Function to test the database connection
async function testConnection() {
  try {
    const connection = await db.getConnection(); 
    console.log("Database connected successfully!");
    connection.release(); 
  } catch (err) {
    console.error("Error connecting to DB:", err); 
  }
}
testConnection();

export default db;