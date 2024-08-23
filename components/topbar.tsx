'use client';

import React from "react";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import styles from "../styles/topbar.module.scss";
import Hamburger from "hamburger-react";
import {logOut} from "../pages/api/auth.js";
import {auth} from "../firebaseConfig";
import { useRouter } from "next/router";

interface TopBarProps {
  hideSideBar: boolean;
  toggleSidebar: Dispatch<SetStateAction<boolean>>;
}

const TopBar: React.FC<TopBarProps> = ({ hideSideBar, toggleSidebar }) => {

  const user=auth.currentUser;
  const displayName=(user) ? user.displayName : "User"; //in case displayname is empty
  const userName=(displayName) ? displayName : "User";
  const router = useRouter();

  const handleLogOut = () => {
    logOut();
    router.push('/login');
  }


  return (
    <div className={styles.topbar}>
      <div className={styles.HamburgerBar}>
        <Hamburger toggled={hideSideBar} toggle={toggleSidebar} />
      </div>
      <div className={styles.title}>Roadside Picnic</div>
      {user ? (
        <>
          <div className={styles.hello}>Hello, {userName}</div>
          <div className={styles.actions} onClick={handleLogOut}>Logout</div>
        </>
      ) : (
        <Link href="/login" className={styles.actions}>Login</Link>
      )}
    </div>
  );
};

export default TopBar;
