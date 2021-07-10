import React, { useEffect, useState} from 'react';
//import {useAuth} from '../auth';
//import firebaseClient from "../firebaseClient";
//import firebase from "firebase/app";
import {firebase}  from '../firebaseClient';
import "@firebase/auth";
import styles from '../styles/SignInPage.module.scss'



// import SingInButton from './buttons/SignInbutton';
// import CreateButton from './buttons/CreateButton';

const SignInPage = () => {
    //firebaseClient();
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    //console.log(displayName)
  
    //const {user} = useAuth();
    return ( 
        <div className={styles.signInContainer}>
          <div className={styles.signFormWrapper}>
        <p className={styles.title}>
          Login
        </p>
         <div>
          <input
          className={styles.inputs}
            onChange={(e) => setDisplayName(e.target.value)}
            type="text"
            id="userName"
            value={displayName}
            aria-describedby="username-helper-text"
            placeholder="User Name"
          />
          </div>
          <div>
          <input
             className={styles.inputs}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="emailAddress"
            value={email}
            aria-describedby="email-helper-text"
            placeholder="Email"
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
            .createUserWithEmailAndPassword(email, password)
            .then((userCredentials)=>{
              //If you do not want to add an User doc to Firestore and just use the Firestore Auth data, you don`t need the pushUserData() method.
              if (displayName.length > 0) {
                if(userCredentials.user){
                  userCredentials.user.updateProfile({
                    displayName : displayName
                  })         
                }
                setEmail("");
                setPass("");
                setDisplayName("");
              } else {
                setErrorMessage('Please add a user name.');
              }
              // maybe add validation here about empty user name 
              //console.log(userCredentials.user)
            })
            // .then(function (firebaseUser) {
            //   window.location.href = "/authenticated";
            // })
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
            onClick={async (e) => {
              e.preventDefault();
              await firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then((userCredentials)=>{
                  //console.log(userCredentials);
                  if (userCredentials.user.displayName ===  displayName && userCredentials.user.displayName !== 'Admin') {
                    //console.log(userCredentials.user);
                    window.location.href = "/dashboard";
                   }  else if (userCredentials.user.displayName ===  displayName && userCredentials.user.displayName === 'Admin') {
                    window.location.href = "/admin";
                   }
                   else {
                    // add a component for error here 
                    setErrorMessage('No entry!')
                  }
                  setEmail("");
                  setPass("");
                  setDisplayName("");
                })
                // .then(function (firebaseUser) {
                //   window.location.href = "/authenticated";
                // })
                .catch(function (error) {
                  const message = error.message;
                  // add a component for error here as well 
                  setErrorMessage(message)
                });
            }}
          >
            Log in
          </button>
         <p>{errorMessage}</p>
         </div>
    </div>
     );
}
 
export default SignInPage;

       {/* <CreateButton setEmail={setEmail} email={email} setPass={setPass} password={password} setDisplayName={setDisplayName}/>
        <SingInButton setEmail={setEmail} email={email} setPass={setPass} password={password} setDisplayName={setDisplayName}/> */}
     //  else if (userCredentials.user.displayName === 'Admin') {
                  //   window.location.href = "/admin";
                  //   }

                  /*
 else if (userCredentials.user.displayName == 'Admin') {
                      //window.location.href = "/admin";
                      console.log('admin')
                       }
                  */