import React from 'react';
import styles from './BlogHighlights.module.css';

const BlogHighlights = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Top 5 Smartphones of 2025',
      coverImage: 'https://placehold.co/400x300?text=Smartphones',
      readTime: '5 min read',
      category: 'Tech',
      tag: 'Deal',
      excerpt: 'Discover the best smartphones of 2025 with amazing deals!',
      link: '#',
    },
    {
      id: 2,
      title: 'How to Build a Gaming PC',
      coverImage: 'https://placehold.co/400x300?text=Gaming+PC',
      readTime: '8 min read',
      category: 'DIY',
      tag: 'Tutorial',
      excerpt: 'A step-by-step guide to building your own gaming PC.',
      link: '#',
    },
    {
      id: 3,
      title: 'Unboxing the New Galaxy Watch',
      coverImage: 'https://placehold.co/400x300?text=Galaxy+Watch',
      readTime: '4 min read',
      category: 'Reviews',
      tag: 'Unboxing Review',
      excerpt: 'Check out our unboxing and first impressions of the Galaxy Watch!',
      link: '#',
    },
  ];

  return (
    <section className={styles.blogHighlights}>
      <h2 className={styles.title}>Blog Highlights</h2>
      <p className={styles.subtitle}>
        Explore our latest articles to find the best deals and tips.
      </p>
      <div className={styles.cardsContainer}>
        {blogPosts.map((post) => (
          <div key={post.id} className={styles.blogCard}>
            <div className={styles.imageWrapper}>
              <img
                src={post.coverImage}
                alt={post.title}
                className={styles.coverImage}
              />
              <span className={styles.tag}>{post.tag}</span>
              <div className={styles.overlay}></div>
            </div>
            <div className={styles.metaInfo}>
              <span className={styles.readTime}>{post.readTime}</span>
              <span className={styles.category}>{post.category}</span>
            </div>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <p className={styles.excerpt}>{post.excerpt}</p>
            <a href={post.link} className={styles.readMore}>
              Read More →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogHighlights;