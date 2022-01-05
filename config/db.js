const mysql = require('mysql');
const path = require('path');
const Postgrator = require('postgrator');
require('dotenv').config()

const postgrator = new Postgrator({
  migrationDirectory: path.resolve(__dirname, "../migrations"),
  driver: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: "webhook_assignment",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  schemaTable: "migrations",
});

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'webhook_assignment',
});

function query(sql) {
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

module.exports = {
    query,
    pool,
    postgrator
};