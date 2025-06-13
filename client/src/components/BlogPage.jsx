// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import styles from './BlogPage.module.css';

// // Sample blog data (replace with API later)
// const blogData = [
//   {
//     id: 1,
//     title: 'Best Smartphones of 2025',
//     category: 'Reviews',
//     snippet: 'We reviewed the top smartphones of 2025, including the latest Samsung and iPhone models.',
//     content: 'This is a detailed review of the best smartphones in 2025. The Samsung Galaxy S25 offers a stunning display, while the iPhone 16 Pro brings incredible camera features...',
//     featuredImage: 'https://picsum.photos/800/400?random=1',
//     author: 'John Doe',
//     date: '2025-05-20',
//     readTime: 3,
//     affiliateProducts: [
//       { name: 'Samsung Galaxy S25', link: 'https://affiliate.com/samsung?ref=dealfinder' },
//     ],
//   },
//   {
//     id: 2,
//     title: 'How to Style a Leather Jacket',
//     category: 'Guides',
//     snippet: 'A step-by-step guide on styling leather jackets for any occasion.',
//     content: 'Leather jackets are timeless. In this guide, we’ll show you how to pair them with jeans, boots, and more...',
//     featuredImage: 'https://picsum.photos/800/400?random=2',
//     author: 'Jane Smith',
//     date: '2025-05-15',
//     readTime: 5,
//     affiliateProducts: [
//       { name: 'Leather Jacket', link: 'https://affiliate.com/jacket?ref=dealfinder' },
//     ],
//   },
//   {
//     id: 3,
//     title: 'Tutorial: Setting Up Your First Blender',
//     category: 'Tutorials',
//     snippet: 'Learn how to set up and use your blender with this beginner-friendly tutorial.',
//     content: 'Blenders are essential kitchen tools. This tutorial covers unboxing, setup, and first use...',
//     featuredImage: 'https://picsum.photos/800/400?random=3',
//     author: 'Alex Brown',
//     date: '2025-05-10',
//     readTime: 4,
//     affiliateProducts: [
//       { name: 'Blender Pro', link: 'https://affiliate.com/blender?ref=dealfinder' },
//     ],
//   },
// ];

// const BlogPage = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   const categories = ['All', 'Reviews', 'Guides', 'Tutorials'];

//   const filteredBlogs =
//     selectedCategory === 'All'
//       ? blogData
//       : blogData.filter((blog) => blog.category === selectedCategory);

//   return (
//     <div className={styles.blogPage}>
//       <h1 className={styles.pageTitle}>Blog</h1>

//       {/* Category Filters */}
//       <div className={styles.categoryFilters}>
//         {categories.map((category) => (
//           <button
//             key={category}
//             className={`${styles.categoryPill} ${
//               selectedCategory === category ? styles.activePill : ''
//             }`}
//             onClick={() => setSelectedCategory(category)}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       {/* AdSense Placeholder */}
//       <div className={styles.adSensePlaceholder}>
//         <p>AdSense Ad Placeholder (728x90)</p>
//       </div>

//       {/* Blog Grid */}
//       <div className={styles.blogGrid}>
//         {filteredBlogs.map((blog) => (
//           <div key={blog.id} className={styles.blogCard}>
//             <Link to={`/blog/${blog.id}`}>
//               <img
//                 src={blog.featuredImage}
//                 alt={blog.title}
//                 className={styles.blogImage}
//               />
//               <div className={styles.blogContent}>
//                 <span className={styles.category}>{blog.category}</span>
//                 <h2 className={styles.blogTitle}>{blog.title}</h2>
//                 <div className={styles.snippet}>{blog.snippet}</div>
//                 <span className={styles.readTime}>{blog.readTime} min read</span>
//               </div>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './BlogPage.module.css';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  useEffect(() => {
    trackViews();
  }, [blogs]);

  const trackViews = async () => {
    for (const blog of blogs) {
      try {
        await axios.post(`http://localhost:5000/api/blogs/track-view/${blog._id}`);
      } catch (err) {
        console.error('Error tracking view:', err);
      }
    }
  };

  const filteredBlogs = categoryFilter
    ? blogs.filter((blog) => blog.category.toLowerCase() === categoryFilter.toLowerCase())
    : blogs;

  const uniqueCategories = [...new Set(blogs.map((blog) => blog.category))];

  return (
    <div className={styles.blogPage}>
      <header className={styles.header}>
        <h1>DealFinder Blog</h1>
        <p>Discover reviews, guides, and tutorials to make smarter buying decisions.</p>
      </header>

      <div className={styles.filter}>
        <label>Filter by Category: </label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.blogGrid}>
        {filteredBlogs.map((blog) => (
          <Link to={`/blog/${blog._id}`} key={blog._id} className={styles.blogCard}>
            <img
              src={blog.featuredImage || 'https://picsum.photos/400/200?random=1'}
              alt={blog.title}
              className={styles.blogImage}
            />
            <div className={styles.blogContent}>
              <h2 className={styles.blogTitle}>{blog.title}</h2>
              <p className={styles.blogSnippet}>{blog.snippet}</p>
              <div className={styles.blogMeta}>
                <span>{blog.author}</span> |{' '}
                <span>{new Date(blog.date).toLocaleDateString()}</span> |{' '}
                <span>{blog.readTime} min read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;