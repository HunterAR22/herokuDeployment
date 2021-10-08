const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  database: "example_db",
  password: "example",
});

module.exports = pool;
