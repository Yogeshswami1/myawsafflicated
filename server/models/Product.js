const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String },
  price: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  image: { type: String },
  tags: { type: [String], default: [] },
  dealScore: { type: Number, default: 0 },
  discountPercentage: { type: Number, default: 0 },
  description: { type: String, default: 'No description available.' },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);