import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYi6UCuAYRI0vldUaWuRoWb-ZanccPTgQ",
  authDomain: "cosmic-insights-6gimj.firebaseapp.com",
  projectId: "cosmic-insights-6gimj",
  storageBucket: "cosmic-insights-6gimj.appspot.com",
  messagingSenderId: "21162250712",
  appId: "1:21162250712:web:605f582f269ae9fc99e2ad"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 