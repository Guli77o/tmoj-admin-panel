const Movie = require('../models/Movie');

// @desc    Obtener todas las películas
// @route   GET /api/movies
// @access  Private
exports.getMovies = async (req, res) => {
  try {
    const { profile, platform, category } = req.query;
    
    // Construir el filtro basado en los parámetros de consulta
    const filter = {};
    if (profile) filter.profile = profile;
    if (platform) filter.platform = platform;
    if (category) filter.category = category;

    const movies = await Movie.find(filter).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener películas',
      error: error.message
    });
  }
};

// @desc    Obtener una película por ID
// @route   GET /api/movies/:id
// @access  Private
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Película no encontrada'
      });
    }
    
    res.json({
      success: true,
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la película',
      error: error.message
    });
  }
};

// @desc    Crear una nueva película
// @route   POST /api/movies
// @access  Private
exports.createMovie = async (req, res) => {
  try {
    const { title, image, url, badge, category, profile, platform } = req.body;
    
    const movie = await Movie.create({
      title,
      image,
      url,
      badge,
      category,
      profile,
      platform
    });
    
    res.status(201).json({
      success: true,
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear la película',
      error: error.message
    });
  }
};

// @desc    Actualizar una película
// @route   PUT /api/movies/:id
// @access  Private
exports.updateMovie = async (req, res) => {
  try {
    const { title, image, url, badge, category, profile, platform } = req.body;
    
    let movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Película no encontrada'
      });
    }
    
    movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title,
        image,
        url,
        badge,
        category,
        profile,
        platform,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la película',
      error: error.message
    });
  }
};

// @desc    Eliminar una película
// @route   DELETE /api/movies/:id
// @access  Private
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Película no encontrada'
      });
    }
    
    await movie.deleteOne();
    
    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la película',
      error: error.message
    });
  }
};
