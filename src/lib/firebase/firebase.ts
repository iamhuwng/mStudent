// @module:platform-core @layer:service @owner:studio
import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  projectId: "mstudent-9bs9s",
  appId: "1:268391876195:web:7a0e1d54f28cb3c13f9a56",
  storageBucket: "mstudent-9bs9s.firebasestorage.app",
  apiKey: "AIzaSyB5tVeJZ__PhOAhdPj-SE6nfH3Ll0rSFDg",
  authDomain: "mstudent-9bs9s.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "268391876195"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
