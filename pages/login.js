'use client';
import { useState } from "react";
import { signUp, signIn} from ".//api/auth";
import { useRouter } from 'next/router';


export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  const handleSignUp = () => {
    signUp(email, password, name);
  };

  const handleSignIn = () => {
    try {
      signIn(email, password);
      router.push('/intermediary')    // stall 1 second before redirecting to home page
    } catch (error) {
      alert(`Sign in failed: ${error.message}`);
      console.error("Error signing in:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <h1 style={{ marginBottom: "50px" }}>Name isnt used for signing in.</h1>
      <div style={{ display: "flex", flexDirection: "column"}}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{ marginBottom: "10px" }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{ marginBottom: "10px" }}
        />
        <input
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          style={{ marginBottom: "30px" }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button onClick={handleSignUp} style={{ marginRight: "10px" }}>Sign Up</button>
        <button onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  );
}
