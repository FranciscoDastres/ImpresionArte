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

    const { q } = req.query;
    if (!q) {
      // Cerrar la conexión
      await pool.end();
      return res.json([]);
    }
    
    const result = await pool.query(`
      SELECT p.*, c.nombre as categoria_nombre 
      FROM productos p 
      LEFT JOIN categorias c ON p.categoria_id = c.id 
      WHERE p.activo = true 
      AND (
        p.titulo ILIKE $1 
        OR p.descripcion ILIKE $1 
        OR c.nombre ILIKE $1
      )
      ORDER BY p.created_at DESC
    `, [`%${q}%`]);
    
    // Cerrar la conexión
    await pool.end();
    
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al buscar productos" });
  }
};
