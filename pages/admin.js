import React, { useEffect, useState} from "react";
import nookies from "nookies";
import { verifyIdToken } from "../firebaseAdmin";
import {firebase} from "../firebaseClient";
import "@firebase/auth";
import styles from '../styles/admin.module.scss'
import FileGrid from "../components/FileGrid";
import useFirestore from '../hooks/useFirestore';
import { projectFirestore } from '../firebaseClient';

//import firebase from "firebase/app";

const Admin = ({  email, uid, }) => {
  const [emailState, setEmailState] = useState("");
  const [password, setPass] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {docs} = useFirestore('files');
  //const {users} = useFirestore('users');
  //
  const users = projectFirestore.collection('users')
  console.log(users)
  const togetherString = (value) => {  
    let str = value.split(' ').join('');
    str = str + '@generic.com'; 
   return str
} 
  //console.log(docs)
   // firebaseClient(); // what does do? 
    return ( 
        <>
      <header className={styles.header}>
        <h1>{email}</h1> 
        <div></div>
        <button
        className={styles.logOutBtn}
          onClick={
                  async () => {
                await firebase.auth().signOut();
                window.location.href = "/";
          }}>Sign out</button>
        </header>
        <section className={styles.mainContainer}>
          <div className={styles.formContainer}>
        <div >
          <input
            className={styles.inputs}
            onChange={(e) => setEmailState(e.target.value)}
            type="email"
            id="emailAddress"
            value={emailState}
            aria-describedby="email-helper-text"
            placeholder="User Name"
          />
         </div>
          <div>
          <input
             className={styles.inputs}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            id="pass"
            value={password}
            aria-describedby="password-helper-text"
            placeholder="Password"
          />
        </div>
 
         <button
            className={styles.btn}

        onClick={async (e) => {
          // this is where we need to add the username 

            //   .createUser({
          //     email,
          //     password,
          //     displayName	
          // })
          e.preventDefault();

          await firebase
            .auth()
            .createUserWithEmailAndPassword(togetherString(emailState), password)
            .then((userCredentials)=>{
              console.log(userCredentials.user.email)
                //If you do not want to add an User doc to Firestore and just use the Firestore Auth data, you don`t need the pushUserData() method.
                /*
                if (displayName.length > 0) {
                  if(userCredentials.user){
                 
                  }
                }
                */
                // const newEmail = togetherString(email);
                // console.log(newEmail)
                // userCredentials.user.updateProfile({
                //   email : newEmail
                // })      
                // const user = firebase.auth().currentUser;
                //  user.updateProfile({
                //     displayName : 
                //   })
              
                //const collection =  projectFirestore.collection('users');
                

              //   }
              //   setEmail("");
              //   setPass("");
              //   setDisplayName("");
              // } else {
              //   setErrorMessage('Please add a user name.');
              // }
              // maybe add validation here about empty user name 
              //console.log(userCredentials.user)
              firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
            .set({
              email
            })
            
            })
            .catch(function (error) {
              const message = error.message;
              setErrorMessage(message)
            });
        }}
      >
        Create account
      </button>
      
      <button
            className={styles.btn}
      >
        Edit
      </button>
      <button
            className={styles.btn}

        onClick={async (e) => {
          // this is where we need to add the username 

            //   .createUser({
          //     email,
          //     password,
          //     displayName	
          // })
          e.preventDefault();

          await firebase
            .auth()
            .createUserWithEmailAndPassword(togetherString(emailState), password)
            .then((userCredentials)=>{


              const user = userCredentials.user.uid;

              user.delete().then(function() {
               console.log('user deleted')
              }).catch(function(error) {
                console.log(error)
              });
                //If you do not want to add an User doc to Firestore and just use the Firestore Auth data, you don`t need the pushUserData() method.
                /*
                if (displayName.length > 0) {
                  if(userCredentials.user){
                 
                  }
                }
                */
                // const newEmail = togetherString(email);
                // console.log(newEmail)
                // userCredentials.user.updateProfile({
                //   email : newEmail
                // })      
                // const user = firebase.auth().currentUser;
                //  user.updateProfile({
                //     displayName : 
                //   })
              
                //const collection =  projectFirestore.collection('users');
                

              //   }
              //   setEmail("");
              //   setPass("");
              //   setDisplayName("");
              // } else {
              //   setErrorMessage('Please add a user name.');
              // }
              // maybe add validation here about empty user name 
              //console.log(userCredentials.user)
            //   firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
            // .set({
            //   email
            // })
            
            })
            .catch(function (error) {
              const message = error.message;
              setErrorMessage(message)
            });
        }}
      >
        Delete
      </button>

         <p>{errorMessage}</p>
         </div>

         { docs.length > 0 ? <FileGrid /> : null} 
       
          </section>  

          {/* <p>Login</p> */}

        </>
     );
}




export const getServerSideProps = async (context) => {
    //console.log(context) // node stuff 
    // here will be dynamic 
   
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    console.log(token)
    const { uid, email } = token;
    //console.log(email, name);
    return {
      props: { uid, email},
    };
    
  } catch (err) {
    // maybe change to 302??? what is 307 and
    context.res.writeHead(307, { Location: "/" });
    context.res.end();
    return { props: {} };
   }
  }
 
export default Admin;