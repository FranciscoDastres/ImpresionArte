const { Pool } = require("pg");
require("dotenv").config();

// Usar DATABASE_URL si está disponible, sino usar configuración individual
const config = process.env.DATABASE_URL 
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  : {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      // Solo usar SSL en producción, no en desarrollo local
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
      } : false
    };

const pool = new Pool(config);

module.exports = pool;
