

// import React, { useState, useEffect, useCallback } from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import styles from './ShopPage.module.css';
// import ProductCard from './ProductCard';
// import axios from 'axios';
// import { IconButton, Badge, Modal, Box, Typography, Button } from '@mui/material';
// import { FaShoppingCart } from 'react-icons/fa';
// import { auth } from '../firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

// const ShopPage = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [priceRange, setPriceRange] = useState([0, 1000]);
//   const [ratingFilter, setRatingFilter] = useState(0);
//   const [categories, setCategories] = useState([]);
//   const [cartCount, setCartCount] = useState(0);
//   const [cartItems, setCartItems] = useState([]);
//   const [openCartModal, setOpenCartModal] = useState(false);
//   const [userUid, setUserUid] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUserUid(user.uid);
//       } else {
//         setUserUid(null);
//         setCartItems([]);
//         setCartCount(0);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const fetchCart = async () => {
//     if (!userUid) return;
//     try {
//       const response = await axios.get('http://localhost:5000/api/cart', {
//         headers: {
//           Authorization: `Bearer ${userUid}`,
//         },
//       });
//       const items = response.data.cart || [];
//       setCartItems(items);
//       setCartCount(items.length);
//     } catch (error) {
//       console.error('Error fetching cart:', error);
//     }
//   };

//   const fetchProducts = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError('');
//       const res = await axios.get('https://dummyjson.com/products?limit=100');
//       const mappedProducts = res.data.products.map((item) => ({
//         _id: item.id.toString(),
//         name: item.title,
//         category: item.category,
//         brand: item.brand || item.category.split(' ')[0],
//         price: item.price,
//         inStock: item.stock > 0,
//         rating: item.rating,
//         image: item.thumbnail,
//         tags: [],
//         dealScore: item.rating * 2,
//       }));

//       const updatedProducts = mappedProducts.map((product) => ({
//         ...product,
//         tags: product.rating >= 4.5 ? ['top-seller'] : [],
//       }));

//       setProducts(updatedProducts);
//       setFilteredProducts(updatedProducts);
//     } catch (err) {
//       console.error('Error fetching products:', err);
//       setError('Failed to load products. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const fetchCategories = useCallback(async () => {
//     try {
//       const res = await axios.get('https://dummyjson.com/products/categories');
//       setCategories(res.data);
//     } catch (err) {
//       console.error('Error fetching categories:', err);
//     }
//   }, []);

//   const updateFilteredProducts = useCallback(async () => {
//     setLoading(true);
//     setError('');
//     let filtered = [...products];

//     if (searchQuery) {
//       try {
//         const res = await axios.get(`https://dummyjson.com/products/search?q=${searchQuery}`);
//         filtered = res.data.products.map((item) => ({
//           _id: item.id.toString(),
//           name: item.title,
//           category: item.category,
//           brand: item.brand || item.category.split(' ')[0],
//           price: item.price,
//           inStock: item.stock > 0,
//           rating: item.rating,
//           image: item.thumbnail,
//           tags: item.rating >= 4.5 ? ['top-seller'] : [],
//           dealScore: item.rating * 2,
//         }));
//       } catch (err) {
//         console.error('Error searching products:', err);
//         setError('Failed to search products. Please try again.');
//         setLoading(false);
//         return;
//       }
//     }

//     if (categoryFilter) {
//       filtered = filtered.filter((product) => product.category === categoryFilter);
//     }

//     filtered = filtered.filter(
//       (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
//     );

//     if (ratingFilter > 0) {
//       filtered = filtered.filter((product) => product.rating >= ratingFilter);
//     }

//     setFilteredProducts(filtered);
//     setLoading(false);
//   }, [products, searchQuery, categoryFilter, priceRange, ratingFilter]);

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, [fetchProducts, fetchCategories]);

//   useEffect(() => {
//     if (products.length > 0) {
//       updateFilteredProducts();
//     }
//   }, [products, searchQuery, categoryFilter, priceRange, ratingFilter, updateFilteredProducts]);

//   useEffect(() => {
//     fetchCart();
//   }, [userUid]);

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     centerMode: false,
//     centerPadding: '0px',
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 4,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   const handleRemoveFromCart = async (productId) => {
//     if (!userUid) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`, {
//         headers: {
//           Authorization: `Bearer ${userUid}`,
//         },
//       });
//       fetchCart();
//     } catch (error) {
//       console.error('Error removing item from cart:', error);
//       alert('Failed to remove item from cart');
//     }
//   };

//   // Skeleton Loader Component for a single card
//   const SkeletonCard = () => (
//     <div className={styles.sliderItem}>
//       <div className={styles.cardSkeleton}>
//         <Skeleton height={150} width="100%" />
//         <Skeleton height={20} width="80%" style={{ marginTop: 8 }} />
//         <Skeleton height={15} width="50%" style={{ marginTop: 8 }} />
//         <Skeleton height={20} width="40%" style={{ marginTop: 8 }} />
//         <Skeleton height={35} width="100%" style={{ marginTop: 8 }} />
//         <Skeleton height={35} width="100%" style={{ marginTop: 8 }} />
//       </div>
//     </div>
//   );

//   return (
//     <div className={styles.shopPage}>
//       <div className={styles.searchBar}>
//         <input
//           type="text"
//           placeholder="Search for products..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className={styles.searchInput}
//         />
//       </div>

//       <div className={styles.filterSection}>
//         <div className={styles.filterItem}>
//           <label>Category:</label>
//           <select
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//             className={styles.filterSelect}
//           >
//             <option value="">All Categories</option>
//             {categories.map((category) => (
//               <option key={category.slug} value={category.slug}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className={styles.filterItem}>
//           <label>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
//           <input
//             type="range"
//             min="0"
//             max="1000"
//             value={priceRange[0]}
//             onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
//             className={styles.rangeInput}
//           />
//           <input
//             type="range"
//             min="0"
//             max="1000"
//             value={priceRange[1]}
//             onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
//             className={styles.rangeInput}
//           />
//         </div>

//         <div className={styles.filterItem}>
//           <label>Minimum Rating:</label>
//           <select
//             value={ratingFilter}
//             onChange={(e) => setRatingFilter(Number(e.target.value))}
//             className={styles.filterSelect}
//           >
//             <option value="0">All Ratings</option>
//             <option value="1">1★ & above</option>
//             <option value="2">2★ & above</option>
//             <option value="3">3★ & above</option>
//             <option value="4">4★ & above</option>
//             <option value="5">5★</option>
//           </select>
//         </div>
//       </div>

//       {error && <p className={styles.error}>{error}</p>}

//       <div className={styles.mainContent}>
//         {searchQuery && (
//           <section className={styles.section}>
//             <h2 className={styles.sectionTitle}>Search Results for "{searchQuery}"</h2>
//             {loading ? (
//               <Slider {...sliderSettings}>
//                 {Array(5).fill().map((_, index) => (
//                   <SkeletonCard key={index} />
//                 ))}
//               </Slider>
//             ) : filteredProducts.length > 0 ? (
//               <Slider {...sliderSettings}>
//                 {filteredProducts.map((product) => (
//                   <div key={product._id} className={styles.sliderItem}>
//                     <ProductCard product={product} onAddToCart={fetchCart} userUid={userUid} />
//                   </div>
//                 ))}
//               </Slider>
//             ) : (
//               <p>No products found for "{searchQuery}".</p>
//             )}
//           </section>
//         )}

//         {!searchQuery && (
//           <>
//             {loading ? (
//               <>
//                 <section className={styles.section}>
//                   <h2 className={styles.sectionTitle}>Top Selling Products</h2>
//                   <Slider {...sliderSettings}>
//                     {Array(5).fill().map((_, index) => (
//                       <SkeletonCard key={index} />
//                     ))}
//                   </Slider>
//                 </section>
//                 <section className={styles.section}>
//                   <h2 className={styles.sectionTitle}>Beauty Products</h2>
//                   <Slider {...sliderSettings}>
//                     {Array(5).fill().map((_, index) => (
//                       <SkeletonCard key={index} />
//                     ))}
//                   </Slider>
//                 </section>
//                 <section className={styles.section}>
//                   <h2 className={styles.sectionTitle}>Electronics Products</h2>
//                   <Slider {...sliderSettings}>
//                     {Array(5).fill().map((_, index) => (
//                       <SkeletonCard key={index} />
//                     ))}
//                   </Slider>
//                 </section>
//                 <section className={styles.section}>
//                   <h2 className={styles.sectionTitle}>Daily Usable Products</h2>
//                   <Slider {...sliderSettings}>
//                     {Array(5).fill().map((_, index) => (
//                       <SkeletonCard key={index} />
//                     ))}
//                   </Slider>
//                 </section>
//               </>
//             ) : (
//               <>
//                 {filteredProducts.filter((product) => product.tags.includes('top-seller')).length > 0 && (
//                   <section className={styles.section}>
//                     <h2 className={styles.sectionTitle}>Top Selling Products</h2>
//                     <Slider {...sliderSettings}>
//                       {filteredProducts
//                         .filter((product) => product.tags.includes('top-seller'))
//                         .slice(0, 10)
//                         .map((product) => (
//                           <div key={product._id} className={styles.sliderItem}>
//                             <ProductCard product={product} onAddToCart={fetchCart} userUid={userUid} />
//                           </div>
//                         ))}
//                     </Slider>
//                   </section>
//                 )}

//                 {filteredProducts.filter((product) =>
//                   ['beauty', 'fragrances'].includes(product.category.toLowerCase())
//                 ).length > 0 && (
//                   <section className={styles.section}>
//                     <h2 className={styles.sectionTitle}>Beauty Products</h2>
//                     <Slider {...sliderSettings}>
//                       {filteredProducts
//                         .filter((product) =>
//                           ['beauty', 'fragrances'].includes(product.category.toLowerCase())
//                         )
//                         .slice(0, 10)
//                         .map((product) => (
//                           <div key={product._id} className={styles.sliderItem}>
//                             <ProductCard product={product} onAddToCart={fetchCart} userUid={userUid} />
//                           </div>
//                         ))}
//                     </Slider>
//                   </section>
//                 )}

//                 {filteredProducts.filter((product) =>
//                   ['smartphones', 'laptops', 'electronics'].includes(product.category.toLowerCase())
//                 ).length > 0 && (
//                   <section className={styles.section}>
//                     <h2 className={styles.sectionTitle}>Electronics Products</h2>
//                     <Slider {...sliderSettings}>
//                       {filteredProducts
//                         .filter((product) =>
//                           ['smartphones', 'laptops', 'electronics'].includes(product.category.toLowerCase())
//                         )
//                         .slice(0, 10)
//                         .map((product) => (
//                           <div key={product._id} className={styles.sliderItem}>
//                             <ProductCard product={product} onAddToCart={fetchCart} userUid={userUid} />
//                           </div>
//                         ))}
//                     </Slider>
//                   </section>
//                 )}

//                 {filteredProducts.filter((product) =>
//                   ['groceries', 'home-decoration', 'kitchen-accessories'].includes(product.category.toLowerCase())
//                 ).length > 0 && (
//                   <section className={styles.section}>
//                     <h2 className={styles.sectionTitle}>Daily Usable Products</h2>
//                     <Slider {...sliderSettings}>
//                       {filteredProducts
//                         .filter((product) =>
//                           ['groceries', 'home-decoration', 'kitchen-accessories'].includes(product.category.toLowerCase())
//                         )
//                         .slice(0, 10)
//                         .map((product) => (
//                           <div key={product._id} className={styles.sliderItem}>
//                             <ProductCard product={product} onAddToCart={fetchCart} userUid={userUid} />
//                           </div>
//                         ))}
//                     </Slider>
//                   </section>
//                 )}
//               </>
//             )}
//           </>
//         )}
//       </div>

//       <div className={styles.cartIcon}>
//         <IconButton onClick={() => setOpenCartModal(true)}>
//           <Badge badgeContent={cartCount} color="secondary">
//             <FaShoppingCart size={30} />
//           </Badge>
//         </IconButton>
//       </div>

//       <Modal
//         open={openCartModal}
//         onClose={() => setOpenCartModal(false)}
//         aria-labelledby="cart-modal-title"
//       >
//         <Box sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: 400,
//           bgcolor: 'background.paper',
//           boxShadow: 24,
//           p: 4,
//           borderRadius: 2,
//         }}>
//           <Typography id="cart-modal-title" variant="h6" component="h2">
//             Your Cart
//           </Typography>
//           {cartItems.length === 0 ? (
//             <Typography>Your cart is empty.</Typography>
//           ) : (
//             <div>
//               {cartItems.map((item) => (
//                 <div key={item.productId} className={styles.cartItem}>
//                   <img src={item.image} alt={item.name} className={styles.cartItemImage} />
//                   <div className={styles.cartItemDetails}>
//                     <Typography>{item.name}</Typography>
//                     <Typography>Price: ${item.price}</Typography>
//                     <Typography>Quantity: {item.quantity}</Typography>
//                   </div>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={() => handleRemoveFromCart(item.productId)}
//                   >
//                     Remove
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           )}
//           <Button
//             variant="contained"
//             onClick={() => setOpenCartModal(false)}
//             sx={{ mt: 2 }}
//           >
//             Close
//           </Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default ShopPage;

import React, { useState, useEffect, useCallback } from 'react';
import styles from './ShopPage.module.css';
import ProductCard from './ProductCard';
import axios from 'axios';
import { IconButton, Badge, Modal, Box, Typography, Button } from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import InfiniteScroll from 'react-infinite-scroll-component'; // Import InfiniteScroll

const ShopPage = () => {
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]); // Products to display
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [categories, setCategories] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [userUid, setUserUid] = useState(null);
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true); // Check if more products are available
  const productsPerPage = 10; // Load 10 products per page

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
      } else {
        setUserUid(null);
        setCartItems([]);
        setCartCount(0);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchCart = async () => {
    if (!userUid) return;
    try {
      const response = await axios.get('http://localhost:5000/api/cart', {
        headers: {
          Authorization: `Bearer ${userUid}`,
        },
      });
      const items = response.data.cart || [];
      setCartItems(items);
      setCartCount(items.length);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get('https://dummyjson.com/products?limit=100');
      const mappedProducts = res.data.products.map((item) => ({
        _id: item.id.toString(),
        name: item.title,
        category: item.category,
        brand: item.brand || item.category.split(' ')[0],
        price: item.price,
        inStock: item.stock > 0,
        rating: item.rating,
        image: item.thumbnail,
        tags: [],
        dealScore: item.rating * 2,
      }));

      const updatedProducts = mappedProducts.map((product) => ({
        ...product,
        tags: product.rating >= 4.5 ? ['top-seller'] : [],
      }));

      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      // Initially display the first page of products
      setDisplayedProducts(updatedProducts.slice(0, productsPerPage));
      setPage(1);
      setHasMore(updatedProducts.length > productsPerPage);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await axios.get('https://dummyjson.com/products/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, []);

  const updateFilteredProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    let filtered = [...products];

    if (searchQuery) {
      try {
        const res = await axios.get(`https://dummyjson.com/products/search?q=${searchQuery}`);
        filtered = res.data.products.map((item) => ({
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
      } catch (err) {
        console.error('Error searching products:', err);
        setError('Failed to search products. Please try again.');
        setLoading(false);
        return;
      }
    }

    if (categoryFilter) {
      filtered = filtered.filter((product) => product.category === categoryFilter);
    }

    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (ratingFilter > 0) {
      filtered = filtered.filter((product) => product.rating >= ratingFilter);
    }

    setFilteredProducts(filtered);
    // Reset displayed products and page
    setDisplayedProducts(filtered.slice(0, productsPerPage));
    setPage(1);
    setHasMore(filtered.length > productsPerPage);
    setLoading(false);
  }, [products, searchQuery, categoryFilter, priceRange, ratingFilter]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  useEffect(() => {
    if (products.length > 0) {
      updateFilteredProducts();
    }
  }, [products, searchQuery, categoryFilter, priceRange, ratingFilter, updateFilteredProducts]);

  useEffect(() => {
    fetchCart();
  }, [userUid]);

  const loadMoreProducts = () => {
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * productsPerPage;
    const endIndex = nextPage * productsPerPage;
    const moreProducts = filteredProducts.slice(startIndex, endIndex);

    if (moreProducts.length === 0) {
      setHasMore(false);
      return;
    }

    setDisplayedProducts([...displayedProducts, ...moreProducts]);
    setPage(nextPage);
    setHasMore(filteredProducts.length > endIndex);
  };

  const handleRemoveFromCart = async (productId) => {
    if (!userUid) return;
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${userUid}`,
        },
      });
      fetchCart();
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Failed to remove item from cart');
    }
  };

  // Skeleton Loader Component for a single card
  const SkeletonCard = () => (
    <div className={styles.cardSkeleton}>
      <Skeleton height={150} width="100%" />
      <Skeleton height={20} width="80%" style={{ marginTop: 8 }} />
      <Skeleton height={15} width="50%" style={{ marginTop: 8 }} />
      <Skeleton height={20} width="40%" style={{ marginTop: 8 }} />
      <Skeleton height={35} width="100%" style={{ marginTop: 8 }} />
      <Skeleton height={35} width="100%" style={{ marginTop: 8 }} />
    </div>
  );

  return (
    <div className={styles.shopPage}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterItem}>
          <label>Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterItem}>
          <label>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className={styles.rangeInput}
          />
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className={styles.rangeInput}
          />
        </div>

        <div className={styles.filterItem}>
          <label>Minimum Rating:</label>
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(Number(e.target.value))}
            className={styles.filterSelect}
          >
            <option value="0">All Ratings</option>
            <option value="1">1★ & above</option>
            <option value="2">2★ & above</option>
            <option value="3">3★ & above</option>
            <option value="4">4★ & above</option>
            <option value="5">5★</option>
          </select>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.mainContent}>
        {searchQuery && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Search Results for "{searchQuery}"</h2>
            {loading ? (
              <div className={styles.productGrid}>
                {Array(10).fill().map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <InfiniteScroll
                dataLength={displayedProducts.length}
                next={loadMoreProducts}
                hasMore={hasMore}
                loader={<h4>Loading more products...</h4>}
                endMessage={<p>No more products to load.</p>}
              >
                <div className={styles.productGrid}>
                  {displayedProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onAddToCart={fetchCart}
                      userUid={userUid}
                    />
                  ))}
                </div>
              </InfiniteScroll>
            ) : (
              <p>No products found for "{searchQuery}".</p>
            )}
          </section>
        )}

        {!searchQuery && (
          <>
            {loading ? (
              <>
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Top Selling Products</h2>
                  <div className={styles.productGrid}>
                    {Array(5).fill().map((_, index) => (
                      <SkeletonCard key={index} />
                    ))}
                  </div>
                </section>
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Beauty Products</h2>
                  <div className={styles.productGrid}>
                    {Array(5).fill().map((_, index) => (
                      <SkeletonCard key={index} />
                    ))}
                  </div>
                </section>
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Electronics Products</h2>
                  <div className={styles.productGrid}>
                    {Array(5).fill().map((_, index) => (
                      <SkeletonCard key={index} />
                    ))}
                  </div>
                </section>
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Daily Usable Products</h2>
                  <div className={styles.productGrid}>
                    {Array(5).fill().map((_, index) => (
                      <SkeletonCard key={index} />
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <>
                {filteredProducts.filter((product) => product.tags.includes('top-seller')).length > 0 && (
                  <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Top Selling Products</h2>
                    <div className={styles.productGrid}>
                      {filteredProducts
                        .filter((product) => product.tags.includes('top-seller'))
                        .slice(0, 10)
                        .map((product) => (
                          <ProductCard
                            key={product._id}
                            product={product}
                            onAddToCart={fetchCart}
                            userUid={userUid}
                          />
                        ))}
                    </div>
                  </section>
                )}

                {filteredProducts.filter((product) =>
                  ['beauty', 'fragrances'].includes(product.category.toLowerCase())
                ).length > 0 && (
                  <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Beauty Products</h2>
                    <div className={styles.productGrid}>
                      {filteredProducts
                        .filter((product) =>
                          ['beauty', 'fragrances'].includes(product.category.toLowerCase())
                        )
                        .slice(0, 10)
                        .map((product) => (
                          <ProductCard
                            key={product._id}
                            product={product}
                            onAddToCart={fetchCart}
                            userUid={userUid}
                          />
                        ))}
                    </div>
                  </section>
                )}

                {filteredProducts.filter((product) =>
                  ['smartphones', 'laptops', 'electronics'].includes(product.category.toLowerCase())
                ).length > 0 && (
                  <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Electronics Products</h2>
                    <div className={styles.productGrid}>
                      {filteredProducts
                        .filter((product) =>
                          ['smartphones', 'laptops', 'electronics'].includes(product.category.toLowerCase())
                        )
                        .slice(0, 10)
                        .map((product) => (
                          <ProductCard
                            key={product._id}
                            product={product}
                            onAddToCart={fetchCart}
                            userUid={userUid}
                          />
                        ))}
                    </div>
                  </section>
                )}

                {filteredProducts.filter((product) =>
                  ['groceries', 'home-decoration', 'kitchen-accessories'].includes(product.category.toLowerCase())
                ).length > 0 && (
                  <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Daily Usable Products</h2>
                    <div className={styles.productGrid}>
                      {filteredProducts
                        .filter((product) =>
                          ['groceries', 'home-decoration', 'kitchen-accessories'].includes(product.category.toLowerCase())
                        )
                        .slice(0, 10)
                        .map((product) => (
                          <ProductCard
                            key={product._id}
                            product={product}
                            onAddToCart={fetchCart}
                            userUid={userUid}
                          />
                        ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </>
        )}
      </div>

      <div className={styles.cartIcon}>
        <IconButton onClick={() => setOpenCartModal(true)}>
          <Badge badgeContent={cartCount} color="secondary">
            <FaShoppingCart size={30} />
          </Badge>
        </IconButton>
      </div>

      <Modal
        open={openCartModal}
        onClose={() => setOpenCartModal(false)}
        aria-labelledby="cart-modal-title"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <Typography id="cart-modal-title" variant="h6" component="h2">
            Your Cart
          </Typography>
          {cartItems.length === 0 ? (
            <Typography>Your cart is empty.</Typography>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div key={item.productId} className={styles.cartItem}>
                  <img src={item.image} alt={item.name} className={styles.cartItemImage} />
                  <div className={styles.cartItemDetails}>
                    <Typography>{item.name}</Typography>
                    <Typography>Price: ${item.price}</Typography>
                    <Typography>Quantity: {item.quantity}</Typography>
                  </div>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemoveFromCart(item.productId)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
          <Button
            variant="contained"
            onClick={() => setOpenCartModal(false)}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ShopPage;