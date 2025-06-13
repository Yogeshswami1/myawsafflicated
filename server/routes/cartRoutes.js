const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

// Middleware to extract user UID from Authorization header
const getUserUid = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const uid = token;
  if (!uid) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }

  req.userUid = uid;
  next();
};

// Test Firestore connection
router.get('/test-firestore', async (req, res) => {
  try {
    const testRef = db.collection('test').doc('testDoc');
    await testRef.set({ message: 'Firestore connection successful' });
    res.status(200).json({ message: 'Firestore test successful' });
  } catch (error) {
    console.error('Firestore test error:', error);
    res.status(500).json({ message: 'Firestore test failed', error: error.message });
  }
});

// Add item to cart
router.post('/add', getUserUid, async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is missing' });
    }

    const { userUid } = req;
    const { productId, name, price, quantity, image } = req.body;

    console.log('Adding item to cart for user:', userUid);
    console.log('Request body:', req.body);

    if (!productId || !name || !price || !quantity || !image) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const cartRef = db.collection('carts').doc(userUid);
    console.log('Fetching cart for user:', userUid);
    const cartDoc = await cartRef.get();

    let updatedCart = [];
    if (cartDoc.exists) {
      console.log('Cart exists, updating...');
      const cartData = cartDoc.data().items || [];
      const existingItemIndex = cartData.findIndex(item => item.productId === productId);

      if (existingItemIndex !== -1) {
        cartData[existingItemIndex].quantity += quantity;
        updatedCart = cartData;
      } else {
        updatedCart = [...cartData, { productId, name, price, quantity, image }];
      }
    } else {
      console.log('Cart does not exist, creating new...');
      updatedCart = [{ productId, name, price, quantity, image }];
    }

    console.log('Saving cart:', updatedCart);
    await cartRef.set({ items: updatedCart });
    res.status(200).json({ message: 'Item added to cart', cart: updatedCart });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ 
      message: 'Error adding item to cart', 
      error: error.message || 'Unknown Firestore error',
      code: error.code || 'UNKNOWN'
    });
  }
});

// Fetch user cart
router.get('/', getUserUid, async (req, res) => {
  try {
    const { userUid } = req;
    console.log('Fetching cart for user:', userUid);

    const cartRef = db.collection('carts').doc(userUid);
    const cartDoc = await cartRef.get();

    if (!cartDoc.exists) {
      return res.status(200).json({ message: 'Cart is empty', cart: [] });
    }

    const cartData = cartDoc.data().items || [];
    res.status(200).json({ message: 'Cart fetched successfully', cart: cartData });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ 
      message: 'Error fetching cart', 
      error: error.message || 'Unknown Firestore error',
      code: error.code || 'UNKNOWN'
    });
  }
});

// Remove item from cart
router.delete('/remove/:productId', getUserUid, async (req, res) => {
  try {
    const { userUid } = req;
    const { productId } = req.params;

    console.log(`Removing product ${productId} from cart for user: ${userUid}`);

    const cartRef = db.collection('carts').doc(userUid);
    const cartDoc = await cartRef.get();

    if (!cartDoc.exists) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cartData = cartDoc.data().items || [];
    const updatedCart = cartData.filter(item => item.productId !== productId);

    if (cartData.length === updatedCart.length) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    await cartRef.set({ items: updatedCart });
    res.status(200).json({ message: 'Item removed from cart', cart: updatedCart });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ 
      message: 'Error removing item from cart', 
      error: error.message || 'Unknown Firestore error',
      code: error.code || 'UNKNOWN'
    });
  }
});

module.exports = router;