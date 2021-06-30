import React from "react";
import nookies from "nookies";
import { verifyIdToken } from "../firebaseAdmin";
 import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";
import {sanityClient} from '../sanity'; 
import 'firebase/auth';        // for authentication

console.log(sanityClient)

function Authenticated({ session, email, uid, account }) {
  firebaseClient();
  //console.log(email)
  console.log(account)
  /*
  if (account === undefined) {
    // do something 
  }
  */
  if (session) {
    return (
      <div>
          <h1>
            Authenticated
        
          </h1>
         
            <p>{email}</p>
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
    console.log(context)
    const query = '*[ _type == "parentAccount"]'
    const account = await sanityClient.fetch(query)

    if (!account.length) {
      return {
        props: {
          account: []
        }
  
      }
    }
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      props: { session: `Your email is ${email} and your UID is ${uid}.`, uid, email, account },
    };
  } catch (err) {
    // maybe change to 302???
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