import React from "react";
import nookies from "nookies";
import { verifyIdToken } from "../firebaseAdmin";
import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";

const Admin = ({  email, uid, name }) => {
    
    firebaseClient(); // what does do? 
    return ( 
        <>
        <h1>{name}</h1>
        <button
          onClick={
                  async () => {
                await firebase.auth().signOut();
                window.location.href = "/";
          }}>Sign out</button>
        </>
     );
}

export const getServerSideProps = async (context) => {
    //console.log(context) // node stuff 
    // here will be dynamic 
   
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email, name } = token;
    //console.log(email, name);
    return {
      props: { uid, email, name},
    };
    
  } catch (err) {
    // maybe change to 302??? what is 307 and
    context.res.writeHead(307, { Location: "/" });
    context.res.end();
    return { props: {} };
   }
  }
 
export default Admin;