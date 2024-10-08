// Imported SDKs
import { app, database, auth } from './firebase.js';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Initialize Firebase
const provider = new GoogleAuthProvider();

// Function to check password strength
function isPasswordStrong(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
}

const signUpForm = document.querySelector('.form'); // Use the class selector for the form
const signUpButton = document.querySelector('.button-submit'); // Sign Up button
const googleButton = document.getElementById('googlebtn'); // Google button

// Function after clicking the Sign Up button
signUpButton.addEventListener('click', (e) => {
    e.preventDefault();

    const studentName = document.querySelector('.input[placeholder="Enter your Name"]').value; // Get Name
    const email = document.querySelector('.input[placeholder="Enter your Email"]').value; // Get Email
    const password = document.querySelector('.input[placeholder="Enter your Password"]').value; // Get Password

    // Check password strength
    if (!isPasswordStrong(password)) {
        alert("Use a strong password (minimum 8 characters with uppercase, lowercase, number, and special character)");
        return; // Prevent further execution
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Wait for 1 second (1000 milliseconds) before redirecting to index.html
            setTimeout(() => {
                window.location.href = '/index.html';
            }, 1000);
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
});
googleButton.addEventListener('click', (e) => {
    console.log("Clicked");
    e.preventDefault();
    // Use the already initialized auth object
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
