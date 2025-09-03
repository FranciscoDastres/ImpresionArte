const pool = require("../backend/db");

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
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      message: "Conexión a la base de datos exitosa", 
      timestamp: result.rows[0].now,
      dbConfig: {
        hasDatabaseUrl: !!process.env.DATABASE_URL
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: "Error de conexión a la base de datos", 
      details: error.message
    });
  }
};
