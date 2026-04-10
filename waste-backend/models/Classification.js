const mongoose = require('mongoose');

const ClassificationSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  category: { type: String, enum: ['Plastic', 'Metal', 'Trash'], required: true },
  confidence: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Classification', ClassificationSchema);