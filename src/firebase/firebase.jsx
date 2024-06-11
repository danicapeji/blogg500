// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_H4RgNs4r0DTt8bnh6lae7TjAfH3vobU",
  authDomain: "blogg500.firebaseapp.com",
  projectId: "blogg500",
  storageBucket: "blogg500.appspot.com",
  messagingSenderId: "121453748377",
  appId: "1:121453748377:web:d535266f778e5e9c7d9808",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Använd getAuth här

export { app, auth };