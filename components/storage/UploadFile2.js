import { firebase } from '@firebase/app';
import '@firebase/firestore'
import '@firebase/storage';

import React,  {useRef, useState, useEffect} from 'react';

//const db = firebase.firestore()



const UploadFile2 = () => {
    
    const [fileUrl, setFileUrl] = useState(null);
    const [users, setUsers] = useState(null);

    // 
   const onFileChange = async (e) => {
      const file = e.target.files[0];  // get a reference to our file 
      const storageRef = firebase.storage().ref(); // storage reference from firebase 
      const fileRef = storageRef.child(file.name); // file reference 
      await fileRef.put(file)// put our file into firebase storage 
      setFileUrl(await fileRef.getDownloadURL());//we need to get the URL for this file because when we will making the user record with username and avatar 
      //(after above) now let's submit the user data and link it with out image file 
}

// here we are adding to the collection 
    const onSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        if(!username) {
          return
        }
        firebase.firestore().collection('users').doc(username).set({
            name: username,
            avatar: fileUrl
        })
    }
   
    // here we are retrieving 
    useEffect(() => {
     const fetchUsers = async () => {
         const usersCollection = await firebase.firestore().collection('users').get();
         console.log(usersCollection)
         setUsers(usersCollection.docs.map(doc => {
             return doc.data();
         }))
     }
     fetchUsers();
    }, [])

    return (
        <>
        <form onSubmit={onSubmit}>
            <input type="file" onChange={onFileChange} />
            <input type="text" name="username" placeholder='name' />
            <button>Submit</button>
        </form>
        <ul>
            {
                // users.map(user => {
                //     return (<li key={user.name}>
                //         <img src={user.avatar} alt={user.name} width="100" height="100" />
                //         <p>{user.name}</p>
                //         </li>
                //     );
                // })
                null
            }
        </ul>
        </>
    )

}

export default UploadFile2;