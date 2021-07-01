import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'



import React, { useEffect, useState} from 'react';
import Link from 'next/link';
import {useAuth} from '../auth';
//import { ButtonGroup } from '@chakra-ui/core';
//import Container from '../components/Container';
//import {Flex, Box, Button, Text, Heading, Stack} from "@chakra-ui/react";
import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
require('firebase/auth')

export default function Home() {
  firebaseClient();

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [displayName, setDisplayName] = useState("");
  //console.log(displayName)

  const {user} = useAuth();
  //console.log(account)

       return (
           <> 
          {/* <p>{`User ID: ${
            user ? user.uid : "no user signed in"
          }`}</p> */}
          {/* <div>
            <button>
              <Link href="/authenticated">
                <a>Go to authenticated route</a>
              </Link>
            </button>
            <button>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </button>
          </div> */}
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
            value={password}
            aria-describedby="password-helper-text"
          />

          <label htmlFor="password">User Name</label>
          <input
            onChange={(e) => setDisplayName(e.target.value)}
            type="text"
            id="userName"
            value={displayName}
            aria-describedby="username-helper-text"
          />
         
          <button
            onClick={async () => {
              // this is where we need to add the username 

                //   .createUser({
              //     email,
              //     password,
              //     displayName	
              // })
              await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((userCredentials)=>{
                  //If you do not want to add an User doc to Firestore and just use the Firestore Auth data, you don`t need the pushUserData() method.
                  if(userCredentials.user){
                    userCredentials.user.updateProfile({
                      displayName : displayName
                    })
                  }
                  // maybe add validation here about empty user name 
                  console.log(userCredentials.user)

                })
                // .then(function (firebaseUser) {
                //   window.location.href = "/authenticated";
                // })
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
              await firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then((userCredentials)=>{
                 // console.log(x)
                  if (userCredentials.user.displayName ===  displayName) {
                    window.location.href = "/authenticated";
                  } else {
                    alert('no entry')
                  }
                })
                // .then(function (firebaseUser) {
                //   window.location.href = "/authenticated";
                // })
                .catch(function (error) {
                  const message = error.message;
                  console.log(message)
                });
            }}
          >
            Log in
          </button>
    </div>
       
  
    </>
     
  )
}



// getServerSideProps or whatever function needs to be spelt properly 
// export const getServerSideProps = async () => {
//   const query = '*[ _type == "parentAccount"]'
//   const account = await sanityClient.fetch(query)

// console.log(account)
//   if (!account.length) {
//     return {
//       props: {
//         account: []
//       }

//     }
//   } else {
//   return {
//     props: {
//       account
//     }

//   }
// }
// }
