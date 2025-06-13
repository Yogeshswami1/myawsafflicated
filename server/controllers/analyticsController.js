const Analytics = require('../models/Analytics');

exports.logSearch = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    const analytics = new Analytics({
      type: 'search',
      data: { query },
    });
    await analytics.save();
    res.status(200).json({ message: 'Search logged' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging search', error });
  }
};

exports.logClick = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    const analytics = new Analytics({
      type: 'click',
      data: { productId },
    });
    await analytics.save();
    res.status(200).json({ message: 'Click logged' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging click', error });
  }
};