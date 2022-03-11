const { Pool } = require("pg");

const pool = new Pool({
  // Format: postgres://user:password@host:5432/database
  connectionString: "postgres://localhost/example_db",
});

module.exports = pool;
