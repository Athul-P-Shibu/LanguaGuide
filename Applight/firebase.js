import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";


// Credentials
const firebaseConfig = {
    apiKey: "AIzaSyDUUPesRAPgBFZVEqAxTwSEgkSGLIL2x9s",
    authDomain: "languaguide.firebaseapp.com",
    projectId: "languaguide",
    storageBucket: "languaguide.appspot.com",
    messagingSenderId: "510777253218",
    appId: "1:510777253218:web:232344fd963195d216203b",
    measurementId: "G-4FX8REEEV5"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app);
const auth = getAuth(app);

export { app, database, auth}