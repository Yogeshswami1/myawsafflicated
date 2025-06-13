import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Shop.module.css';

const Shop = () => {
  return (
    <div className={styles.shopContainer}>
      <h1 className={styles.heading}>Welcome to Our Shop</h1>
      <p className={styles.description}>
        Explore the best deals on electronics, fashion, and more!
      </p>
      <Link to="/shop" className={styles.shopButton}>
        Shop Now
      </Link>
    </div>
  );
};

export default Shop;