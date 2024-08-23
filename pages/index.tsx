import React from "react";
import { useEffect, useState} from "react";
import {onAuthStateChanged, User } from "firebase/auth";
import { auth} from "../firebaseConfig";
import { useRouter } from 'next/router';
import { deleteUserAcc } from "./api/auth.js";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {   //save user to state on login
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    // Cleanup
    return () => unsubscribe();
  }, []);

  const handleDeleteUserAcc = (user: User) => {
    deleteUserAcc(user).then(() => {
      alert("Account deleted successfully!");
    }).catch((error: Error) => {
      alert("Error deleting account: " + error.message);
    });

    router.push('/login');
  }

  return (
    <div>
      <p style={{margin: "2rem", textAlign: "center" }}>
        Welcome to RoadsidePicnic.com, this site hosts a simulation game based on the book of the same name.
        The goal of the game is to go on tours to the Exclusion Zone and bring back spoils for monetary gain.
        
        First you should buy some items from the Store page, then you can continue to the Tour page and select
        those items to use them in your tour. The more items you use, the higher your chances of success,
        and the less risk you have of suffering injuries. 
      </p>

      { user ? (
      <p style={{margin: "2rem", textAlign: "center" }}>
        Your progress is saved to your account,
        if you want to delete it and create a new one, click the button below. 
      </p>
      ) : (
        <p style={{margin: "2rem", textAlign: "center" }}>
          To save your progress and access the game, please login or create an account.
        </p>
      )}

      {user && (
        <button
          style={{ display: "block", margin: "0 auto", fontSize: "24px" }}
          onClick={() => handleDeleteUserAcc(user)}
        >
          Delete Account
        </button>
      )}
    </div>
  );
};