import { initializeApp } from "firebase/app";
import "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0yfFTLBBrou1Ik-qOUVQ6VD-gjdUQgvc",

  authDomain: "bulls-sublease.firebaseapp.com",

  projectId: "bulls-sublease",

  storageBucket: "bulls-sublease.appspot.com",

  messagingSenderId: "986215428046",

  appId: "1:986215428046:web:bac18e4a3e1c53f566c59f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const analytics = getAnalytics(app);
