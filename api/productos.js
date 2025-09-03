const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "GET") {
      const result = await pool.query(`
        SELECT p.*, c.nombre as categoria_nombre 
        FROM productos p 
        LEFT JOIN categorias c ON p.categoria_id = c.id 
        WHERE p.activo = true 
        ORDER BY p.created_at DESC
      `);
      return res.status(200).json(result.rows);

    } else if (req.method === "POST") {
      const {
        titulo, precio, precio_anterior, descripcion,
        descuento, imagen_principal, imagenes_adicionales,
        categoria_id, stock, activo
      } = req.body;

      const result = await pool.query(
        `INSERT INTO productos 
         (titulo, precio, precio_anterior, descripcion, descuento, imagen_principal, imagenes_adicionales, categoria_id, stock, activo)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
         RETURNING *`,
        [titulo, precio, precio_anterior, descripcion, descuento,
         imagen_principal, imagenes_adicionales, categoria_id, stock, activo]
      );

      return res.status(201).json(result.rows[0]);
    }

    return res.status(405).json({ error: "Método no permitido" });

  } catch (err) {
    console.error("Error en /api/productos:", err);
    return res.status(500).json({ error: "Error en la operación" });
  }
};
