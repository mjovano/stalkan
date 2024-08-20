import React from "react";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import styles from "../styles/topbar.module.scss";
import Hamburger from "hamburger-react";

interface TopBarProps {
  hideSideBar: boolean;
  toggleSidebar: Dispatch<SetStateAction<boolean>>;
}

const TopBar: React.FC<TopBarProps> = ({ hideSideBar, toggleSidebar }) => {
  return (
    <div className={styles.topbar}>
      <div className={styles.HamburgerBar}>
        <Hamburger toggled={hideSideBar} toggle={toggleSidebar} />
      </div>
      <div className={styles.title}>Roadside Picnic</div>
      <Link href="/login" className={styles.loginlink}>
        Login
      </Link>
    </div>
  );
};

export default TopBar;
