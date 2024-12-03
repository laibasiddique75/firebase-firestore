import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "./firebase.js";

const auth = getAuth(); // Initialize Firebase authentication
const provider = new GoogleAuthProvider(); // Google Auth Provider

// DOM Elements
const signInEmail = document.getElementById("login-email");
const signInPassword = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");
const googleSignInBtn = document.getElementById("google-signin-btn");

// Email/Password Login
loginBtn.addEventListener("click", () => {
  if (signInEmail.value.trim() && signInPassword.value.trim()) {
    signInWithEmailAndPassword(auth, signInEmail.value, signInPassword.value)
      .then((userCredential) => {
        // User signed in successfully
        const user = userCredential.user;
        console.log("User signed in:", user);

        // Redirect to profile page
        setTimeout(() => {
          location.href = "profile.html";
        }, 2000);
      })
      .catch((error) => {
        // Handle login errors
        console.error("Login Error:", error.message);
        alert(`Error: ${error.message}`); // Optional user-friendly alert
      });
  } else {
    console.log("Please fill in both email and password.");
    alert("Please fill in both email and password."); // Optional user-friendly alert
  }
});

// Google Sign-In
googleSignInBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // User signed in successfully
      const user = result.user;
      console.log("Google Sign-In Successful:", user);

      // Redirect to profile page
      setTimeout(() => {
        location.href = "profile.html";
      }, 2000);
    })
    .catch((error) => {
      // Handle Google sign-in errors
      console.error("Google Sign-In Error:", error.message);
      alert(`Google Sign-In Error: ${error.message}`); // Optional user-friendly alert
    });
});
