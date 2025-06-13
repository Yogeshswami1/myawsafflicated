import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CTASection.module.css';

const CTASection = () => {
  return (
    <section className={styles.ctaSection}>
      <video
        className={styles.backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        src="/video/Video.mp4"
      />
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h2 className={styles.tagline}>Start Exploring Top Deals Now</h2>
        <Link to="/shop" className={styles.ctaButton}>
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default CTASection;