const functions = require('firebase-functions');
const admin = require('firebase-admin'); // firebase admin is way to use firebase on the server side so we're actually running these cloud functions in node.js rather just on the web  
// admin SDK allows us basically to interact with the firestore 

admin.initializeApp();
const db = admin.firestore();

/*
exports.createUserDocument = functions.auth.user().onCreate((user) => {
     return db.collection('users')
     .doc(user.uid) // the UID of the user that just signed up will be used as the firestore uid record it's kind of linking firebase.auth and our firestore record 
     .set(JSON.parse(JSON.stringify(user)));
});

// first param is what we send to the function 
// context has useful information including the authentication state of the user that made this request
// 
exports.onUpdateUser = functions
  .firestore.document('users/{id}')
  .onUpdate((change, context) => {
     // do stuff when user's profile gets updated
      // Data before update and after update
    const previousValue = change.before.data();
    const newValue = change.after.data();
    console.log('hello');
  
})
*/
exports.removeUser = functions.firestore.document("/users/{uid}")
    .onDelete((snapshot, context) => {        
        const serviceAccount = require('../secret.json');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "nextjs-with-firebase-aut-33aec.firebaseio.com",
        });
        return admin.auth().deleteUser(context.params.uid);
    });





// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

