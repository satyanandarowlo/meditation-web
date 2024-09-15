// authService.js
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut, // Correct import here
} from "firebase/auth";
import { auth } from "./firebaseConfig";

// Sign up with Email
export const signUpWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in with Email
export const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Google Sign-in
export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// Monitor Auth State
export const onAuthStateChangedHandler = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Sign out
export const logout = () => {
  return signOut(auth); // Use signOut from firebase/auth
};
