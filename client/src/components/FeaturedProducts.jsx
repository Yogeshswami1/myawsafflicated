import React, { useState, useEffect, useCallback } from 'react';
import styles from './FeaturedProducts.module.css';
import ProductCard from './ProductCard'; // Import ProductCard from ShopPage
import axios from 'axios';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
      } else {
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchCart = async () => {
    // Dummy function to match ProductCard props
  };

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get('https://dummyjson.com/products?limit=10'); // Same API as ShopPage
      const mappedProducts = res.data.products.map((item) => ({
        _id: item.id.toString(),
        name: item.title,
        category: item.category,
        brand: item.brand || item.category.split(' ')[0],
        price: item.price,
        inStock: item.stock > 0,
        rating: item.rating,
        image: item.thumbnail,
        tags: item.rating >= 4.5 ? ['top-seller'] : [],
        dealScore: item.rating * 2,
      }));

      setProducts(mappedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (products.length === 0) {
    return <div>Loading products...</div>;
  }

  return (
    <section className={styles.featuredSection}>
      <h2 className={styles.title}>Featured Products</h2>
      <div className={styles.productRow}>
        {products.map((product) => (
          <div key={product._id} className={styles.gridItem}>
            <ProductCard product={product} onAddToCart={fetchCart} userUid={userUid} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;