const { Pool } = require("pg");
const url = require("url");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const query = url.parse(req.url, true).query;
    const { id } = query;

    if (!id) return res.status(400).json({ error: "ID de producto requerido" });

    if (req.method === "GET") {
      const result = await pool.query(
        `SELECT p.*, c.nombre as categoria_nombre 
         FROM productos p 
         LEFT JOIN categorias c ON p.categoria_id = c.id 
         WHERE p.id = $1 AND p.activo = true`,
        [id]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: "Producto no encontrado" });
      return res.json(result.rows[0]);

    } else if (req.method === "PUT") {
      const { titulo, precio, descripcion } = req.body;
      const result = await pool.query(
        `UPDATE productos SET titulo=$1, precio=$2, descripcion=$3 WHERE id=$4 RETURNING *`,
        [titulo, precio, descripcion, id]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: "Producto no encontrado" });
      return res.json(result.rows[0]);

    } else if (req.method === "DELETE") {
      const result = await pool.query("DELETE FROM productos WHERE id=$1 RETURNING *", [id]);
      if (result.rows.length === 0) return res.status(404).json({ error: "Producto no encontrado" });
      return res.json({ success: true });
    }

    return res.status(405).json({ error: "Método no permitido" });

  } catch (err) {
    console.error("Error en /api/producto:", err);
    return res.status(500).json({ error: "Error en la operación" });
  }
};
