import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
// connecting to postgres database

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
});


// function to create table in postgresql database if not exists
export const createTableIfNotExists = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS repos (
      id BIGINT PRIMARY KEY NOT NULL,
      name VARCHAR(255) NOT NULL,
      html_url VARCHAR(255) NOT NULL,
      description TEXT,
      created_at VARCHAR(255) NOT NULL,
      open_issues INTEGER NOT NULL,
      watchers INTEGER NOT NULL,
      owner JSONB NOT NULL
    )
  `);
}


export default pool;