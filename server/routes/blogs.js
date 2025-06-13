const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const Blog = require('../models/Blog');

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add blog
router.post('/', auth, upload.single('featuredImage'), async (req, res) => {
  const { title, category, snippet, content, author, readTime, affiliateProducts, metaInfo } = req.body;
  const featuredImage = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const blog = new Blog({
      title,
      category,
      snippet,
      content,
      featuredImage,
      author,
      readTime,
      affiliateProducts: JSON.parse(affiliateProducts),
      metaInfo: JSON.parse(metaInfo),
    });

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update blog
router.put('/:id', auth, upload.single('featuredImage'), async (req, res) => {
  const { title, category, snippet, content, author, readTime, affiliateProducts, metaInfo } = req.body;
  const featuredImage = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
    const updateData = {
      title,
      category,
      snippet,
      content,
      author,
      readTime,
      affiliateProducts: JSON.parse(affiliateProducts),
      metaInfo: JSON.parse(metaInfo),
    };
    if (featuredImage) updateData.featuredImage = featuredImage;

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete blog
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Track blog performance (views)
router.post('/track-view/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.views += 1;
    await blog.save();

    res.json({ message: 'View tracked' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;