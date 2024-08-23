'use client';

import React from "react";
import styles from "../styles/userAccountInfo.module.scss";
import { useEffect, useState} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { ref, onValue} from "firebase/database";
import { updateHealth, updateBalance } from "../pages/api/manageDB.js";


const Orders = () => {
  return (
    <div className={styles.OrdersWrapper}>
      <h4>ORDERS: </h4>
      <p>There are no new orders today.</p>
    </div>
  );
};



const ProfileSummary = () => {
  const [user, setUser] = useState<User | null>(null);
  const [health, setHealth] = useState<number>(0);
  const [cashBalance, setCash] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const healthRef =  ref(db, 'users/'+ user.uid + '/health');
        onValue(healthRef, (snapshot) => {
          const data = snapshot.val();
          setHealth(data);
        });
        const cashRef = ref(db, 'users/' + user.uid + '/cashBalance');
        onValue(cashRef, (snapshot) => {
          const data = snapshot.val();
          setCash(data);
        });

      } else {
        setUser(null);
        setHealth(0);
        setCash(0);
      };
    // Cleanup
    return () => unsubscribe();
    });
  }, []);

  const healCost = Math.round((100 - health)*0.5);

  const healthHeal = async() => {
    if (cashBalance >= healCost) {
      const newHealth = 100;
      const newBalance = cashBalance - healCost;
      updateHealth(user?.uid, newHealth);
      updateBalance(user?.uid, newBalance);
    } else {
      console.log("Not enough money to heal.");
    }
  };

  return (
    <div className={styles.ProfileSummaryWrapper}>
      
      <div className={styles.HelthStatusContainer}>
        {cashBalance? (
          <>
            <h4>Balance: {cashBalance}$</h4>
          </>
        ) : (
            <h4>Balance: None</h4>
        )}
      </div>

      <div className={styles.HelthStatusContainer}>
        {health? (
            <>
              <h4>Health: {health}%</h4>
              {health === 100? ( // If health is full, dont show the heal button
                <></>
              ) : (
                <div className={styles.HealthContainer}>
                  <h5>Heal</h5>
                  <div>(Costs {healCost}$)</div>
                  <button onClick={healthHeal}>Heal</button>
                </div>
              )}
            </>
          ) : (
              <h4>Not logged in.</h4>
          )}
      </div>
    </div>
  );
};

const UserAccountInfo = () => {
  return (
    <div className={styles.RootWrapper}>
      <Orders />
      <ProfileSummary />
    </div>
  );
};

export default UserAccountInfo;
