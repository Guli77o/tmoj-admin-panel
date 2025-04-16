const express = require('express');
const router = express.Router();
const { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } = require('../controllers/movieController');
const { protect, authorize } = require('../middlewares/auth');

// Todas las rutas requieren autenticación
router.use(protect);

// Rutas
router.route('/')
  .get(getMovies)
  .post(authorize('admin', 'editor'), createMovie);

router.route('/:id')
  .get(getMovieById)
  .put(authorize('admin', 'editor'), updateMovie)
  .delete(authorize('admin'), deleteMovie);

module.exports = router;
