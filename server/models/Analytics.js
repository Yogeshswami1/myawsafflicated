const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  type: { type: String, required: true }, // 'search' or 'click'
  data: { type: Object, required: true }, // { query } for search, { productId } for click
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Analytics', analyticsSchema);