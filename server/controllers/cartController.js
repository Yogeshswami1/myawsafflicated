const Product = require('../models/Product');

// Validate cart items
exports.validateCartItems = async (req, res) => {
  try {
    const { items } = req.body; // Array of { productId, quantity }
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: 'Invalid cart items' });
    }

    const validatedItems = [];
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        continue; // Skip if product not found
      }
      if (!product.inStock || product.stock < item.quantity) {
        continue; // Skip if out of stock
      }
      validatedItems.push({
        productId: item.productId,
        quantity: item.quantity,
        product: {
          name: product.name,
          price: product.price,
          image: product.image,
        },
      });
    }

    res.status(200).json(validatedItems);
  } catch (error) {
    res.status(500).json({ message: 'Error validating cart items', error });
  }
};

// Validate wishlist items
exports.validateWishlistItems = async (req, res) => {
  try {
    const { items } = req.body; // Array of productIds
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: 'Invalid wishlist items' });
    }

    const validatedItems = [];
    for (const productId of items) {
      const product = await Product.findById(productId);
      if (!product) {
        continue; // Skip if product not found
      }
      validatedItems.push({
        productId,
        product: {
          name: product.name,
          price: product.price,
          image: product.image,
        },
      });
    }

    res.status(200).json(validatedItems);
  } catch (error) {
    res.status(500).json({ message: 'Error validating wishlist items', error });
  }
};