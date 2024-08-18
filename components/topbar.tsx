import React from 'react';
import styles from '../styles/topbar.module.css';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import Link from 'next/link';

const TopBar = () => {
  return (
    <div className={styles.topbar}>
      <div className={styles.title}>Roadside Picnic</div>
      <Link href="/login" className={styles.loginlink}>Login</Link>
    </div>
  );
};

export default TopBar;
