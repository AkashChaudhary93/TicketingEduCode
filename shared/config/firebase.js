import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCBbdKmRFPPIFF2iSyb4jdb2qfDgN-VJcM",
    authDomain: "educode-c3518.firebaseapp.com",
    projectId: "educode-c3518",
    storageBucket: "educode-c3518.firebasestorage.app",
    messagingSenderId: "392254129487",
    appId: "1:392254129487:web:f3ab1c5838a6488307713a",
    measurementId: "G-FD92XVB7HF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
