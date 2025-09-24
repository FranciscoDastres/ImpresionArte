const pool = require('../lib/db'); // Importa tu pool global (o usa directamente tu instancia si no tienes lib/db)

// Obtener todos los productos
exports.getAll = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, c.nombre as categoria_nombre 
      FROM productos p 
      LEFT JOIN categorias c ON p.categoria_id = c.id 
      WHERE p.activo = true 
      ORDER BY p.created_at DESC
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

// Obtener producto por ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT p.*, c.nombre as categoria_nombre 
      FROM productos p 
      LEFT JOIN categorias c ON p.categoria_id = c.id 
      WHERE p.id = $1 AND p.activo = true
    `, [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

// Crear nuevo producto
exports.create = async (req, res) => {
  try {
    const {
      titulo, precio, precio_anterior, descripcion,
      descuento, imagen_principal, imagenes_adicionales,
      categoria_id, stock, activo
    } = req.body;
    const result = await pool.query(`
      INSERT INTO productos 
        (titulo, precio, precio_anterior, descripcion, descuento, imagen_principal, imagenes_adicionales, categoria_id, stock, activo)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *`,
      [titulo, precio, precio_anterior, descripcion, descuento,
       imagen_principal, imagenes_adicionales, categoria_id, stock, activo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear producto" });
  }
};

// Editar un producto
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      titulo, precio, precio_anterior, descripcion,
      descuento, imagen_principal, imagenes_adicionales,
      categoria_id, stock, activo
    } = req.body;
    const result = await pool.query(`
      UPDATE productos SET
        titulo=$1, precio=$2, precio_anterior=$3, descripcion=$4, descuento=$5,
        imagen_principal=$6, imagenes_adicionales=$7, categoria_id=$8, stock=$9, activo=$10
      WHERE id=$11 RETURNING *
    `, [titulo, precio, precio_anterior, descripcion, descuento,
        imagen_principal, imagenes_adicionales, categoria_id, stock, activo, id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al editar producto" });
  }
};

// Eliminar un producto
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM productos WHERE id=$1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};

// Buscar productos
exports.search = async (req, res) => {
  try {
    const q = req.query.q || '';
    if (!q) return res.json([]);
    const result = await pool.query(`
      SELECT p.*, c.nombre as categoria_nombre 
      FROM productos p 
      LEFT JOIN categorias c ON p.categoria_id = c.id 
      WHERE p.activo = true 
      AND (
        p.titulo ILIKE $1 OR p.descripcion ILIKE $1 OR c.nombre ILIKE $1
      )
      ORDER BY p.created_at DESC
    `, [`%${q}%`]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al buscar productos" });
  }
};

// Productos populares
exports.getPopular = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, c.nombre as categoria_nombre 
      FROM productos p 
      LEFT JOIN categorias c ON p.categoria_id = c.id 
      WHERE p.descuento IS NOT NULL AND p.activo = true 
      ORDER BY p.created_at DESC 
      LIMIT 12
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener productos populares" });
  }
};

// Productos por categoría
exports.getByCategory = async (req, res) => {
  try {
    const categoria = req.params.categoria;
    if (!categoria) return res.status(400).json({ error: "Categoría requerida" });
    const result = await pool.query(`
      SELECT p.*, c.nombre AS categoria_nombre 
      FROM productos p 
      LEFT JOIN categorias c ON p.categoria_id = c.id 
      WHERE (c.nombre ILIKE $1 OR CAST(c.id AS TEXT) = $1) 
        AND p.activo = true 
      ORDER BY p.created_at DESC
    `, [categoria]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener productos por categoría" });
  }
};
