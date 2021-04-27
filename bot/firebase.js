const firebase = require("firebase");

const firebaseConfig = "YOUR FIREBASE CONFIG"
 
firebase.initializeApp(firebaseConfig);

exports.firebase = firebase;
