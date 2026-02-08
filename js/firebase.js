// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIj12kTycTu6R2Xm0en3cI-JrGiqkNXRU",
  authDomain: "valentina-3be7d.firebaseapp.com",
  projectId: "valentina-3be7d",
  storageBucket: "valentina-3be7d.firebasestorage.app",
  messagingSenderId: "44867406627",
  appId: "1:44867406627:web:e5d1afca292ef6657d1a96",
  measurementId: "G-3NCW42FRP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);