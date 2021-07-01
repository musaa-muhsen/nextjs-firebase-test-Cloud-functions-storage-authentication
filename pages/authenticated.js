import React from "react";
import nookies from "nookies";
import { verifyIdToken } from "../firebaseAdmin";
 import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";
import {sanityClient} from '../sanity'; 
import 'firebase/auth';        // for authentication

console.log(sanityClient)

function Authenticated({  email, uid, sanityData, name }) {
  firebaseClient();
  //console.log(hello)

  /*
  if (account === undefined) {
    // do something 
  }
  */
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
  } else {
    return (
      <div>
        <p>loading</p>
      </div>
    );
  }
}

export const getServerSideProps = async (context) => {
    //console.log(context) // node stuff 
    // here will be dynamic 
    const query = '*[ _type == "parentAccount"]'
    const sanityData = await sanityClient.fetch(query)

    if (!sanityData.length) {
      return {
        props: {
          sanityData: []
        }
  
      }
    }
  try {
    const cookies = nookies.get(context);
    //console.log(cookies)
    const token = await verifyIdToken(cookies.token);
    console.log(token);
    const { uid, email, name } = token;
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


//export const getServerSideProps = async (context) => {
  // const cookies = nookies.get(context);
  // const token = await verifyIdToken(cookies.token);
  // const { uid, email } = token;





export default Authenticated;