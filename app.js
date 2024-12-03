import { getAuth, createUserWithEmailAndPassword } from "./firebase.js";

const auth = getAuth();

let signUpBtn = document.getElementById("signup-btn");
let signupEmail = document.getElementById("signup-email");
let signupPassword = document.getElementById("signup-password");

if (signUpBtn) {
  console.log("Signup button found"); // Check if button exists

  signUpBtn.addEventListener("click", () => {
    console.log("Signup button clicked"); // Confirm button click is registered

    // Check if email and password fields have input
    if (signupEmail.value.trim() && signupPassword.value.trim()) {
      createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
        .then((userCredential) => {
          console.log("User created successfully"); // User creation success
          const user = userCredential.user;
          console.log(user);

          // Redirect to login.html after a successful signup
          setTimeout(() => {
            location.href = "login.html"; // Ensure the path is correct
          }, 1000);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);


          // Handle specific error cases
          if (errorCode === "auth/email-already-in-use") {
            console.log("Use another email.");
          }
        });
    } else {
      console.log("Please enter your data.");
    }
  });
} else {
  console.error("Signup button not found in DOM");
}
