// the client is going to set up our auth so we can actually authenticate somebody 
//const firebase = require('firebase'); 
//import firebase from 'firebase/app'
// the below imports are option - comment out what you don't need
// import 'firebase/auth'
// import 'firebase/firestore'
// import 'firebase/storage'
// import 'firebase/analytics'
// import 'firebase/performance'

import fb from '@firebase/app'; 
import '@firebase/firestore' // database 
import '@firebase/storage'; // store our files 
// SDK 

const FIREBASE_CONFIG = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// export default function firebaseClient() { 
//     if (!firebase.apps.length) {
//       firebase.initializeApp(FIREBASE_CONFIG); // we initialzing it 
//     }
//     //console.log('winning')
//   }

/*
The reason behind this is that firebase can only be initialized once, but the way you're doing it right now, Next.js tries to initialize it both on the backend and the frontend.
This method checks to see whether there it's been initialized already, and only initializes it if it has been. If not, it just returns the initialized firebase app
*/
export const firebase = !fb.apps.length ? fb.initializeApp(FIREBASE_CONFIG) : fb.app();

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
// const timestamp = fb.firestore.FieldValue.serverTimestamp()
// console.log(timestamp)

export {projectStorage, projectFirestore}
