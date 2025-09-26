const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.PG_URI || 'postgresql://postgres:hola123@localhost:5432/impresionArte'
});
module.exports = pool;
