// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

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
const analytics = getAnalytics(app);
const db=getFirestore(app);

export {db};