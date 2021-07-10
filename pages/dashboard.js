import React from "react";
import nookies from "nookies";
import { verifyIdToken } from "../firebaseAdmin";
//import firebaseClient from "../firebaseClient";
import {firebase }  from '../firebaseClient';
import {sanityClient} from '../sanity'; 
import '@firebase/auth';   // for authentication doesnt do anything?
import Table from "../components/sanityComps/Table";
import Footer from '../components/sanityComps/Footer'
import styles from '../styles/Auth.module.scss'
//import {urlFor} from '../sanity';
import LandingPageMain from "../components/sanityComps/LandingPageMain";

import ProjectDetails from "../components/sanityComps/ProjectDetails";
import StaticsImages from "../components/sanityComps/StatsImages";

import UploadForm from "../components/UploadForm";
//import FileGrid from "../components/FileGrid";

function Authenticated({  email, uid, sanityData, name }) {
  const [tables, setTables] = React.useState([])
  

  React.useEffect(() => {
  if (sanityData.one[0].statics) {
    let tables = [];
    for (let i = 0; i < sanityData.one[0].statics.length; i++) {
      tables.push(<Table key={i} sanityData={sanityData.one[0].statics[i]}/>)
    }
    setTables(tables);
    //console.log('true')
   
  }
  // add more here 
}, [])

const sanityLength = Object.keys(sanityData).length;


 // if statement here for a loading screen 
 // add more component based parts is essential 
  if (sanityLength > 0) {
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
            <p>
              You're now authenticated can now do anything you want.
            </p>
           
              <LandingPageMain sanityData={sanityData}/>
              
              <p className="titleRem">Upload any file which goes to admin page and categorised into each client section. <br/> Added a loading bar and file name whilst uploading.</p>
              <UploadForm userName={name}/>
              {/* <FileGrid /> */}

              {tables.length > 0 ? tables : null}

         {sanityData.one[0].statsImages   && <StaticsImages sanityData={sanityData} /> }

             {sanityData.one[0].blockText && <ProjectDetails sanityData={sanityData}/>} 
            
           
         
        </section>  

        <Footer sanityData={sanityData} />
      </>
    );
  } else {
    return (
      <div>
        <p>Loading...</p>
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
    "two": *[_type == "landingPage"],
    "three": *[_type == "footer"]
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