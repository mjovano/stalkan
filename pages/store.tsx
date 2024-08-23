'use client';
import React from "react";
import StoreInventory from "../components/inventoryStore.js";
import { useEffect, useState} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { ref, onValue} from "firebase/database";

const Store = () => {
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<object[]>([]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {  //save user to state on login
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
            Welcome to the store, here you can buy items to use in your tours.
          </p>
          <StoreInventory items={items} userId={user.uid}/>
        </>
      ) : (
        <h1 style={{ marginTop: "2em" }}> Please log in to access the store. </h1>
      )}
    </div>
  );
};

export default Store;
