import React from "react";
import Inventory from "../components/inventory";
import styles from "../styles/index.module.scss";

import { dummyItems, userId } from "@/constants/DUMMY_DATA";

export default function Home() {
  return (
    <div>
      <p> This is the home page</p>
      <h1>Inventory</h1>
      <Inventory items={dummyItems} userId={userId} />
    </div>
  );
}
