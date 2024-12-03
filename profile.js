
import { 
    getAuth, 
    onAuthStateChanged, 
    sendEmailVerification, 
    updateProfile, 
    signOut 
  } from "./firebase.js";
  
  const auth = getAuth();
  let profilePage = document.getElementById("profile-page");
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(user);
  
        // Render the profile page
        profilePage.innerHTML = `
            <div class="container py-5 h-100" style="width: 1000px;">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col col-lg-6 mb-4 mb-lg-0">
                        <div class="card mb-3" style="border-radius: .5rem;">
                            <div class="row g-0">
                                <div class="col-md-4 gradient-custom text-center text-white" style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;">
                                    <img src="${user.photoURL || 'https://www.example.com/default-image.jpg'}" width="75px" />
                                    <h5>${user.displayName || 'Name'}</h5>
                                    <p>Web Developer</p>
                                    <i class="far fa-edit mb-5"></i>
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body p-4">
                                        <h6>Information</h6>
                                        <hr class="mt-0 mb-4">
                                        <div class="row pt-1">
                                            <div class="col-6 mb-3">
                                                <h6>Email</h6>
                                                <p class="text-muted">${user.email}</p>
                                            </div>
                                            <div class="col-6 mb-3">
                                                <h6>Phone</h6>
                                                <p class="text-muted">123 456 789</p>
                                            </div>
                                        </div>
                                        <div class="col-sm-9">
                                            <p class="text-muted mb-0">${user.emailVerified ? "Verified" : "Not Verified"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column align-items-center">
                <button type="button" class="btn btn-success mb-2" id="verifyEmail">Verify your email</button>
                <button type="button" class="btn btn-success mb-2" id="updateProfile">Update profile</button>
                <button type="button" class="btn btn-success" id="signOut">Sign Out</button>
            </div>
        `;
  
        // Handle email verification
        document.getElementById("verifyEmail").addEventListener("click", () => {
            sendEmailVerification(auth.currentUser).then(() => {
                console.log("Email verification sent.");
            }).catch((error) => {
                console.log(error);
            });
        });
  
        // Handle profile update
        document.getElementById("updateProfile").addEventListener("click", () => {
            const newName = prompt("Enter new display name", user.displayName);
            const newPhotoURL = prompt("Enter new profile photo URL", user.photoURL);
  
            updateProfile(auth.currentUser, {
                displayName: newName || user.displayName,
                photoURL: newPhotoURL || user.photoURL
            }).then(() => {
                console.log("Profile updated.");
                // Update the profile page with the new values
                document.querySelector("h5").innerText = newName;
                document.querySelector("img").src = newPhotoURL;
            }).catch((error) => {
                console.log("Error updating profile: ", error);
            });
        });
  
      //   Handle sign out
        document.getElementById("signOut").addEventListener("click", () => {
            signOut(auth).then(() => {
                console.log("User signed out.");
                location.href = "post.html"; 
            }).catch((error) => {
                console.log("Error signing out: ", error);
            });
        });
      }})
  
   