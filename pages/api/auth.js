import { auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, deleteUser} from "firebase/auth";
import {ref, set, remove } from "firebase/database";
import inventoryData from "../../constants/inventoryData";

export const signUp = async (email, password, name) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      updateProfile(user, {displayName: name});

      set(ref(db, 'users/' + user.uid), {
        cashBalance: 1000,
        health : 100,
        username: name,
        inventory: inventoryData
      });
      
      alert('Signup successful! Please sign in to continue.');
    })
    .catch((error) => {
      console.error("Error signing up: ", error);
      alert(`Signup failed: ${error.message}`);
    });
}

export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) { 
    console.error("Error signing in:", error);
    alert(`Sign in failed: ${error.message}`);
  }
}


export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

export const deleteUserAcc = async (user) => {
  if (!user) { throw new Error("User is not authenticated.");}

  try {
      const userRef = ref(db, 'users/' + user.uid);
      await remove(userRef);
      await deleteUser(user);
      console.log("User account and data deleted successfully.");

  } catch (error) {
      console.error("Error deleting user account:", error);
      throw error;
  }
};