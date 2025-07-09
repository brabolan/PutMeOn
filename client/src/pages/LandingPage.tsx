import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/landing-bg.jpg'; // ✅ image imported from src/assets
import styles from './LandingPage.module.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className={styles.title}>🎵 Welcome to PutMeOn</h1>
      <p className={styles.subtitle}>Discover and review music with your friends.</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={() => navigate('/register')}>Sign Up</button>
        <button className={styles.button} onClick={() => navigate('/login')}>Log In</button>
      </div>
    </div>
  );
};

export default LandingPage;