const express = require('express');
const router = express.Router();
const pool = require('../db'); // ajusta el path si tu archivo de conexión está en otra carpeta

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categorias');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

module.exports = router;
