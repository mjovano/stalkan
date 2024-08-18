'use client';
import { useState } from "react";
import { signUp, signIn, logOut } from ".//api/auth";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    signUp(email, password);
  };

  const handleSignIn = () => {
    signIn(email, password);
  };

  const handleLogOut = () => {
    logOut();
  };

  return (
    <div>
      <h1>Firebase Authentication with Next.js</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
}
