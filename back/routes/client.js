const express = require('express');
const pool = require('../lib/db');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

// ===== RUTAS DE PERFIL DE CLIENTE =====

// Obtener perfil del usuario autenticado
router.get('/perfil', requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre, email, rol, telefono, direccion, created_at FROM usuarios WHERE id = $1',
      [req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
});

// Actualizar perfil del usuario
router.put('/perfil', requireAuth, async (req, res) => {
  const { nombre, telefono, direccion } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1, telefono = $2, direccion = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING id, nombre, email, rol, telefono, direccion',
      [nombre, telefono, direccion, req.user.id]
    );
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error al actualizar perfil' });
  }
});

// ===== RUTAS DE PEDIDOS DEL CLIENTE =====

// Obtener pedidos del usuario autenticado
router.get('/pedidos', requireAuth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, 
             json_agg(
               json_build_object(
                 'id', pi.id,
                 'producto_id', pi.producto_id,
                 'cantidad', pi.cantidad,
                 'precio_unitario', pi.precio_unitario,
                 'subtotal', pi.subtotal,
                 'producto', json_build_object(
                   'titulo', pr.titulo,
                   'imagen_principal', pr.imagen_principal
                 )
               )
             ) as items
      FROM pedidos p
      LEFT JOIN pedido_items pi ON p.id = pi.pedido_id
      LEFT JOIN productos pr ON pi.producto_id = pr.id
      WHERE p.usuario_id = $1
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `, [req.user.id]);
    
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});

// Obtener un pedido específico del usuario
router.get('/pedidos/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(`
      SELECT p.*, 
             json_agg(
               json_build_object(
                 'id', pi.id,
                 'producto_id', pi.producto_id,
                 'cantidad', pi.cantidad,
                 'precio_unitario', pi.precio_unitario,
                 'subtotal', pi.subtotal,
                 'producto', json_build_object(
                   'titulo', pr.titulo,
                   'imagen_principal', pr.imagen_principal,
                   'descripcion', pr.descripcion
                 )
               )
             ) as items
      FROM pedidos p
      LEFT JOIN pedido_items pi ON p.id = pi.pedido_id
      LEFT JOIN productos pr ON pi.producto_id = pr.id
      WHERE p.id = $1 AND p.usuario_id = $2
      GROUP BY p.id
    `, [id, req.user.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener pedido' });
  }
});

// Crear nuevo pedido
router.post('/pedidos', requireAuth, async (req, res) => {
  const { items, direccion_envio, telefono_contacto, notas } = req.body;
  
  try {
    // Calcular total
    let total = 0;
    for (const item of items) {
      const productResult = await pool.query('SELECT precio FROM productos WHERE id = $1', [item.producto_id]);
      if (productResult.rows.length === 0) {
        return res.status(400).json({ error: `Producto ${item.producto_id} no encontrado` });
      }
      total += productResult.rows[0].precio * item.cantidad;
    }
    
    // Crear pedido
    const pedidoResult = await pool.query(
      'INSERT INTO pedidos (usuario_id, total, direccion_envio, telefono_contacto, notas) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, total, direccion_envio, telefono_contacto, notas]
    );
    
    const pedidoId = pedidoResult.rows[0].id;
    
    // Crear items del pedido
    for (const item of items) {
      const productResult = await pool.query('SELECT precio FROM productos WHERE id = $1', [item.producto_id]);
      const precio = productResult.rows[0].precio;
      const subtotal = precio * item.cantidad;
      
      await pool.query(
        'INSERT INTO pedido_items (pedido_id, producto_id, cantidad, precio_unitario, subtotal) VALUES ($1, $2, $3, $4, $5)',
        [pedidoId, item.producto_id, item.cantidad, precio, subtotal]
      );
      
      // Actualizar stock
      await pool.query(
        'UPDATE productos SET stock = stock - $1 WHERE id = $2',
        [item.cantidad, item.producto_id]
      );
    }
    
    res.json(pedidoResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error al crear pedido' });
  }
});

// Cancelar pedido (solo si está pendiente)
router.put('/pedidos/:id/cancelar', requireAuth, async (req, res) => {
  const { id } = req.params;
  
  try {
    // Verificar que el pedido pertenece al usuario y está pendiente
    const pedidoResult = await pool.query(
      'SELECT estado FROM pedidos WHERE id = $1 AND usuario_id = $2',
      [id, req.user.id]
    );
    
    if (pedidoResult.rows.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    
    if (pedidoResult.rows[0].estado !== 'pendiente') {
      return res.status(400).json({ error: 'Solo se pueden cancelar pedidos pendientes' });
    }
    
    // Cancelar pedido
    await pool.query(
      'UPDATE pedidos SET estado = \'cancelado\', updated_at = CURRENT_TIMESTAMP WHERE id = $1',
      [id]
    );
    
    // Restaurar stock
    const itemsResult = await pool.query(
      'SELECT producto_id, cantidad FROM pedido_items WHERE pedido_id = $1',
      [id]
    );
    
    for (const item of itemsResult.rows) {
      await pool.query(
        'UPDATE productos SET stock = stock + $1 WHERE id = $2',
        [item.cantidad, item.producto_id]
      );
    }
    
    res.json({ message: 'Pedido cancelado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error al cancelar pedido' });
  }
});

// ===== RUTAS DE PRODUCTOS PARA CLIENTES =====

// Obtener productos activos
router.get('/productos', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, c.nombre as categoria_nombre 
      FROM productos p 
      LEFT JOIN categorias c ON p.categoria_id = c.id 
      WHERE p.activo = true AND p.stock > 0
      ORDER BY p.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Obtener producto por ID
router.get('/productos/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(`
      SELECT p.*, c.nombre as categoria_nombre 
      FROM productos p 
      LEFT JOIN categorias c ON p.categoria_id = c.id 
      WHERE p.id = $1 AND p.activo = true
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

module.exports = router;
