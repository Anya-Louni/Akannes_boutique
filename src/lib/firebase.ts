// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "akkanes-magical-boutique",
  "appId": "1:510576374727:web:c492fbe7c16fa8fef69fe2",
  "storageBucket": "akkanes-magical-boutique.firebasestorage.app",
  "apiKey": "AIzaSyAd2O7hI9IyaE96e1Q_G0WUW1q38svA9Tg",
  "authDomain": "akkanes-magical-boutique.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "510576374727"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

const db = getFirestore(app);

export { db };
