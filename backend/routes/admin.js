const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const router = express.Router();

// ===== RUTAS DE USUARIOS (Solo Admin) =====

// Obtener todos los usuarios
router.get('/usuarios', requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre, email, rol, telefono, direccion, activo, created_at FROM usuarios ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Obtener estadísticas de usuarios
router.get('/usuarios/stats', requireAdmin, async (req, res) => {
  try {
    const totalUsers = await pool.query('SELECT COUNT(*) FROM usuarios');
    const activeUsers = await pool.query('SELECT COUNT(*) FROM usuarios WHERE activo = true');
    const adminUsers = await pool.query('SELECT COUNT(*) FROM usuarios WHERE rol = \'admin\'');
    const clientUsers = await pool.query('SELECT COUNT(*) FROM usuarios WHERE rol = \'cliente\'');
    
    res.json({
      total: parseInt(totalUsers.rows[0].count),
      activos: parseInt(activeUsers.rows[0].count),
      admins: parseInt(adminUsers.rows[0].count),
      clientes: parseInt(clientUsers.rows[0].count)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

// Crear nuevo usuario (admin)
router.post('/usuarios', requireAdmin, async (req, res) => {
  const { nombre, email, password, rol, telefono, direccion } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, rol, telefono, direccion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, nombre, email, rol, telefono, direccion, activo',
      [nombre, email, hashedPassword, rol, telefono, direccion]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error al crear usuario' });
  }
});

// Actualizar usuario
router.put('/usuarios/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { nombre, email, rol, telefono, direccion, activo } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1, email = $2, rol = $3, telefono = $4, direccion = $5, activo = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING id, nombre, email, rol, telefono, direccion, activo',
      [nombre, email, rol, telefono, direccion, activo, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error al actualizar usuario' });
  }
});

// ===== RUTAS DE PRODUCTOS (Solo Admin) =====

// Crear nuevo producto
router.post('/productos', requireAdmin, async (req, res) => {
  const { titulo, precio, precio_anterior, descripcion, descuento, imagen_principal, imagenes_adicionales, categoria_id, stock } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO productos (titulo, precio, precio_anterior, descripcion, descuento, imagen_principal, imagenes_adicionales, categoria_id, stock) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [titulo, precio, precio_anterior, descripcion, descuento, imagen_principal, imagenes_adicionales, categoria_id, stock]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error al crear producto' });
  }
});

// Actualizar producto
router.put('/productos/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { titulo, precio, precio_anterior, descripcion, descuento, imagen_principal, imagenes_adicionales, categoria_id, stock, activo } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE productos SET titulo = $1, precio = $2, precio_anterior = $3, descripcion = $4, descuento = $5, imagen_principal = $6, imagenes_adicionales = $7, categoria_id = $8, stock = $9, activo = $10, updated_at = CURRENT_TIMESTAMP WHERE id = $11 RETURNING *',
      [titulo, precio, precio_anterior, descripcion, descuento, imagen_principal, imagenes_adicionales, categoria_id, stock, activo, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error al actualizar producto' });
  }
});

// Eliminar producto (desactivar)
router.delete('/productos/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      'UPDATE productos SET activo = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING id',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json({ message: 'Producto desactivado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error al desactivar producto' });
  }
});

// ===== RUTAS DE PEDIDOS (Solo Admin) =====

// Obtener todos los pedidos
router.get('/pedidos', requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, u.nombre as cliente_nombre, u.email as cliente_email
      FROM pedidos p
      JOIN usuarios u ON p.usuario_id = u.id
      ORDER BY p.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});

// Actualizar estado de pedido
router.put('/pedidos/:id/estado', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE pedidos SET estado = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [estado, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error al actualizar estado del pedido' });
  }
});

// Obtener estadísticas generales
router.get('/stats', requireAdmin, async (req, res) => {
  try {
    const totalUsers = await pool.query('SELECT COUNT(*) FROM usuarios');
    const totalProducts = await pool.query('SELECT COUNT(*) FROM productos WHERE activo = true');
    const totalOrders = await pool.query('SELECT COUNT(*) FROM pedidos');
    const totalRevenue = await pool.query('SELECT COALESCE(SUM(total), 0) FROM pedidos WHERE estado != \'cancelado\'');
    
    res.json({
      usuarios: parseInt(totalUsers.rows[0].count),
      productos: parseInt(totalProducts.rows[0].count),
      pedidos: parseInt(totalOrders.rows[0].count),
      ingresos: parseFloat(totalRevenue.rows[0].coalesce)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

module.exports = router;
