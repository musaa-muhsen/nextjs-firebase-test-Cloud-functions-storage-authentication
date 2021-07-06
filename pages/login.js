import React, { useState } from "react";
import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";


export default function Login({ props }) {
  firebaseClient();
 
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <div>
        <h1>
          Login
        </h1>
       
          <label htmlFor="email">Email address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="emailAddress"
            value={email}
            aria-describedby="email-helper-text"
          />
   
      
       
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPass(e.target.value)}
            type="password"
            id="pass"
            value={pass}
            aria-describedby="password-helper-text"
          />
   
          <button
            onClick={async () => {
              await firebase
                .auth()
                .createUserWithEmailAndPassword(email, pass)
                .then(function (firebaseUser) {
                  window.location.href = "/authenticated";
                })
                .catch(function (error) {
                  const message = error.message;
                  console.log(message)
                });
            }}
          >
            Create account
          </button>

          <button
            onClick={async () => {
              await firebase
                .auth()
                .signInWithEmailAndPassword(email, pass)
                .then(function (firebaseUser) {
                  window.location.href = "/authenticated";
                })
                .catch(function (error) {
                  const message = error.message;
                  console.log(message)
                });
            }}
          >
            Log in
          </button>
    </div>
  );
}
