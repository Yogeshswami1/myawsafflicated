

// import React from 'react';
// import styles from './ProductCard.module.css';
// import { Button } from '@mui/material';
// import axios from 'axios';
// import { motion } from 'framer-motion'; // Import Framer Motion

// const ProductCard = ({ product, onAddToCart, userUid }) => {
//   const renderStars = (rating) => {
//     const stars = Math.round(rating);
//     return '★'.repeat(stars) + '☆'.repeat(5 - stars);
//   };

//   const amazonAffiliateTag = '210afd-21';
//   const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(product.name + ' ' + product.category)}&tag=${amazonAffiliateTag}`;

//   const handleAddToCart = async () => {
//     if (!userUid) {
//       alert('Please login to add items to cart');
//       return;
//     }
//     try {
//       const cartItem = {
//         productId: product._id,
//         name: product.name,
//         price: product.price,
//         quantity: 1,
//         image: product.image,
//       };

//       await axios.post(
//         'http://localhost:5000/api/cart/add',
//         cartItem,
//         {
//           headers: {
//             Authorization: `Bearer ${userUid}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       onAddToCart();
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       alert('Failed to add item to cart');
//     }
//   };

//   return (
//     <motion.div
//       className={styles.card}
//       initial={{ opacity: 0, y: 20 }} // Fade-in effect: start with opacity 0 and slight downward position
//       animate={{ opacity: 1, y: 0 }} // Animate to full opacity and normal position
//       transition={{ duration: 0.5 }} // Animation duration
//       whileHover={{ scale: 1.05 }} // Scale up on hover
//     >
//       <div className={styles.imageWrapper}>
//         <img src={product.image} alt={product.name} className={styles.image} />
//         {!product.inStock && (
//           <div className={styles.outOfStockOverlay}>
//             <span>Out of Stock</span>
//           </div>
//         )}
//       </div>
//       <div className={styles.content}>
//         <h3 className={styles.name}>{product.name}</h3>
//         <div className={styles.rating}>
//           <span className={styles.stars}>{renderStars(product.rating)}</span>
//           <span className={styles.ratingText}>({product.rating})</span>
//         </div>
//         <div className={styles.priceWrapper}>
//           <span className={styles.price}>${product.price}</span>
//         </div>
//         {product.inStock && (
//           <div className={styles.stockBadge}>
//             In Stock
//           </div>
//         )}
//         <div className={styles.buttonWrapper}>
//           <a
//             href={amazonSearchUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className={styles.buyButton}
//           >
//             Buy on Amazon
//           </a>
//           <Button
//             variant="contained"
//             onClick={handleAddToCart}
//             className={styles.addToCartButton}
//             disabled={!product.inStock}
//           >
//             Add to Cart
//           </Button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProductCard;

import React from 'react';
import styles from './ProductCard.module.css';
import { Button } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onAddToCart, userUid }) => {
  const renderStars = (rating) => {
    const stars = Math.round(rating);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  const amazonAffiliateTag = '210afd-21';
  const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(product.name + ' ' + product.category)}&tag=${amazonAffiliateTag}`;

  const handleAddToCart = async () => {
    if (!userUid) {
      alert('Please login to add items to cart');
      return;
    }
    try {
      const cartItem = {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      };

      await axios.post(
        'http://localhost:5000/api/cart/add',
        cartItem,
        {
          headers: {
            Authorization: `Bearer ${userUid}`,
            'Content-Type': 'application/json',
          },
        }
      );
      onAddToCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    }
  };

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className={styles.imageWrapper}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
          loading="lazy" // Add lazy loading for images
        />
        {!product.inStock && (
          <div className={styles.outOfStockOverlay}>
            <span>Out of Stock</span>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.rating}>
          <span className={styles.stars}>{renderStars(product.rating)}</span>
          <span className={styles.ratingText}>({product.rating})</span>
        </div>
        <div className={styles.priceWrapper}>
          <span className={styles.price}>${product.price}</span>
        </div>
        {product.inStock && (
          <div className={styles.stockBadge}>
            In Stock
          </div>
        )}
        <div className={styles.buttonWrapper}>
          <a
            href={amazonSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.buyButton}
          >
            Buy on Amazon
          </a>
          <Button
            variant="contained"
            onClick={handleAddToCart}
            className={styles.addToCartButton}
            disabled={!product.inStock}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;