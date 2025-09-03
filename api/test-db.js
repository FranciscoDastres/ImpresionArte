const { Pool } = require("pg");

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  try {
    // Crear conexión directamente aquí
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    const result = await pool.query('SELECT NOW()');
    
    // Cerrar la conexión
    await pool.end();
    
    res.json({ 
      message: "Conexión a la base de datos exitosa", 
      timestamp: result.rows[0].now,
      dbConfig: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        databaseUrl: process.env.DATABASE_URL ? 'Configurada' : 'No configurada'
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: "Error de conexión a la base de datos", 
      details: error.message,
      env: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        nodeEnv: process.env.NODE_ENV
      }
    });
  }
};
