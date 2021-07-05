import React from "react";
import nookies from "nookies";
import { verifyIdToken } from "../firebaseAdmin";
 import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";
import {sanityClient} from '../sanity'; 
import 'firebase/auth';   // for authentication
import UploadFile from "../components/storage/UploadFile";

function Authenticated({  email, uid, sanityData, name }) {
  firebaseClient();
 
  const sanityLength = Object.keys(sanityData).length;
 // if statement here for a loading screen 
 // add more component based parts is essential 
  if (uid && sanityLength > 1) {
    return (
      <div>
          <h1>{name}</h1>
           
            <p>
              You're now authenticated can now do anything you want.
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
            <UploadFile />
      </div>
    );
  } else {
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
  const token = await verifyIdToken(cookies.token);
  const { uid, email, name } = token;
  //console.log(email, name);
  const query3 = '*'
  const query4 = `{
    "one": *[_type == "client" && name == "${name}" && email == "${email}"],
    "two": *[_type == "landingPage"]
    }`

  const sanityData = await sanityClient.fetch(query4);
  //console.log(sanityData)
  //maybe add a condional here
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