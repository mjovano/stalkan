import React from 'react';
import styles from '../styles/side.module.css';
import { Home, Store, Tour } from '@mui/icons-material';
import Link from 'next/link';

const Side = () => {
  return (
    <div className={styles.side}>
      <Link href="/" className={styles.sidebutton}><Home/></Link>
      <Link href="/store" className={styles.sidebutton}><Store/></Link>
      <Link href="/expedition" className={styles.sidebutton}><Tour/></Link>
    </div>
  );
};

export default Side;
