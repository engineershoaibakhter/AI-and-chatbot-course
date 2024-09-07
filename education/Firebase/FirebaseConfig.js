// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Correct import for Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBtGMdBte6HjmKedv2GpfiI32MSWUYxJp4",
  authDomain: "codinghub-823a5.firebaseapp.com",
  projectId: "codinghub-823a5",
  storageBucket: "codinghub-823a5.appspot.com",
  messagingSenderId: "614493696705",
  appId: "1:614493696705:web:e9dd3f90a1894ed36d1a40",
  measurementId: "G-7Z1YEYTM6W"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Correct function call

export { db };
