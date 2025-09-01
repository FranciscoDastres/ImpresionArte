const express = require("express");
const cors = require("cors");
const pool = require("../backend/db");
require("dotenv").config();
const authRoutes = require('../backend/routes/auth');
const adminRoutes = require('../backend/routes/admin');
const clientRoutes = require('../backend/routes/client');
const { requireAuth, requireAdmin } = require('../backend/middleware/auth');

const app = express();

// Configuración de CORS para Vercel
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

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
        hasDatabaseUrl: !!process.env.DATABASE_URL
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: "Error de conexión a la base de datos", 
      details: error.message
    });
  }
});

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/client', clientRoutes);

// Ruta: obtener todos los productos
app.get("/productos", async (req, res) => {
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
app.get("/productos/:id", async (req, res) => {
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
app.get("/productos/categoria/:categoria", async (req, res) => {
  try {
    const { categoria } = req.params;
    const result = await pool.query(`
      SELECT p.*, c.nombre as categoria_nombre 
      FROM productos p 
      LEFT JOIN categorias c ON p.categoria_id = c.id 
      WHERE c.nombre ILIKE $1 AND p.activo = true 
      ORDER BY p.created_at DESC
    `, [categoria]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener productos por categoría" });
  }
});

// Ruta: obtener todas las categorías
app.get("/categorias", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categorias ORDER BY nombre');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener categorías" });
  }
});

// Ruta: obtener productos populares (con descuento)
app.get("/productos/populares", async (req, res) => {
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
app.get("/productos/buscar", async (req, res) => {
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
app.post('/productos', requireAuth, requireAdmin, async (req, res) => {
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
app.put('/productos/:id', requireAuth, requireAdmin, async (req, res) => {
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
app.delete('/productos/:id', requireAuth, requireAdmin, async (req, res) => {
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

// Exportar para Vercel
module.exports = app;
