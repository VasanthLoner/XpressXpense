// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import { getFirestore , doc , setDoc } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuLJb1QN6DTDzNqE1TAC8w9e8O9qgH0LA",
  authDomain: "reactxfirebase-7e6a8.firebaseapp.com",
  projectId: "reactxfirebase-7e6a8",
  storageBucket: "reactxfirebase-7e6a8.appspot.com",
  messagingSenderId: "387393019972",
  appId: "1:387393019972:web:ce91e9bc8f37b49b4ddc11",
  measurementId: "G-10V0B59W77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db, auth, provider , doc , setDoc}