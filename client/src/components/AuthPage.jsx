import React, { useState, useContext, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useContext(AuthContext);
  const navigate = useRef(useNavigate());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const result = isLogin
      ? await login(trimmedEmail, trimmedPassword)
      : await signup(trimmedEmail, trimmedPassword);

    if (result.success) {
      navigate.current('/shop');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className={styles.container}>
      <Canvas className={styles.canvas}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff6f61" />
        <Sphere args={[1.2, 64, 64]} position={[0, 0, 0]} scale={2.5}>
          <MeshDistortMaterial
            color="#6b21a8"
            attach="material"
            distort={0.6}
            speed={2.5}
            roughness={0.3}
            metalness={0.8}
          />
        </Sphere>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
      </Canvas>

      <div className={styles.formContainer}>
        <h2 className={styles.title}>{isLogin ? 'Login' : 'Signup'}</h2>
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.inputContainer}>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className={styles.switchButton}
          >
            Switch to {isLogin ? 'Signup' : 'Login'}
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;