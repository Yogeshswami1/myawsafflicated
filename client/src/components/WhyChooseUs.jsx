import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './WhyChooseUs.module.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const cards = cardsRef.current;

    gsap.to(bg, {
      y: '30%',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });
  }, []);

  const metrics = [
    { title: 'Products Compared', value: '10,000+', icon: '📊' },
    { title: 'Affiliate Networks', value: '50+', icon: '🤝' },
    { title: 'Daily Price Updates', value: '1M+', icon: '🔄' },
    { title: 'Load Time', value: '<1s', icon: '⚡' },
  ];

  return (
    <section className={styles.whyChooseUs} ref={sectionRef}>
      <div className={styles.background} ref={bgRef}></div>
      <div className={styles.content}>
        <h2 className={styles.title}>Why Choose Us?</h2>
        <p className={styles.subtitle}>
          We make shopping smarter, faster, and more affordable.
        </p>
        <div className={styles.metricsContainer}>
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={styles.metricCard}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <span className={styles.icon}>{metric.icon}</span>
              <h3 className={styles.metricValue}>{metric.value}</h3>
              <p className={styles.metricTitle}>{metric.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;