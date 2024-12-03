
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
  signOut
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, addDoc ,getDocs ,doc, deleteDoc , updateDoc,setDoc} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";



const firebaseConfig = {
  apiKey: "AIzaSyA4XR1HvKF5SIv-J9VeHVAFeVEN6PzYAfg",
  authDomain: "fir-signuploginform-c0c43.firebaseapp.com",
  projectId: "fir-signuploginform-c0c43",
  storageBucket: "fir-signuploginform-c0c43.firebasestorage.app",
  messagingSenderId: "310275773574",
  appId: "1:310275773574:web:7be3a6d2c85e371bde6d07"
};

const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);

const db = getFirestore(app);

// const auth = getAuth();
// const user = auth.currentUser;


export {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged,
  sendEmailVerification,
  updateProfile, signOut,
  getFirestore, collection,db,addDoc,getDocs,doc, deleteDoc ,updateDoc,auth,setDoc};