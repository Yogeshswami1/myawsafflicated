import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Feature.module.css';

const features = [
  {
    title: 'AI-Powered Product Search',
    description: 'Find the best products with our smart search technology.',
    icon: '🔍',
  },
  {
    title: 'Compare & Save Instantly',
    description: 'Compare prices across stores in real-time.',
    icon: '💸',
  },
  {
    title: 'Verified Deals from Trusted Stores',
    description: 'Shop with confidence from verified sellers.',
    icon: '✅',
  },
  {
    title: 'Exclusive Offers Daily',
    description: 'Get access to daily exclusive discounts.',
    icon: '🎁',
  },
];

const Feature = () => {
  const cardRefs = useRef([]);
  const iconRefs = useRef([]);

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      // Initial animation for cards (fade in with stagger)
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power3.out',
        }
      );

      // Hover animation (3D tilt, pop-out, glow)
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          rotateX: 10,
          rotateY: 10,
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
          duration: 0.3,
          ease: 'power2.out',
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
      });

      // Mouse move for 3D tilt effect
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

    // Micro-interaction for icons (scale and rotate on click)
    iconRefs.current.forEach((icon) => {
      icon.addEventListener('click', () => {
        gsap.to(icon, {
          scale: 1.2,
          rotate: 360,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
      });
    });
  }, []);

  return (
    <section className={styles.featureSection}>
      <h2 className={styles.title}>Why Choose Us?</h2>
      <div className={styles.featureGrid}>
        {features.map((feature, index) => (
          <div
            key={index}
            className={styles.featureCard}
            ref={(el) => (cardRefs.current[index] = el)}
          >
            <div
              className={styles.icon}
              ref={(el) => (iconRefs.current[index] = el)}
            >
              {feature.icon}
            </div>
            <h3 className={styles.cardTitle}>{feature.title}</h3>
            <p className={styles.cardDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feature;