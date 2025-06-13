const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Review = require('../models/Review');

// Get all reviews (Admin only)
router.get('/', auth, async (req, res) => {
  try {
    const reviews = await Review.find().populate('productId', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve/Reject review (Admin only)
router.put('/:id', auth, async (req, res) => {
  const { status, isSpam } = req.body;

  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    review.status = status || review.status;
    review.isSpam = isSpam !== undefined ? isSpam : review.isSpam;

    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get star rating breakdown for a product (Admin only)
router.get('/breakdown/:productId', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId, status: 'approved' });
    const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach((review) => {
      breakdown[review.rating] += 1;
    });

    res.json(breakdown);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit a review (Public route for users)
router.post('/submit', async (req, res) => {
  const { productId, user, rating, comment } = req.body;

  try {
    const review = new Review({
      productId,
      user,
      rating,
      comment,
    });

    await review.save();
    res.json({ message: 'Review submitted for moderation' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get approved reviews for a product (Public route for frontend)
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
      status: 'approved',
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;