const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.get('/', productosController.getAll);
router.get('/:id', productosController.getById);
router.get('/categoria/:categoria', productosController.getByCategory);
router.get('/populares', productosController.getPopular);
router.get('/buscar', productosController.search);
router.post('/', requireAuth, requireAdmin, productosController.create);
router.put('/:id', requireAuth, requireAdmin, productosController.update);
router.delete('/:id', requireAuth, requireAdmin, productosController.delete);

module.exports = router;
