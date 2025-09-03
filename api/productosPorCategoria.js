const { Pool } = require("pg");

// 🔑 Pool global, se crea una sola vez
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { categoria } = req.query;

    if (!categoria) {
      return res.status(400).json({ error: "Categoría requerida" });
    }

    const result = await pool.query(
      `
      SELECT p.*, c.nombre AS categoria_nombre 
      FROM productos p 
      LEFT JOIN categorias c ON p.categoria_id = c.id 
      WHERE c.nombre ILIKE $1 AND p.activo = true 
      ORDER BY p.created_at DESC
      `,
      [categoria]
    );

    return res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error en /api/productosCategoria:", err);
    return res.status(500).json({ error: "Error al obtener productos por categoría" });
  }
};
