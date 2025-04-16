const Series = require('../models/Series');

// @desc    Obtener todas las series
// @route   GET /api/series
// @access  Private
exports.getAllSeries = async (req, res) => {
  try {
    const { profile, platform, category } = req.query;
    
    // Construir el filtro basado en los parámetros de consulta
    const filter = {};
    if (profile) filter.profile = profile;
    if (platform) filter.platform = platform;
    if (category) filter.category = category;

    const series = await Series.find(filter).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: series.length,
      data: series
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener series',
      error: error.message
    });
  }
};

// @desc    Obtener una serie por ID
// @route   GET /api/series/:id
// @access  Private
exports.getSeriesById = async (req, res) => {
  try {
    const series = await Series.findById(req.params.id);
    
    if (!series) {
      return res.status(404).json({
        success: false,
        message: 'Serie no encontrada'
      });
    }
    
    res.json({
      success: true,
      data: series
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la serie',
      error: error.message
    });
  }
};

// @desc    Crear una nueva serie
// @route   POST /api/series
// @access  Private
exports.createSeries = async (req, res) => {
  try {
    const { title, image, url, badge, category, profile, platform } = req.body;
    
    const series = await Series.create({
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
      data: series
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear la serie',
      error: error.message
    });
  }
};

// @desc    Actualizar una serie
// @route   PUT /api/series/:id
// @access  Private
exports.updateSeries = async (req, res) => {
  try {
    const { title, image, url, badge, category, profile, platform } = req.body;
    
    let series = await Series.findById(req.params.id);
    
    if (!series) {
      return res.status(404).json({
        success: false,
        message: 'Serie no encontrada'
      });
    }
    
    series = await Series.findByIdAndUpdate(
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
      data: series
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la serie',
      error: error.message
    });
  }
};

// @desc    Eliminar una serie
// @route   DELETE /api/series/:id
// @access  Private
exports.deleteSeries = async (req, res) => {
  try {
    const series = await Series.findById(req.params.id);
    
    if (!series) {
      return res.status(404).json({
        success: false,
        message: 'Serie no encontrada'
      });
    }
    
    await series.deleteOne();
    
    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la serie',
      error: error.message
    });
  }
};
