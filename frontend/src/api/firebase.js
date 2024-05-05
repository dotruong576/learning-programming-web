import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKU24K9lLMANiCx2llDBVMOOF3S14uT_M",
  authDomain: "projectweb-6bdb3.firebaseapp.com",
  projectId: "projectweb-6bdb3",
  storageBucket: "projectweb-6bdb3.appspot.com",
  messagingSenderId: "589752933108",
  appId: "1:589752933108:web:7002b315c6f23a21c9dca1",
  measurementId: "G-NY7Z2VHP9V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
