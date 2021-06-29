import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {sanityClient} from '../sanity'; 


import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import {useAuth} from '../auth';
//import { ButtonGroup } from '@chakra-ui/core';
//import Container from '../components/Container';
//import {Flex, Box, Button, Text, Heading, Stack} from "@chakra-ui/react";


export default function Home() {

  const {user} = useAuth();
  //console.log(account)
console.log(user)
       return (
           <> 
                Welcome to our home
          <p>{`User ID: ${
            user ? user.uid : "no user signed in"
          }`}</p>
          <div>
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
