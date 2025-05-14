const { Pool } = require("pg");

let pool;

if (process.env.NODE_ENV === "production") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  pool = new Pool({
    user: process.env.PG_ROLE_NAME,
    host: process.env.PG_HOST || "localhost",
    database: process.env.PG_DATABASE,
    password: process.env.PG_ROLE_PASSWORD,
    port: process.env.PG_PORT || 5432,
  });
}

module.exports = pool;
