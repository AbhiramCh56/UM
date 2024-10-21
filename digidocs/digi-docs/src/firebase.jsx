// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCr_fl9fnIf1n44hjBXDGPXVEdFZE_TVh8",
  authDomain: "digital-docs-ac783.firebaseapp.com",
  projectId: "digital-docs-ac783",
  storageBucket: "digital-docs-ac783.appspot.com",
  messagingSenderId: "710428417052",
  appId: "1:710428417052:web:ed21dd3e59cedcc0ca53d9",
  measurementId: "G-WVP4NWGQTD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
