// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk3U81PUD7ChMNv2Iy9nb1_cDXUlzlfh4",
  authDomain: "ramonpush-ec112.firebaseapp.com",
  projectId: "ramonpush-ec112",
  storageBucket: "ramonpush-ec112.appspot.com",
  messagingSenderId: "43395237087",
  appId: "1:43395237087:web:91868c240388afacc3956a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);