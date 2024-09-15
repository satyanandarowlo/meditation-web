// Auth.js
import React, { useState, useEffect } from "react";
import {
  signInWithGoogle,
  logout,
  onAuthStateChangedHandler,
} from "./AuthService";

const Auth = ({ user, setUser }) => {
  useEffect(() => {
    const authListener = onAuthStateChangedHandler((user) => {
      setUser(user);
    });
    return () => authListener();
  }, []);

  return (
    <div className="auth-container">
      {!user ? (
        <button onClick={signInWithGoogle}>Login with Google</button>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </div>
  );
};

export default Auth;
