const { Pool } = require("pg");

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
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

    if (req.method === 'GET') {
      // Obtener producto por ID
      const { id } = req.query;
      if (!id) {
        // Cerrar la conexión
        await pool.end();
        return res.status(400).json({ error: 'ID de producto requerido' });
      }

      const result = await pool.query(`
        SELECT p.*, c.nombre as categoria_nombre 
        FROM productos p 
        LEFT JOIN categorias c ON p.categoria_id = c.id 
        WHERE p.id = $1 AND p.activo = true
      `, [id]);
      
      if (result.rows.length === 0) {
        // Cerrar la conexión
        await pool.end();
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      
      // Cerrar la conexión
      await pool.end();
      
      res.json(result.rows[0]);
    } else if (req.method === 'PUT') {
      // Editar producto (simplificado para demo)
      const { id } = req.query;
      const { titulo, precio, descripcion } = req.body;
      
      const result = await pool.query(
        `UPDATE productos SET titulo=$1, precio=$2, descripcion=$3 WHERE id=$4 RETURNING *`,
        [titulo, precio, descripcion, id]
      );
      
      if (result.rows.length === 0) {
        // Cerrar la conexión
        await pool.end();
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      
      // Cerrar la conexión
      await pool.end();
      
      res.json(result.rows[0]);
    } else if (req.method === 'DELETE') {
      // Eliminar producto (simplificado para demo)
      const { id } = req.query;
      
      const result = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        // Cerrar la conexión
        await pool.end();
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      
      // Cerrar la conexión
      await pool.end();
      
      res.json({ success: true });
    } else {
      // Cerrar la conexión
      await pool.end();
      res.status(405).json({ error: 'Método no permitido' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en la operación" });
  }
};
