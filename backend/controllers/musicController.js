const Music = require('../models/Music');

// @desc    Obtener toda la música
// @route   GET /api/music
// @access  Private
exports.getAllMusic = async (req, res) => {
  try {
    const { profile, platform, category } = req.query;
    
    // Construir el filtro basado en los parámetros de consulta
    const filter = {};
    if (profile) filter.profile = profile;
    if (platform) filter.platform = platform;
    if (category) filter.category = category;

    const music = await Music.find(filter).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: music.length,
      data: music
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener música',
      error: error.message
    });
  }
};

// @desc    Obtener una canción por ID
// @route   GET /api/music/:id
// @access  Private
exports.getMusicById = async (req, res) => {
  try {
    const music = await Music.findById(req.params.id);
    
    if (!music) {
      return res.status(404).json({
        success: false,
        message: 'Canción no encontrada'
      });
    }
    
    res.json({
      success: true,
      data: music
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la canción',
      error: error.message
    });
  }
};

// @desc    Crear una nueva canción
// @route   POST /api/music
// @access  Private
exports.createMusic = async (req, res) => {
  try {
    const { title, artist, image, url, badge, category, profile, platform } = req.body;
    
    const music = await Music.create({
      title,
      artist,
      image,
      url,
      badge,
      category,
      profile,
      platform
    });
    
    res.status(201).json({
      success: true,
      data: music
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear la canción',
      error: error.message
    });
  }
};

// @desc    Actualizar una canción
// @route   PUT /api/music/:id
// @access  Private
exports.updateMusic = async (req, res) => {
  try {
    const { title, artist, image, url, badge, category, profile, platform } = req.body;
    
    let music = await Music.findById(req.params.id);
    
    if (!music) {
      return res.status(404).json({
        success: false,
        message: 'Canción no encontrada'
      });
    }
    
    music = await Music.findByIdAndUpdate(
      req.params.id,
      {
        title,
        artist,
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
      data: music
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la canción',
      error: error.message
    });
  }
};

// @desc    Eliminar una canción
// @route   DELETE /api/music/:id
// @access  Private
exports.deleteMusic = async (req, res) => {
  try {
    const music = await Music.findById(req.params.id);
    
    if (!music) {
      return res.status(404).json({
        success: false,
        message: 'Canción no encontrada'
      });
    }
    
    await music.deleteOne();
    
    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la canción',
      error: error.message
    });
  }
};
