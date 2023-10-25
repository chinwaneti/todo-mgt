// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7nY0HpDe4hlRzDWBEtPrPy2l2MzmrEPM",
  authDomain: "task-aa8bb.firebaseapp.com",
  projectId: "task-aa8bb",
  storageBucket: "task-aa8bb.appspot.com",
  messagingSenderId: "683451799380",
  appId: "1:683451799380:web:bbf4827eb401136423dac1",
  measurementId: "G-DNGNFQ045V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


export {analytics, app, auth, db}