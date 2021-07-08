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

// initializing the admin app this point 
