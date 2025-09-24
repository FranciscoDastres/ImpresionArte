const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const clientRoutes = require('./routes/client');
const { requireAuth, requireAdmin } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check para el despliegue
app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando correctamente", timestamp: new Date().toISOString() });
});

// Test de conexión a la base de datos
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      message: "Conexión a la base de datos exitosa", 
      timestamp: result.rows[0].now,
      dbConfig: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        hasPassword: !!process.env.DB_PASSWORD,
        hasDatabaseUrl: !!process.env.DATABASE_URL
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: "Error de conexión a la base de datos", 
      details: error.message,
      dbConfig: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        hasPassword: !!process.env.DB_PASSWORD,
        hasDatabaseUrl: !!process.env.DATABASE_URL
      }
    });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/client', clientRoutes);

// Ruta: obtener todos los productos
app.get("/api/productos", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, c.nombre as categoria_nombre 
      FROM productos p 
      LEFT JOIN categorias c ON p.categoria_id = c.id 
      WHERE p.activo = true 
      ORDER BY p.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Ruta: obtener producto por ID
app.get("/api/productos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT p.*, c.nombre as categoria_nombre 
      FROM productos p 
      LEFT JOIN categorias c ON p.categoria_id = c.id 
      WHERE p.id = $1 AND p.activo = true
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

// Ruta: obtener productos por categoría
app.get("/api/productos/categoria/:categoria", async (req, res) => {
  try {
    const { categoria } = req.params;
    const result = await pool.query(`
      SELECT p.*, c.nombre as categoria_nombre 
      FROM productos p 
      LEFT JOIN categorias c ON p.categoria_id = c.id 
      WHERE c.nombre = $1 AND p.activo = true 
      ORDER BY p.created_at DESC
    `, [categoria]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener productos por categoría" });
  }
});

// Ruta: obtener todas las categorías
app.get("/api/categorias", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categorias ORDER BY nombre");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener categorías" });
  }
});

// Ruta: obtener productos populares (con descuento)
app.get("/api/productos/populares", async (req, res) => {
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
});

// Ruta: buscar productos
app.get("/api/productos/buscar", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
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
    
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al buscar productos" });
  }
});

// Ruta: crear producto (solo admin)
app.post('/api/productos', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { titulo, precio, precio_anterior, descripcion, descuento, imagen_principal, imagenes_adicionales, categoria_id, stock, activo } = req.body;
    const result = await pool.query(
      `INSERT INTO productos (titulo, precio, precio_anterior, descripcion, descuento, imagen_principal, imagenes_adicionales, categoria_id, stock, activo, usuario_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [titulo, precio, precio_anterior, descripcion, descuento, imagen_principal, imagenes_adicionales, categoria_id, stock, activo, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// Ruta: editar producto (solo admin)
app.put('/api/productos/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, precio, precio_anterior, descripcion, descuento, imagen_principal, imagenes_adicionales, categoria_id, stock, activo } = req.body;
    const result = await pool.query(
      `UPDATE productos SET titulo=$1, precio=$2, precio_anterior=$3, descripcion=$4, descuento=$5, imagen_principal=$6, imagenes_adicionales=$7, categoria_id=$8, stock=$9, activo=$10 WHERE id=$11 RETURNING *`,
      [titulo, precio, precio_anterior, descripcion, descuento, imagen_principal, imagenes_adicionales, categoria_id, stock, activo, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al editar producto' });
  }
});

// Ruta: eliminar producto (solo admin)
app.delete('/api/productos/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
