// Import the functions you need from the SDKs you need
import {getApps, initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAk-qeeqUN9CjqdicLpIB_F8ed_BBR9WxI",
    authDomain: "knot-k6789.firebaseapp.com",
    projectId: "knot-k6789",
    storageBucket: "knot-k6789.appspot.com",
    messagingSenderId: "871597529586",
    appId: "1:871597529586:web:5e3d27e540e0546fd5336b",
    measurementId: "G-B6QV7BFDN7"
};

// Initialize Firebase

if (!getApps().length) {
    initializeApp(firebaseConfig);
}
export const fireAnalytics = getAnalytics();
export const fireAuth = getAuth();

export const fireStorage = getStorage();
