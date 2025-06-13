// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import styles from './ProductDetails.module.css';

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [reviewForm, setReviewForm] = useState({
//     user: '',
//     rating: 5,
//     comment: '',
//   });

//   useEffect(() => {
//     fetchProduct();
//     fetchReviews();
//   }, [id]);

//   const fetchProduct = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/products/${id}`);
//       setProduct(res.data);
//     } catch (err) {
//       console.error('Error fetching product:', err);
//     }
//   };

//   const fetchReviews = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/reviews/product/${id}`);
//       setReviews(res.data);
//     } catch (err) {
//       console.error('Error fetching reviews:', err);
//     }
//   };

//   const handleAffiliateClick = async (linkIndex) => {
//     try {
//       await axios.post(`http://localhost:5000/api/products/track-click/${id}`, {
//         linkIndex,
//       });
//     } catch (err) {
//       console.error('Error tracking click:', err);
//     }
//   };

//   const handleReviewInputChange = (e) => {
//     const { name, value } = e.target;
//     setReviewForm({ ...reviewForm, [name]: value });
//   };

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/reviews/submit', {
//         productId: id,
//         user: reviewForm.user,
//         rating: Number(reviewForm.rating),
//         comment: reviewForm.comment,
//       });
//       alert('Review submitted for moderation!');
//       setReviewForm({ user: '', rating: 5, comment: '' });
//     } catch (err) {
//       console.error('Error submitting review:', err);
//       alert('Failed to submit review.');
//     }
//   };

//   if (!product) return <div>Loading...</div>;

//   return (
//     <div className={styles.productDetails}>
//       <div className={styles.productImage}>
//         <img
//           src={product.image || 'https://picsum.photos/400/400?random=1'}
//           alt={product.name}
//         />
//       </div>

//       <div className={styles.productInfo}>
//         <h1>{product.name}</h1>
//         <p className={styles.rating}>Rating: {product.rating} ★</p>
//         <p className={styles.price}>${product.price}</p>
//         <p className={styles.availability}>
//           Availability: {product.inStock ? 'In Stock' : 'Out of Stock'}
//         </p>

//         <div className={styles.tags}>
//           {product.tags.map((tag, index) => (
//             <span key={index} className={styles.tag}>
//               {tag}
//             </span>
//           ))}
//         </div>

//         <div className={styles.affiliateLinks}>
//           <h3>Buy Now:</h3>
//           {product.affiliateLinks.map((link, index) => (
//             <a
//               key={index}
//               href={link.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={() => handleAffiliateClick(index)}
//               className={styles.affiliateLink}
//             >
//               {link.name}
//             </a>
//           ))}
//         </div>

//         <div className={styles.specs}>
//           <h3>Specifications:</h3>
//           <ul>
//             {Object.entries(product.specs).map(([key, value]) => (
//               <li key={key}>
//                 {key}: {value}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className={styles.features}>
//           <h3>Features:</h3>
//           <ul>
//             {Object.entries(product.features).map(([key, value]) => (
//               <li key={key}>
//                 {key}: {value}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className={styles.reviews}>
//           <h3>Customer Reviews</h3>
//           {reviews.length > 0 ? (
//             reviews.map((review) => (
//               <div key={review._id} className={styles.review}>
//                 <p>
//                   <strong>{review.user}</strong> - {review.rating} ★
//                 </p>
//                 <p>{review.comment}</p>
//                 <p className={styles.reviewDate}>
//                   {new Date(review.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p>No reviews yet. Be the first to review!</p>
//           )}
//         </div>

//         <div className={styles.reviewForm}>
//           <h3>Submit a Review</h3>
//           <form onSubmit={handleReviewSubmit}>
//             <div className={styles.formGroup}>
//               <label>Name</label>
//               <input
//                 type="text"
//                 name="user"
//                 value={reviewForm.user}
//                 onChange={handleReviewInputChange}
//                 required
//               />
//             </div>
//             <div className={styles.formGroup}>
//               <label>Rating</label>
//               <select
//                 name="rating"
//                 value={reviewForm.rating}
//                 onChange={handleReviewInputChange}
//                 required
//               >
//                 {[1, 2, 3, 4, 5].map((num) => (
//                   <option key={num} value={num}>
//                     {num} ★
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className={styles.formGroup}>
//               <label>Comment</label>
//               <textarea
//                 name="comment"
//                 value={reviewForm.comment}
//                 onChange={handleReviewInputChange}
//                 required
//               />
//             </div>
//             <button type="submit" className={styles.submitButton}>
//               Submit Review
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import styles from './ProductDetails.module.css';

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/products/${id}`);
//         setProduct(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching product details');
//         setLoading(false);
//         console.error('Error fetching product:', err);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (loading) return <div className={styles.loading}>Loading...</div>;
//   if (error) return <div className={styles.error}>{error}</div>;
//   if (!product) return <div className={styles.error}>Product not found</div>;

//   return (
//     <div className={styles.productDetails}>
//       <div className={styles.mainSection}>
//         {/* Image Section */}
//         <div className={styles.imageSection}>
//           <img
//             src={product.image ? `http://localhost:5000${product.image}` : 'https://via.placeholder.com/400'}
//             alt={product.name}
//             className={styles.productImage}
//           />
//         </div>

//         {/* Details Section */}
//         <div className={styles.detailsSection}>
//           <h1 className={styles.productName}>{product.name}</h1>
//           <div className={styles.rating}>
//             <span>{product.rating} ★</span>
//             <span className={styles.ratingText}>({product.rating} out of 5)</span>
//           </div>
//           <p className={styles.price}>${product.price}</p>
//           <p className={styles.availability}>
//             <strong>Availability:</strong> {product.inStock ? 'In Stock' : 'Out of Stock'}
//           </p>
//           <p className={styles.brand}><strong>Brand:</strong> {product.brand}</p>
//           <p className={styles.category}><strong>Category:</strong> {product.category}</p>
//           <p className={styles.dealScore}><strong>Deal Score:</strong> {product.dealScore}</p>
//           <div className={styles.actionButtons}>
//             <button className={styles.addToCart}>Add to Cart</button>
//             <button className={styles.buyNow}>Buy Now</button>
//           </div>
//         </div>
//       </div>

//       {/* Additional Info Section */}
//       <div className={styles.additionalInfo}>
//         {/* Features */}
//         {product.features && Object.keys(product.features).length > 0 && (
//           <div className={styles.infoSection}>
//             <h3>Features</h3>
//             <ul>
//               {Object.entries(product.features).map(([key, value], index) => (
//                 <li key={index}>{key}: {value}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Specifications */}
//         {product.specs && Object.keys(product.specs).length > 0 && (
//           <div className={styles.infoSection}>
//             <h3>Specifications</h3>
//             <ul>
//               {Object.entries(product.specs).map(([key, value], index) => (
//                 <li key={index}>{key}: {value}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Affiliate Links */}
//         {product.affiliateLinks && product.affiliateLinks.length > 0 && (
//           <div className={styles.infoSection}>
//             <h3>Available at:</h3>
//             <ul>
//               {product.affiliateLinks.map((link, index) => (
//                 <li key={index}>
//                   <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles.affiliateLink}>
//                     Buy from {link.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching product details');
        setLoading(false);
        console.error('Error fetching product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAffiliateClick = async (linkIndex) => {
    try {
      await axios.post(`http://localhost:5000/api/products/${id}/affiliate-click/${linkIndex}`);
    } catch (err) {
      console.error('Error tracking affiliate click:', err);
    }
  };

  const handleBuyNow = async () => {
    try {
      await axios.post(`http://localhost:5000/api/products/${id}/conversion`);
      alert('Purchase recorded!'); // Replace with actual purchase logic
    } catch (err) {
      console.error('Error tracking conversion:', err);
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!product) return <div className={styles.error}>Product not found</div>;

  return (
    <div className={styles.productDetails}>
      <div className={styles.mainSection}>
        <div className={styles.imageSection}>
          <img
            src={product.image ? `http://localhost:5000${product.image}` : 'https://via.placeholder.com/400'}
            alt={product.name}
            className={styles.productImage}
          />
        </div>
        <div className={styles.detailsSection}>
          <h1 className={styles.productName}>{product.name}</h1>
          <div className={styles.rating}>
            <span>{product.rating} ★</span>
            <span className={styles.ratingText}>({product.rating} out of 5)</span>
          </div>
          <p className={styles.price}>${product.price}</p>
          <p className={styles.availability}>
            <strong>Availability:</strong> {product.inStock ? 'In Stock' : 'Out of Stock'}
          </p>
          <p className={styles.brand}><strong>Brand:</strong> {product.brand}</p>
          <p className={styles.category}><strong>Category:</strong> {product.category}</p>
          <p className={styles.dealScore}><strong>Deal Score:</strong> {product.dealScore}</p>
          {product.tags && product.tags.length > 0 && (
            <p className={styles.tags}>
              <strong>Tags:</strong> {product.tags.join(', ')}
            </p>
          )}
          <div className={styles.actionButtons}>
            <button className={styles.addToCart}>Add to Cart</button>
            <button className={styles.buyNow} onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        {product.features && Object.keys(product.features).length > 0 && (
          <div className={styles.infoSection}>
            <h3>Features</h3>
            <ul>
              {Object.entries(product.features).map(([key, value], index) => (
                <li key={index}>{key}: {value}</li>
              ))}
            </ul>
          </div>
        )}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className={styles.infoSection}>
            <h3>Specifications</h3>
            <ul>
              {Object.entries(product.specs).map(([key, value], index) => (
                <li key={index}>{key}: {value}</li>
              ))}
            </ul>
          </div>
        )}
        {product.affiliateLinks && product.affiliateLinks.length > 0 && (
          <div className={styles.infoSection}>
            <h3>Available at:</h3>
            <ul>
              {product.affiliateLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.affiliateLink}
                    onClick={() => handleAffiliateClick(index)}
                  >
                    Buy from {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;