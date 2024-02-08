// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyB0yfFTLBBrou1Ik-qOUVQ6VD-gjdUQgvc",
  authDomain: "bulls-sublease.firebaseapp.com",
  projectId: "bulls-sublease",
  storageBucket: "bulls-sublease.appspot.com",
  messagingSenderId: "986215428046",
  appId: "1:986215428046:web:bac18e4a3e1c53f566c59f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);