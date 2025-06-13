import React, { useState, useEffect, useCallback } from 'react';
import styles from './DealsReviewsPage.module.css';
import ProductCard from './ProductCard'; // Reuse ProductCard
import axios from 'axios';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const DealsReviewsPage = () => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState({});
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
      const res = await axios.get('https://dummyjson.com/products?limit=10');
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
        discountPercentage: item.discountPercentage || 0, // Add discount percentage
      }));

      // Filter products with high discount or high rating
      const filteredProducts = mappedProducts.filter(
        (product) => product.discountPercentage > 10 || product.rating >= 4.5
      );
      setProducts(filteredProducts);

      // Fetch reviews for each product
      const reviewsData = {};
      for (const product of filteredProducts) {
        try {
          const reviewRes = await axios.get(`https://dummyjson.com/products/${product._id}/reviews`);
          reviewsData[product._id] = reviewRes.data.reviews || [];
        } catch (err) {
          console.error(`Error fetching reviews for product ${product._id}:`, err);
          reviewsData[product._id] = [];
        }
      }
      setReviews(reviewsData);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (products.length === 0) {
    return <div className={styles.loading}>Loading deals...</div>;
  }

  return (
    <div className={styles.dealsPage}>
      <h1 className={styles.title}>Deals & Reviews</h1>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product._id} className={styles.gridItem}>
            <ProductCard product={product} onAddToCart={fetchCart} userUid={userUid} />
            <div className={styles.reviewsSection}>
              <h3>Top Reviews</h3>
              {reviews[product._id] && reviews[product._id].length > 0 ? (
                reviews[product._id].slice(0, 2).map((review, index) => ( // Show only 2 reviews
                  <div key={index} className={styles.review}>
                    <p><strong>{review.reviewerName}</strong> ({review.rating}★): {review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsReviewsPage;