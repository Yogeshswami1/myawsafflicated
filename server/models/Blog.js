const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  snippet: { type: String, required: true },
  content: { type: String, required: true }, // Markdown or HTML content
  featuredImage: { type: String },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  readTime: { type: Number, required: true },
  affiliateProducts: [
    {
      name: { type: String, required: true },
      link: { type: String, required: true },
    },
  ],
  metaInfo: {
    title: { type: String },
    description: { type: String },
    keywords: [{ type: String }],
  },
  views: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
});

module.exports = mongoose.model('Blog', BlogSchema);