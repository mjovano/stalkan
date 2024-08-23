'use client';

import React from "react";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

import { SideNavigation } from "@/constants/navigation";
import styles from "../styles/side.module.scss";

interface Side {
  hideSideBar: Boolean;
  animate: Boolean;
  toggleSidebar: () => void;
}

const Side: React.FC<Side> = ({ hideSideBar, animate, toggleSidebar }) => {
  return (
    <>
      <nav
        className={`${styles.side} ${
          hideSideBar
            ? animate
              ? styles.enter
              : ""
            : animate
            ? styles.exit
            : ""
        }`}
      >
        {SideNavigation.map((tab) => (
          <Link href={tab.to} key={tab.to} className={styles.TabContainer}>
            {tab.title}
            {tab.icon}
          </Link>
        ))}
      </nav>
      <div className={hideSideBar && styles.Backdrop} onClick={toggleSidebar} />
    </>
  );
};

export default Side;
