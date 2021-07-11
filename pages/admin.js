import React from "react";
import nookies from "nookies";
import { verifyIdToken } from "../firebaseAdmin";
import {firebase} from "../firebaseClient";
import "@firebase/auth";
import styles from '../styles/admin.module.scss'
import FileGrid from "../components/FileGrid";
import useFirestore from '../hooks/useFirestore';

//import firebase from "firebase/app";

const Admin = ({  email, uid, name }) => {
  const {docs} = useFirestore('files');
  console.log(docs)
   // firebaseClient(); // what does do? 
    return ( 
        <>
      <header className={styles.header}>
        <h1>{name}</h1> 
        <div></div>
        <button
        className={styles.logOutBtn}
          onClick={
                  async () => {
                await firebase.auth().signOut();
                window.location.href = "/";
          }}>Sign out</button>
        </header>
        <section className={styles.mainContainer}>
         { docs.length > 0 ? <FileGrid /> : null} 
       
          </section>  

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