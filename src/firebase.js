// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_rimMURT8LIZYyFHshEh6FHIODzfiiww",
    authDomain: "aviato-admin-7447d.firebaseapp.com",
    projectId: "aviato-admin-7447d",
    storageBucket: "aviato-admin-7447d.appspot.com",
    messagingSenderId: "717832320061",
    appId: "1:717832320061:web:697106c8b7274db4ade654",
    measurementId: "G-BN9JJ5MPJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);