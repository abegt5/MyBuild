// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
  apiKey: "AIzaSyAxOWYG6uxraPV51ulzTXLPsWy38w4b198",
  authDomain: "1:213784172169:android:de68d3563fe7e3d1df9858",
  projectId: "mybuild-cc484",
  storageBucket: "mybuild-cc484.firebasestorage.app",
  messagingSenderId: "213784172169",
  appId: "mybuild-cc484"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };
