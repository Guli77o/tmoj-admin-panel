const express = require('express');
const router = express.Router();
const { getAllMusic, getMusicById, createMusic, updateMusic, deleteMusic } = require('../controllers/musicController');
const { protect, authorize } = require('../middlewares/auth');

// Todas las rutas requieren autenticación
router.use(protect);

// Rutas
router.route('/')
  .get(getAllMusic)
  .post(authorize('admin', 'editor'), createMusic);

router.route('/:id')
  .get(getMusicById)
  .put(authorize('admin', 'editor'), updateMusic)
  .delete(authorize('admin'), deleteMusic);

module.exports = router;
