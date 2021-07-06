// the client is going to set up our auth so we can actually authenticate somebody 
//const firebase = require('firebase'); 
import firebase from 'firebase/app'
// the below imports are option - comment out what you don't need
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/analytics'
import 'firebase/performance'


const FIREBASE_CONFIG = {
        // apiKey: "AIzaSyAz-uWDU6w8pFiBY7cRAzbXah-L4LrtqgM",
        // authDomain: "nextjs-with-firebase-aut-33aec.firebaseapp.com",
        // databaseURL: "nextjs-with-firebase-aut-33aec.firebaseio.com",
        // projectId: "nextjs-with-firebase-aut-33aec",
        // storageBucket: "nextjs-with-firebase-aut-33aec.appspot.com",
        // messagingSenderId: "120821319539",
        // appId: "1:120821319539:web:729285ac22a977c3252706"
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export default function firebaseClient() {
   
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG); // we initialzing it 
    }

    //console.log('winning')
  }
