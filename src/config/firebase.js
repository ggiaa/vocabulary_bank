import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCChMcolng65VAN3nnPAT7U0Rgk8V91bqU",
  authDomain: "vocabulary-bank-90b1a.firebaseapp.com",
  projectId: "vocabulary-bank-90b1a",
  storageBucket: "vocabulary-bank-90b1a.appspot.com",
  messagingSenderId: "396811322008",
  appId: "1:396811322008:web:1156b94b3a2f017bbf86ed",
  measurementId: "G-GR95XLKZFX",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);
