import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = "YOUR FIREBASE CONFIG";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
