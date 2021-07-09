import  {useState, useEffect} from 'react';
import { projectStorage, projectFirestore} from '../firebaseClient';
//import { timestamp} from '../firebaseAdmin';
// import fire from '@firebase';

// import '@firebase/firestore'

// const timestamp = fire.firestore.FieldValue.serverTimestamp()

const useStorage = (file, userName) => {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null) // the image url onces it been fully uploaded that we get from storage after the image has fully uploaded  

    // we want to use the storage sdk to upload this file we get inside the hook now once we it's uploaded i also want to get that image url and store that in the database and that way our database will contain a list of all image urls and then we can use that data to load the images in a react component 
    // now the code to what was mentioned above needs to run time we get a new file value because that value file value could change over time as a user selects different files 
    // therefore we're going to put all of our logic inside a useEffect hook 

    useEffect(() => {
        // get a reference to where the file should be saved 
        const storageRef = projectStorage.ref(file.name); // we have a name on that file object that we take in like travel3.png etc        
        // this is asynchronous it takes some to do thats why it's await 
        const collectionRef = projectFirestore.collection('images');
        storageRef.put(file).on('state_changed', (snap) => { 
        // on is whenever something happens snapshot object and that snapshot is bassically a snapshot in time of the upload at that moment in time, this state change could happen 5-6 times during the cycle of the upload so the function will be fired several times while it's being uploaded    
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
        }, (err) => {
        setError(err)
        }, async () => {
          const url = await storageRef.getDownloadURL(); // once we have the url of the image that we've just uploaded at that point in the future what we're going to do is take that url and save it in a document inside an images collection inside our firestore database and that we should have a collection of urls for our images we can use those we can read from those in our app to display images on our website   
         // const createdAt =  timestamp(); 
          collectionRef.add({
              url,
              fileName: file.name,
              userName         
        });     
          setUrl(url); // different scope url 
        })
    }, [file])
  // returning the state from this hook
   return { progress, url, error}
}


export default useStorage;
