const express = require('express');
const router = express.Router();
const { getAllSeries, getSeriesById, createSeries, updateSeries, deleteSeries } = require('../controllers/seriesController');
const { protect, authorize } = require('../middlewares/auth');

// Todas las rutas requieren autenticación
router.use(protect);

// Rutas
router.route('/')
  .get(getAllSeries)
  .post(authorize('admin', 'editor'), createSeries);

router.route('/:id')
  .get(getSeriesById)
  .put(authorize('admin', 'editor'), updateSeries)
  .delete(authorize('admin'), deleteSeries);

module.exports = router;
