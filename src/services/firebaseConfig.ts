// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBqfz9_GEKJOGd2sVIsCWHH_VXd2zDpEGA",
    authDomain: "saji-memo.firebaseapp.com",
    projectId: "saji-memo",
    storageBucket: "saji-memo.firebasestorage.app",
    messagingSenderId: "368216635189",
    appId: "1:368216635189:web:3b05f8f7cfd303b755fe7c",
    measurementId: "G-1S9DCHTP8G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);