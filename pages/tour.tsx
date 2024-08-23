'use client';
import React from "react";
import TourInventory from "../components/inventoryTour.js";
import { useEffect, useState} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { ref, onValue} from "firebase/database";

const Tour = () => {
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<object[]>([]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const inventoryRef = ref(db, 'users/' + user?.uid + '/inventory');
        onValue(inventoryRef, (snapshot) => {
        const data = snapshot.val();
        setItems(data);
        });

      } else {
        setUser(null);
        const inventoryRef = ref(db, 'users/test/inventory');
        onValue(inventoryRef, (snapshot) => {
        const data = snapshot.val();
        setItems(data);
      });
    }
  });

  // Cleanup
  return () => unsubscribe();
  }, []); 

  return (
    <div>
      {user ? (
        <>
          <p style={{margin: "2rem", textAlign: "center" }}>
            Welcome to the tour, the more items you take with you, the higher your chances of succeeding,
            and the lower your chances of suffering injuries. Do not start a tour if you are below 30% health.
          </p>
          <TourInventory items={items} userId={user.uid}/>
        </>
      ) : (
        <h1 style={{ marginTop: "2em" }}> Please log in to access the tour. </h1>
      )}
    </div>
  );
};

export default Tour;
