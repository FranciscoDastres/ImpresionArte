const { Pool } = require("pg");
require("dotenv").config();

async function testConnection() {
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
        ssl: {
          rejectUnauthorized: false
        }
      };

  const pool = new Pool(config);

  try {
    console.log('🔍 Probando conexión a la base de datos...');
    console.log('📊 Variables de entorno:');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Configurada' : 'No configurada');
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_NAME:', process.env.DB_NAME);
    console.log('DB_USER:', process.env.DB_USER);
    
    const client = await pool.connect();
    console.log('✅ Conexión exitosa!');
    
    const result = await client.query('SELECT NOW()');
    console.log('⏰ Hora del servidor:', result.rows[0].now);
    
    client.release();
    await pool.end();
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.error('🔍 Detalles del error:', error);
  }
}

testConnection(); 