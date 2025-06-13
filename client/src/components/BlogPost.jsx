import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './BlogPost.module.css';

// Sample blog data (same as BlogPage.jsx, replace with API later)
const blogData = [
  {
    id: 1,
    title: 'Best Smartphones of 2025',
    category: 'Reviews',
    snippet: 'We reviewed the top smartphones of 2025, including the latest Samsung and iPhone models.',
    content: `
      <p>This is a detailed review of the best smartphones in 2025.</p>
      <p>The Samsung Galaxy S25 offers a stunning 6.5" display, 8GB RAM, and a 48MP camera. It's perfect for tech enthusiasts.</p>
      <div class="affiliate-box">
        <h4>Affiliate Product</h4>
        <p>Samsung Galaxy S25 - <a href="https://affiliate.com/samsung?ref=dealfinder" target="_blank">Buy Now</a></p>
      </div>
      <p>The iPhone 16 Pro brings incredible camera features and a sleek design...</p>
    `,
    featuredImage: 'https://picsum.photos/800/400?random=1',
    author: 'John Doe',
    date: '2025-05-20',
    readTime: 3,
    affiliateProducts: [
      { name: 'Samsung Galaxy S25', link: 'https://affiliate.com/samsung?ref=dealfinder' },
    ],
  },
  {
    id: 2,
    title: 'How to Style a Leather Jacket',
    category: 'Guides',
    snippet: 'A step-by-step guide on styling leather jackets for any occasion.',
    content: `
      <p>Leather jackets are timeless. In this guide, we’ll show you how to pair them with jeans, boots, and more.</p>
      <div class="affiliate-box">
        <h4>Affiliate Product</h4>
        <p>Leather Jacket - <a href="https://affiliate.com/jacket?ref=dealfinder" target="_blank">Buy Now</a></p>
      </div>
      <p>Choose a regular fit jacket for a casual look...</p>
    `,
    featuredImage: 'https://picsum.photos/800/400?random=2',
    author: 'Jane Smith',
    date: '2025-05-15',
    readTime: 5,
    affiliateProducts: [
      { name: 'Leather Jacket', link: 'https://affiliate.com/jacket?ref=dealfinder' },
    ],
  },
  {
    id: 3,
    title: 'Tutorial: Setting Up Your First Blender',
    category: 'Tutorials',
    snippet: 'Learn how to set up and use your blender with this beginner-friendly tutorial.',
    content: `
      <p>Blenders are essential kitchen tools.</p>
      <p>This tutorial covers unboxing, setup, and first use of the Blender Pro, which has a 1000W motor...</p>
      <div class="affiliate-box">
        <h4>Affiliate Product</h4>
        <p>Blender Pro - <a href="https://affiliate.com/blender?ref=dealfinder" target="_blank">Buy Now</a></p>
      </div>
    `,
    featuredImage: 'https://picsum.photos/800/400?random=3',
    author: 'Alex Brown',
    date: '2025-05-10',
    readTime: 4,
    affiliateProducts: [
      { name: 'Blender Pro', link: 'https://affiliate.com/blender?ref=dealfinder' },
    ],
  },
];

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Find the blog post by ID
  useEffect(() => {
    const foundPost = blogData.find((p) => p.id === parseInt(id));
    setPost(foundPost);
  }, [id]);

  // SEO: JSON-LD Schema and Open Graph Tags
  useEffect(() => {
    if (!post) return;

    // JSON-LD Schema
    const jsonLdSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      image: post.featuredImage,
      author: {
        '@type': 'Person',
        name: post.author,
      },
      datePublished: post.date,
      description: post.snippet,
    };

    document.title = `${post.title} - DealFinder Blog`;
    const metaTags = [
      { property: 'og:title', content: post.title },
      { property: 'og:description', content: post.snippet },
      { property: 'og:image', content: post.featuredImage },
      { property: 'og:url', content: window.location.href },
      { property: 'og:type', content: 'article' },
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
  }, [post]);

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, text: newComment, date: new Date().toISOString() }]);
      setNewComment('');
    }
  };

  // Get suggested posts (same category, excluding current post)
  const suggestedPosts = post
    ? blogData.filter((p) => p.category === post.category && p.id !== post.id)
    : [];

  if (!post) {
    return <div className={styles.loading}>Post not found.</div>;
  }

  return (
    <div className={styles.blogPost}>
      {/* Featured Image with Parallax */}
      <div
        className={styles.featuredImage}
        style={{ backgroundImage: `url(${post.featuredImage})` }}
      >
        <div className={styles.overlay}>
          <h1 className={styles.postTitle}>{post.title}</h1>
        </div>
      </div>

      {/* Post Metadata */}
      <div className={styles.metadata}>
        <span>By {post.author}</span>
        <span>{new Date(post.date).toLocaleDateString()}</span>
        <span>{post.readTime} min read</span>
      </div>

      {/* AdSense Placeholder */}
      <div className={styles.adSensePlaceholder}>
        <p>AdSense Ad Placeholder (300x250)</p>
      </div>

      {/* Post Content */}
      <div className={styles.content}>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Product Mentioned Section */}
      {post.affiliateProducts && post.affiliateProducts.length > 0 && (
        <div className={styles.productMentioned}>
          <h3>Products Mentioned</h3>
          <ul>
            {post.affiliateProducts.map((product, index) => (
              <li key={index}>
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  {product.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Social Share Buttons */}
      <div className={styles.socialShare}>
        <a
          href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.shareButton}
        >
          Twitter
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.shareButton}
        >
          Facebook
        </a>
      </div>

      {/* Comment Section */}
      <div className={styles.commentsSection}>
        <h3>Comments</h3>
        <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className={styles.commentInput}
          />
          <button type="submit" className={styles.submitButton}>
            Post Comment
          </button>
        </form>
        {comments.length > 0 ? (
          <ul className={styles.commentList}>
            {comments.map((comment) => (
              <li key={comment.id} className={styles.comment}>
                <p>{comment.text}</p>
                <span>{new Date(comment.date).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>

      {/* Suggested Posts */}
      {suggestedPosts.length > 0 && (
        <div className={styles.suggestedPosts}>
          <h3>Suggested Posts</h3>
          <div className={styles.suggestedGrid}>
            {suggestedPosts.map((suggestedPost) => (
              <div key={suggestedPost.id} className={styles.suggestedCard}>
                <Link to={`/blog/${suggestedPost.id}`}>
                  <img
                    src={suggestedPost.featuredImage}
                    alt={suggestedPost.title}
                    className={styles.suggestedImage}
                  />
                  <div className={styles.suggestedContent}>
                    <h4>{suggestedPost.title}</h4>
                    <span>{suggestedPost.readTime} min read</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;