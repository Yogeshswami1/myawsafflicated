import React from 'react';
import styles from './QuickViewPopup.module.css';

const QuickViewPopup = ({ product, onClose }) => {
  const handleAffiliateClick = () => {
    console.log(`Affiliate link clicked: ${product.affiliateLink}`);
    window.open(product.affiliateLink, '_blank');
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
        <div className={styles.content}>
          <img src={product.image} alt={product.name} className={styles.image} />
          <div className={styles.details}>
            <h2>{product.name}</h2>
            <p className={styles.price}>${product.price}</p>
            <p className={styles.rating}>★ {product.rating}</p>

            {/* Key Specs */}
            <h3>Key Specs</h3>
            <ul>
              {Object.entries(product.specs).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>

            {/* Reviews */}
            <h3>Reviews</h3>
            <ul>
              {product.reviews.map((review, index) => (
                <li key={index}>{review}</li>
              ))}
            </ul>

            {/* Buy Now Button */}
            <button className={styles.buyNowBtn} onClick={handleAffiliateClick}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewPopup;