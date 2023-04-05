import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpuWWk1oN2D7k1z_VgbOn8d8Wryl26uYo",
  authDomain: "auth-projectlibrary.firebaseapp.com",
  projectId: "auth-projectlibrary",
  storageBucket: "auth-projectlibrary.appspot.com",
  messagingSenderId: "848263319284",
  appId: "1:848263319284:web:538a94bfb9206895cb18a1",
  measurementId: "G-D97X3WGJXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider}