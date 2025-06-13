import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './SingleProductPage.module.css';
import ProductCard from './ProductCard';

// Sample product data (same as ShopPage.jsx, replace with API later)
const productsData = [
  {
    id: 1,
    name: 'Smartphone X',
    category: 'Electronics',
    brand: 'Samsung',
    price: 699,
    rating: 4.5,
    image: 'https://picsum.photos/300/300?random=1',
    affiliateLink: 'https://affiliate.com/product1?ref=dealfinder',
    specs: { display: '6.5"', battery: '4500mAh', camera: '48MP' },
    features: { ram: '8GB', storage: '128GB' },
    reviews: ['Great phone!', 'Battery life is amazing.'],
    inStock: true,
    network: ['Amazon', 'Flipkart'],
    createdAt: '2025-05-20',
    dealScore: 90,
    description: 'A powerful smartphone with a stunning display and long-lasting battery.',
  },
  {
    id: 2,
    name: 'Leather Jacket',
    category: 'Fashion',
    brand: 'Nike',
    price: 129,
    rating: 4.0,
    image: 'https://picsum.photos/300/300?random=2',
    affiliateLink: 'https://affiliate.com/product2?ref=dealfinder',
    specs: { material: 'Genuine Leather', size: 'M', color: 'Black' },
    features: { material: 'Leather', fit: 'Regular' },
    reviews: ['Stylish and durable.', 'Fits perfectly!'],
    inStock: false,
    network: ['Flipkart'],
    createdAt: '2025-05-15',
    dealScore: 85,
    description: 'A stylish leather jacket perfect for any occasion.',
  },
  {
    id: 3,
    name: 'Blender Pro',
    category: 'Home & Kitchen',
    brand: 'Philips',
    price: 89,
    rating: 4.2,
    image: 'https://picsum.photos/300/300?random=3',
    affiliateLink: 'https://affiliate.com/product3?ref=dealfinder',
    specs: { power: '1000W', capacity: '1.5L', blades: '6' },
    features: { power: '1000W', speed: '3 Levels' },
    reviews: ['Powerful blender!', 'Easy to clean.'],
    inStock: true,
    network: ['Amazon'],
    createdAt: '2025-05-10',
    dealScore: 80,
    description: 'A high-performance blender for your kitchen needs.',
  },
  {
    id: 4,
    name: 'Perfume Lux',
    category: 'Beauty',
    brand: 'Chanel',
    price: 49,
    rating: 4.8,
    image: 'https://picsum.photos/300/300?random=4',
    affiliateLink: 'https://affiliate.com/product4?ref=dealfinder',
    specs: { scent: 'Floral', volume: '50ml', longevity: '8h' },
    features: { scentType: 'Floral', longevity: '8h' },
    reviews: ['Amazing scent!', 'Lasts all day.'],
    inStock: true,
    network: ['Amazon', 'Flipkart'],
    createdAt: '2025-05-05',
    dealScore: 95,
    description: 'A luxurious perfume with a long-lasting floral scent.',
  },
];

const SingleProductPage = () => {
  const { id } = useParams(); // Hook 1
  const [product, setProduct] = useState(null); // Hook 2
  const [activeTab, setActiveTab] = useState('description'); // Hook 3
  const [isFullscreen, setIsFullscreen] = useState(false); // Hook 4

  // Hook 5: Find product by ID
  useEffect(() => {
    const foundProduct = productsData.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  // Hook 6: SEO (Moved to top-level)
  useEffect(() => {
    if (!product) return; // Skip if product is not yet loaded

    // JSON-LD Schema
    const jsonLdSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: product.image,
      description: product.description,
      brand: {
        '@type': 'Brand',
        name: product.brand,
      },
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'USD',
        availability: product.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        url: product.affiliateLink,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviews.length,
      },
    };

    document.title = `${product.name} - DealFinder`;
    const metaTags = [
      { property: 'og:title', content: product.name },
      { property: 'og:description', content: product.description },
      { property: 'og:image', content: product.image },
      { property: 'og:url', content: window.location.href },
      { property: 'og:type', content: 'product' },
    ];

    metaTags.forEach((tag) => {
      let meta = document.querySelector(`meta[property="${tag.property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', tag.property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', tag.content);
    });

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLdSchema);
    document.head.appendChild(script);

    return () => {
      metaTags.forEach((tag) => {
        const meta = document.querySelector(`meta[property="${tag.property}"]`);
        if (meta) meta.remove();
      });
      script.remove();
    };
  }, [product]);

  // Handle Fullscreen toggle
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle Add to Compare (placeholder functionality)
  const handleAddToCompare = () => {
    if (product) {
      alert(`${product.name} added to compare!`);
    }
  };

  // Get related products (same category, excluding current product)
  const relatedProducts = product
    ? productsData.filter(
        (p) => p.category === product.category && p.id !== product.id
      )
    : [];

  if (!product) {
    return <div className={styles.loading}>Product not found.</div>;
  }

  return (
    <div className={styles.singleProductPage}>
      <div className={styles.productContainer}>
        {/* Left Side: Image with Zoom and Fullscreen */}
        <div
          className={`${styles.imageSection} ${
            isFullscreen ? styles.fullscreen : ''
          }`}
        >
          <div className={styles.imageWrapper}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
          </div>
          <button onClick={toggleFullscreen} className={styles.fullscreenButton}>
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>

        {/* Right Side: Product Details */}
        <div className={styles.detailsSection}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productPrice}>${product.price}</p>
          <div className={styles.highlights}>
            <span className={styles.highlight}>Hot Deal</span>
            <span className={styles.highlight}>Lowest in 30 days</span>
          </div>
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.buyButton}
          >
            Buy Now
          </a>
          <p className={styles.disclaimer}>
            *We may earn a commission from this affiliate link.
          </p>
          <button onClick={handleAddToCompare} className={styles.compareButton}>
            Add to Compare
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className={styles.tabsSection}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab === 'description' ? styles.activeTab : ''
            }`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === 'features' ? styles.activeTab : ''
            }`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === 'reviews' ? styles.activeTab : ''
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === 'related' ? styles.activeTab : ''
            }`}
            onClick={() => setActiveTab('related')}
          >
            Related Products
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'description' && (
            <div className={styles.description}>
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
          )}
          {activeTab === 'features' && (
            <div className={styles.features}>
              <h3>Features / Specs</h3>
              <ul>
                {Object.entries(product.specs).map(([key, value]) => (
                  <li key={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className={styles.reviews}>
              <h3>Verified Reviews</h3>
              {product.reviews.length > 0 ? (
                <ul>
                  {product.reviews.map((review, index) => (
                    <li key={index}>{review}</li>
                  ))}
                </ul>
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          )}
          {activeTab === 'related' && (
            <div className={styles.relatedProducts}>
              <h3>Related Products</h3>
              <div className={styles.relatedGrid}>
                {relatedProducts.length > 0 ? (
                  relatedProducts.map((relatedProduct) => (
                    <ProductCard
                      key={relatedProduct.id}
                      product={relatedProduct}
                    />
                  ))
                ) : (
                  <p>No related products found.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;