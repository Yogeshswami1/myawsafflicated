import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './PartnerTestimonials.module.css';

gsap.registerPlugin(ScrollTrigger);

const PartnerTestimonials = () => {
  const logoContainerRef = useRef(null);
  const logoRefs = useRef([]);
  const testimonialRefs = useRef([]);

  const partners = [
    {
      id: 1,
      name: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    },
    {
      id: 2,
      name: 'Flipkart',
      logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Flipkart_logo.svg',
    },
    {
      id: 3,
      name: 'Ajio',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    },
    {
      id: 4,
      name: 'Meesho',
      logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Flipkart_logo.svg',
    },
  ];

  const testimonials = [
    {
      id: 1,
      quote: 'Found the best deal here—saved ₹2,000!',
      author: 'Rahul S., Tech Enthusiast',
    },
    {
      id: 2,
      quote: 'Amazing price comparisons, highly recommend!',
      author: 'Priya K., Shopper',
    },
    {
      id: 3,
      quote: 'Super fast and reliable—love this platform!',
      author: 'Amit P., Gamer',
    },
  ];

  useEffect(() => {
    logoRefs.current.forEach((logo, index) => {
      if (logo) {
        gsap.fromTo(
          logo,
          { opacity: 0, y: 50, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.2,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: logoContainerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        logo.addEventListener('mousemove', (e) => {
          const rect = logo.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(logo, {
            rotateX: -y / 20,
            rotateY: x / 20,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        logo.addEventListener('mouseenter', () => {
          gsap.to(logo, {
            scale: 1.1,
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        logo.addEventListener('mouseleave', () => {
          gsap.to(logo, {
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      }
    });

    testimonialRefs.current.forEach((testimonial, index) => {
      if (testimonial) {
        gsap.fromTo(
          testimonial,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: testimonial,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        testimonial.addEventListener('mouseenter', () => {
          gsap.to(testimonial, {
            scale: 1.03,
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15), 0 0 20px rgba(37, 99, 235, 0.3)',
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        testimonial.addEventListener('mouseleave', () => {
          gsap.to(testimonial, {
            scale: 1,
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      }
    });
  }, []);

  return (
    <section className={styles.partnerTestimonials}>
      <div className={styles.partnersSection}>
        <h2 className={styles.title}>Our Partner Brands</h2>
        <div className={styles.logoContainer} ref={logoContainerRef}>
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className={styles.logoWrapper}
              ref={(el) => (logoRefs.current[index] = el)}
              style={{ transform: `translateY(${Math.sin(index * 0.5) * 20}px)` }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className={styles.logo}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.testimonialsSection}>
        <h2 className={styles.title}>What Our Users Say</h2>
        <div className={styles.testimonialsContainer}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={styles.testimonialCard}
              ref={(el) => (testimonialRefs.current[index] = el)}
            >
              <p className={styles.quote}>“{testimonial.quote}”</p>
              <p className={styles.author}>- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerTestimonials;