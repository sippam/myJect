// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider} from "firebase/auth";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyDpuWWk1oN2D7k1z_VgbOn8d8Wryl26uYo",
//   authDomain: "auth-projectlibrary.firebaseapp.com",
//   projectId: "auth-projectlibrary",
//   storageBucket: "auth-projectlibrary.appspot.com",
//   messagingSenderId: "848263319284",
//   appId: "1:848263319284:web:538a94bfb9206895cb18a1",
//   measurementId: "G-D97X3WGJXZ"
// };

// // Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig)
// }
// // const app = initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth();
// // const auth = firebase.auth();
// // const provider = new firebase.auth.GoogleAuthProvider();

// // export {auth, provider}

import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getPerformace } from "firebase/performance";

const firebaseConfig = {
  apiKey: "AIzaSyAR25g6d-fLKkL5UahOEZVMRaEcFAA_EOU",
  authDomain: "en-library-77188.firebaseapp.com",
  projectId: "en-library-77188",
  storageBucket: "en-library-77188.appspot.com",
  messagingSenderId: "1011626388441",
  appId: "1:1011626388441:web:f711b885b8a45e0a4707c8",
  measurementId: "G-NP3412YWQ0"
};

const firebaseLogin = () => {
  if (!getApps().length) {
    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);

    if (typeof window !== "undefined") {
      if ("measurementId" in firebaseConfig) {
        // const analytics = getAnalytics(app);
        // const performance = getPerformace(app);
      }
    } else {
      console.log("Already Initialized firebase");
    }
  }
};

export default firebaseLogin