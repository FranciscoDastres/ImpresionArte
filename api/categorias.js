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

    // Obtener todas las categorías
    const result = await pool.query('SELECT * FROM categorias ORDER BY nombre');
    
    // Cerrar la conexión
    await pool.end();
    
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener categorías" });
  }
};
