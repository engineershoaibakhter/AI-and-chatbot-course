// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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

// const firebaseConfig = {
//   apiKey: "AIzaSyCqboyMB-OaXnrfWIoDZdHtPZ7_y9uI7iU",
//   authDomain: "builders-493ff.firebaseapp.com",
//   projectId: "builders-493ff",
//   storageBucket: "builders-493ff.appspot.com",
//   messagingSenderId: "1044279640882",
//   appId: "1:1044279640882:web:71acd850ef63fd13338d2b",
//   measurementId: "G-STLX7X2Y66"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Correct function call

export { db };
