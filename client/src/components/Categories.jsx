import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Categories.module.css';

const categories = [
  { name: 'Tech', icon: '💻', tag: 'Gadgets & More' },
  { name: 'Home', icon: '🏠', tag: 'Essentials' },
  { name: 'Fashion', icon: '👗', tag: 'Style Trends' },
  { name: 'Beauty', icon: '💄', tag: 'Skincare & More' },
  { name: 'Sports', icon: '⚽', tag: 'Fitness Gear' },
  { name: 'Books', icon: '📚', tag: 'Best Reads' },
];

const Categories = () => {
  const cardRefs = useRef([]);
  const containerRef = useRef(null);
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  useEffect(() => {
    const container = containerRef.current;

    // Initial animation for cards (fade in with stagger)
    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power3.out',
        }
      );

      // Hover animation (3D tilt, icon animation)
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          rotateX: 10,
          rotateY: 10,
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(card.querySelector(`.${styles.icon}`), {
          scale: 1.2,
          rotate: 360,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(card.querySelector(`.${styles.icon}`), {
          scale: 1,
          rotate: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      // Tilt effect on mouse move
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(card, {
          rotateX: -y / 20,
          rotateY: x / 20,
          duration: 0.3,
        });
      });
    });

    // Drag to scroll (desktop)
    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.style.cursor = 'grabbing';
    });

    container.addEventListener('mouseleave', () => {
      isDragging = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
      isDragging = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    });

    // Touch support for mobile
    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchend', () => {
      isDragging = false;
    });

    container.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    });
  }, []);

  return (
    <section className={styles.categoriesSection}>
      <h2 className={styles.title}>Popular Categories</h2>
      <div className={styles.categoriesContainer} ref={containerRef}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={styles.categoryCard}
            ref={(el) => (cardRefs.current[index] = el)}
          >
            <div className={styles.icon}>{category.icon}</div>
            <h3 className={styles.cardTitle}>{category.name}</h3>
            <span className={styles.tag}>{category.tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;