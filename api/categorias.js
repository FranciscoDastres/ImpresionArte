const { Pool } = require("pg");

// 👇 Se crea el pool una sola vez y se reutiliza en todas las llamadas
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // ej: postgres://user:pass@host:5432/db?sslmode=require
  ssl: true
});

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  try {
    const result = await pool.query("SELECT * FROM categorias ORDER BY nombre");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error en /api/categorias:", err);
    res.status(500).json({ error: "Error al obtener categorías" });
  }
};
