// Import the functions you need from the SDKs you need
import { app, database, auth } from './firebase.js';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Initialize Google Provider
const provider = new GoogleAuthProvider();

// Get references to elements by their ID
const loginbtn = document.getElementById('signinbtn'); // The Sign In button
const googleSignIn = document.getElementById('googlebtn'); // The Google Sign-In button

// Handle email/password login
loginbtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission

    // Get email and password values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate input
    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    // Sign in with email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setTimeout(() => {
                window.location.href = '/index.html'; // Redirect after login
            }, 1000);
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage); // Show error message
        });
});


googleSignIn.addEventListener('click', (e) => {
    console.log("Clicked");
    e.preventDefault();

    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            setTimeout(() => {
                window.location.href = '/index.html';
            }, 1000);

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
});

