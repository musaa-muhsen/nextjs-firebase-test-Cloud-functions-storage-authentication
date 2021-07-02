import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {sanityClient} from '../sanity'; 
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
//client.fetch
// getServerSideProps or whatever function needs to be spelt properly 

export const getServerSideProps = async (context) => {
//  const query = '*[_type == "client" && name == "Gucci"]';
//  const query2 = '*[_type == "landingPage"]';
// const gucci = 'Tom Ford';
//   const query3 = '*'
//   const query4 = `{
//     "one": *[_type == "client" && name == "${gucci}" && email == "tomford@aol.com"],
//     "two": *[_type == "landingPage"]
//     }`
    //console.log(query4)
  //const sanityData = await sanityClient.fetch(query4);
  //const sanityLandingPageData = await sanityClient.fetch(query2);
   //const sanityData = await sanityClient.getDocuments(["2a63e79a-d57c-4b0a-9523-2e9869950bb7", "7c5c5fa1-7a57-44fd-86b2-64761941ccd2"]);
   //const hello = await sanityData([a, b] );
  //  const [a,b] = sanityData;
  //  console.log(a,b)
  // .then(([a, b]) => {
    
  //   return a , b
   
  // })
   sanityClient.delete('ac0b986e-daac-4cff-a0d6-257675ab75a2')
   .then((res) => {
     console.log(res)
   }).catch((err) => {
    console.error('Delete failed: ', err.message)
  })
  console.log(process.env.NEXT_PUBLIC_SANITY_API_ACCESS_TOKEN)
  
   //console.log(delete2);
  // .then(res => {
  //   console.log(res)
  //   console.log('Bike deleted')
  // })
  // .catch(err => {
  //   console.error('Delete failed: ', err.message)
  // })

  // if (!sanityData.length) {
  //   return {
  //     props: {
  //       account: []
  //     }

  //   }
  // } else {

//}
// const {a,b} =sanityData;
// console.log(a, 'yo')
return {
  props: {
    null: null
  }

// }

}
}



export default function Home({}) {
  firebaseClient();
  //console.log(sanityData)
  //console.log(sanityLandingPageData)

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [displayName, setDisplayName] = useState("");
  //console.log(displayName)

  const {user} = useAuth();
  //console.log(sanityData)

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
<div>
{/* <label htmlFor="password">User Name</label> */}
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
  
{/* <label htmlFor="email">Email address</label> */}
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
{/* <label htmlFor="password">Password</label> */}
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
                  } else {
                    console.log('please add user name');
                  }
          
                  // maybe add validation here about empty user name 
                  //console.log(userCredentials.user)
                  setEmail("");
                  setPass("");
                  setDisplayName("");
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
                    console.log('no entry')
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

//The onChange event in React detects when the value of an input element changes. 

