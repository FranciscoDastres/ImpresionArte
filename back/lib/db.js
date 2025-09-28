const { Pool } = require("pg");
require("dotenv").config();

// Prioriza DATABASE_URL, luego PG_URI
const connectionString = process.env.DATABASE_URL || process.env.PG_URI;

const config = connectionString
  ? {
      connectionString,
      ssl: {
        rejectUnauthorized: false
      }
    }
  : {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'impresionarte',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
      } : false
    };

console.log('Database config:', {
  mode: connectionString ? 'URL' : 'local/manual',
  connectionString: connectionString ? 'used' : 'not used',
  host: config.host || 'connectionString'
});

const pool = new Pool(config);

module.exports = pool;
