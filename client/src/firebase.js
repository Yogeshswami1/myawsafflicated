// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth for Authentication
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiXXu6Y9Ugpic7MB3uWOX5SsCiJ1yoUeU",
  authDomain: "ecomm-afflicated.firebaseapp.com",
  projectId: "ecomm-afflicated",
  storageBucket: "ecomm-afflicated.firebasestorage.app",
  messagingSenderId: "682034279963",
  appId: "1:682034279963:web:f6b516bf6e578f48bbaabe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // Export auth for use in other files