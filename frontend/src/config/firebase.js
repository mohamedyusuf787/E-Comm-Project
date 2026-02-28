// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxaAQtieHIZwb05RUpRAiewJLxvgMGV6c",
  authDomain: "e-commerce-project-3340e.firebaseapp.com",
  projectId: "e-commerce-project-3340e",
  storageBucket: "e-commerce-project-3340e.firebasestorage.app",
  messagingSenderId: "655549307516",
  appId: "1:655549307516:web:917c8e8aa7e205efa287f9",
  measurementId: "G-VW18JQ99T4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export default auth