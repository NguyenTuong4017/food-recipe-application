// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { FIREBASE_API_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${FIREBASE_API_KEY}`,
  authDomain: "food-recipe-application-c686b.firebaseapp.com",
  projectId: "food-recipe-application-c686b",
  storageBucket: "food-recipe-application-c686b.firebasestorage.app",
  messagingSenderId: "944406361088",
  appId: "1:944406361088:web:eb088ce7b275c6817694e5",
  measurementId: "G-2CNJ72HZV4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
export { auth, db };
