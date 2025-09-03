const pool = require("../backend/db");

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // Obtener todos los productos
      const result = await pool.query(`
        SELECT p.*, c.nombre as categoria_nombre 
        FROM productos p 
        LEFT JOIN categorias c ON p.categoria_id = c.id 
        WHERE p.activo = true 
        ORDER BY p.created_at DESC
      `);
      res.json(result.rows);
    } else if (req.method === 'POST') {
      // Crear producto (solo admin)
      const { titulo, precio, precio_anterior, descripcion, descuento, imagen_principal, imagenes_adicionales, categoria_id, stock, activo } = req.body;
      const result = await pool.query(
        `INSERT INTO productos (titulo, precio, precio_anterior, descripcion, descuento, imagen_principal, imagenes_adicionales, categoria_id, stock, activo, usuario_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
        [titulo, precio, precio_anterior, descripcion, descuento, imagen_principal, imagenes_adicionales, categoria_id, stock, activo, 1] // usuario_id hardcodeado por ahora
      );
      res.status(201).json(result.rows[0]);
    } else {
      res.status(405).json({ error: 'Método no permitido' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en la operación" });
  }
};
