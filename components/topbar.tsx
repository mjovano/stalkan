import React from 'react';
import styles from '../styles/topbar.module.css';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

const TopBar = () => {
  return (
    <div className={styles.topbar}>
      <div className={styles.title}>Roadside Picnic</div>
      <a href="/login" className={styles.loginlink}>Login</a>
    </div>
  );
};

export default TopBar;
