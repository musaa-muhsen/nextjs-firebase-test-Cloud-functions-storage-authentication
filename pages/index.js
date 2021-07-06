import styles from '../styles/Home.module.scss'
//import {sanityClient} from '../sanity'; 
import React from 'react';
import SignInPage from '../components/SignInPage'
import WriteToCloudFirestore from '../components/cloudFirestore/Write';

export default function Home({sanityData}) {
//console.log(sanityData)



       return (
           <> 
           <div className={styles.mainContainer}>
           <SignInPage />
           <WriteToCloudFirestore />
           </div>
            
           </>
  )
}

//The onChange event in React detects when the value of an input element changes. 

/*
export const getServerSideProps = async (context) => {


  const mutations = [{
    create: {
      _id: 'client',
      _type: 'document',
      title: 'test2'
    }
  }]
  
  fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-28/data/mutate/production`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_ACCESS_TOKEN}`
    },
    body: JSON.stringify({mutations})
  })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.error(error))
  //const query3 = '*[_type == "parentAccount"]'
//   const query4 = `{
//     "one": *[_type == "client" && name == "${gucci}" && email == "tomford@aol.com"],
//     "two": *[_type == "landingPage"]
//     }`
    //console.log(query4)
    const q5 = '*[_type == "object"]'
  const sanityData = await sanityClient.fetch(q5);
/*
  // no need for async await because it's kind of self involved 
   sanityClient.delete('8ac587de-a55c-4a21-8a34-30d45cb9a523')
   .then((res) => {
     console.log(res)
   }).catch((err) => {
    console.error('Delete failed: ', err.message)
  })
  */
  // if (!sanityData.length) {
  //   return {
  //     props: {
  //       account: []
  //     }
// return {
//   props: {
//     sanityData 
//   }
// }
// }
