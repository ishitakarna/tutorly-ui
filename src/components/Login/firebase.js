// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqQXoD-AkRX__WMiA-bB9osWXoqkZEZEg",
  authDomain: "fp-b3161.firebaseapp.com",
  projectId: "fp-b3161",
  storageBucket: "fp-b3161.appspot.com",
  messagingSenderId: "395638822106",
  appId: "1:395638822106:web:ddb391a9993d053f7181e3",
  measurementId: "G-ZKS2M337H3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth}
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(provider);
