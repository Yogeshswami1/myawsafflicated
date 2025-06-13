const Product = require('../models/Product');

exports.generateAffiliateLink = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const affiliateTag = process.env.AMAZON_AFFILIATE_TAG || 'myaffiliate-20';
    const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(product.name + ' ' + product.category)}&tag=${affiliateTag}`;
    res.status(200).json({ url: amazonSearchUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error generating affiliate link', error });
  }
};