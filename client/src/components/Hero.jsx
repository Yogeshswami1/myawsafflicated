import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.on('userCount', (count) => {
      setUserCount(count);
    });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('hero-bg').appendChild(renderer.domElement);

    const particleCount = 5000;
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particlesMesh);
    camera.position.z = 30;

    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      socket.disconnect();
      window.removeEventListener('resize', handleResize);
      const heroBg = document.getElementById('hero-bg');
      if (heroBg && renderer.domElement) {
        heroBg.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={styles.hero}>
      <div id="hero-bg" className={styles.heroBg}></div>
      <div className={styles.content}>
        <motion.h1
          className={styles.tagline}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Discover Smarter. Shop Faster. Save More.
        </motion.h1>
        <div className={styles.ctaContainer}>
          <Link to="/shop" className={styles.ctaButton}>
            Explore Products
          </Link>
          <Link to="/deals-reviews" className={styles.ctaButton}>
            Read Deals & Reviews
          </Link>
        </div>
      </div>
      <div className={styles.badge}>
        <span>🔥</span> <span>{userCount} Users Browsing Now</span>
      </div>
    </div>
  );
};

export default Hero;