// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyALjyu8DmCDc563AGYdrY7egABJ6TEnjWQ",
  authDomain: "fastcatters.firebaseapp.com",
  databaseURL: "https://fastcatters-default-rtdb.firebaseio.com",
  projectId: "fastcatters",
  storageBucket: "fastcatters.appspot.com",
  messagingSenderId: "146222522802",
  appId: "1:146222522802:web:73b3884fac2e36203584ab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Realtime Database instance
export const database = getDatabase(app);
