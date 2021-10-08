const { Pool } = require("pg");

const pool = new Pool({
  database: process.env.DB_NAME,
});

module.exports = pool;
