const mysql = require("mysql2/promise");

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

// Export the pool for reuse
module.exports = pool;
