// the admin is going to take care of decrypting and making sure that they're addlowed in our application 
import admin from "firebase-admin";
const serviceAccount = require("./secret.json");

export const verifyIdToken = (token) => {

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "nextjs-with-firebase-aut-33aec.firebaseio.com",
    });
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      console.log('coming from firebaseAdmin.js')
      throw error;  
    });
};

export const adminTest = (uid) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "nextjs-with-firebase-aut-33aec.firebaseio.com",
    });
  }

  return admin
    .auth()
    .createCustomToken(uid)
     .then((customToken) => {
       console.log(customToken, 'hello')
     })
  .catch((error) => {
    console.log('Error creating custom token:', error);
  });
} 

//export const timestamp = admin.firestore.FieldValue.serverTimestamp();

// initializing the admin app this point 
