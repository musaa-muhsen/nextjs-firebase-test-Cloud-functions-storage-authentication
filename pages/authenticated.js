import React from "react";
import nookies from "nookies";
import { verifyIdToken } from "../firebaseAdmin";
 import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";
import {sanityClient} from '../sanity'; 
import 'firebase/auth';   // for authentication

function Authenticated({  email, uid, sanityData, name }) {
  firebaseClient();
  console.log(sanityData)

  /*
  if (account === undefined) {
    // do something 
  }
  */
 // if statement here for a loading screen 
  if (uid) {
    return (
      <div>
          <h1>
            Authenticated
        
          </h1>
         
            <p>{email}</p>
            <p>{name}</p>
            <p>
              You can now do anything you want in our application.
            </p>
      
            <button
              onClick={
                  async () => {
                await firebase.auth().signOut();
                window.location.href = "/";
              }
            }
            >
              Sign out
            </button>
      </div>
    );
  } 
  // else if (sanityData.length > 1) {
  //   // could add a footer and header of some sort here 
  //   return (
  //     <div>
  //       <p></p>
  //     </div>
  //   );
  // } 
  else {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }
}

export const getServerSideProps = async (context) => {
  //console.log(context) // node stuff 
  // here will be dynamic 
 

  // if (!sanityData.length) {
  //   return {
  //     props: {
  //       sanityData: []
  //     }

  //   }
  // }
try {


  const cookies = nookies.get(context);
  //console.log(cookies)
  const token = await verifyIdToken(cookies.token);
  console.log(token);
  const { uid, email, name } = token;
  const query3 = '*'
  const query4 = `{
    "one": *[_type == "client" && name == "${name}" && email == "${email}"],
    "two": *[_type == "landingPage"]
    }`
    console.log(query4)
  const sanityData = await sanityClient.fetch(query4);
  // maybe add a condional here
  return {
    props: { uid, email, sanityData, name},
  };
  
} catch (err) {
  // maybe change to 302??? what is 307 and
  context.res.writeHead(307, { Location: "/" });
  context.res.end();
  return { props: {} };
}


}

export default Authenticated;