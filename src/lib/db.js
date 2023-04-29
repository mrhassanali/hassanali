
// import { createPool } from "mysql";
import mysql from "mysql";

var pool = mysql.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_Name,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
  port: process.env.DB_PORT
});

module.exports = pool;
