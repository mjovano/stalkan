import React from 'react';
import styles from '../styles/side.module.css';
import { Home, Store, Tour } from '@mui/icons-material';


const Side = () => {
  return (


    <div className={styles.side}>
      
      <a href="/" className={styles.sidebutton}><Home/></a>
      <a href="/store" className={styles.sidebutton}><Store/></a>
      <a href="/expedition" className={styles.sidebutton}><Tour/></a>
    </div>
  );
};

export default Side;
