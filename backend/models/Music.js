const mongoose = require('mongoose');

const MusicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  badge: {
    type: String,
    enum: ['ORIGINAL', 'PRÓXIMAMENTE', null],
    default: null
  },
  category: {
    type: String,
    enum: ['latest', 'popular', 'rock', 'pop', 'electronic'],
    required: true
  },
  profile: {
    type: String,
    enum: ['julio', 'irene'],
    required: true
  },
  platform: {
    type: String,
    enum: ['tmoj', 'tmod'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Actualizar la fecha de modificación antes de guardar
MusicSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Music', MusicSchema);
