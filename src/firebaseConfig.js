// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCJcd03H78tDmDJMqnk0n3XyDzokzYtK00",
  authDomain: "blissapp-1464d.firebaseapp.com",
  projectId: "blissapp-1464d",
  storageBucket: "blissapp-1464d.appspot.com",
  messagingSenderId: "686062898858",
  appId: "1:686062898858:web:eb533fd7a92bbea140cad3",
  measurementId: "G-8LGTWT8PWV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };
