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
  apiKey: "AIzaSyCFNywQqzzhwtAGpQ8sfxbFMMzEAG6Zvg8",
  authDomain: "bullssublease-test.firebaseapp.com",
  projectId: "bullssublease-test",
  storageBucket: "bullssublease-test.appspot.com",
  messagingSenderId: "24945419143",
  appId: "1:24945419143:web:c098f6a0bc9bf697606922",
  measurementId: "G-XV5MXTK15P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const analytics = getAnalytics(app);
