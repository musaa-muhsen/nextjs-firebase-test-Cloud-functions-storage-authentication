// the client is going to set up our auth so we can actually authenticate somebody 
//const firebase = require('firebase'); 
import firebase from "firebase";


const FIREBASE_CONFIG = {
        apiKey: "AIzaSyAz-uWDU6w8pFiBY7cRAzbXah-L4LrtqgM",
        authDomain: "nextjs-with-firebase-aut-33aec.firebaseapp.com",
        databaseURL: "nextjs-with-firebase-aut-33aec.firebaseio.com",
        projectId: "nextjs-with-firebase-aut-33aec",
        storageBucket: "nextjs-with-firebase-aut-33aec.appspot.com",
        messagingSenderId: "120821319539",
        appId: "1:120821319539:web:729285ac22a977c3252706"
}

export default function firebaseClient() {
   
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG); // we initialzing it 
    }
  }
