import React, { useEffect, useState} from 'react';
//import {useAuth} from '../auth';
import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
import styles from '../styles/SignInPage.module.scss'



// import SingInButton from './buttons/SignInbutton';
// import CreateButton from './buttons/CreateButton';

const SignInPage = () => {

    firebaseClient();
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    //console.log(displayName)
  
    //const {user} = useAuth();

    return ( 
        <div className={styles.signInContainer}>
        <h1 className={styles.title}>
          Login
        </h1>
         <div>
          <input
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
            onChange={(e) => setPass(e.target.value)}
            type="password"
            id="pass"
            value={password}
            aria-describedby="password-helper-text"
            placeholder="Password"
          />
        </div>
 
         <button
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
              if (displayName.length > 1) {
                if(userCredentials.user){
                  userCredentials.user.updateProfile({
                    displayName : displayName
                  })         
                }
                setEmail("");
                setPass("");
                setDisplayName("");
              } else {
                setErrorMessage('please add a user name');
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
            onClick={async (e) => {
              e.preventDefault();
              await firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then((userCredentials)=>{
                  //console.log(userCredentials);
                  if (userCredentials.user.displayName ===  displayName) {
                    window.location.href = "/authenticated";
                  } else {
                    // add a component for error here 
                    setErrorMessage('no entry')
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
     );
}
 
export default SignInPage;

       {/* <CreateButton setEmail={setEmail} email={email} setPass={setPass} password={password} setDisplayName={setDisplayName}/>
        <SingInButton setEmail={setEmail} email={email} setPass={setPass} password={password} setDisplayName={setDisplayName}/> */}
