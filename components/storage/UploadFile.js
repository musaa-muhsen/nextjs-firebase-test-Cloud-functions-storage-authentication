import firebase from 'firebase/app';
import 'firebase/storage';
import {useRef, useState} from 'react';

const UploadFile = () => {

    const [value, setValue] = useState(0);
    const inputEl = useRef(null);
    console.log(inputEl);

    function uploadFile() {
        var file = inputEl.current.files[0];
        console.log(file);
        if(file === undefined || file === null) {
            return null
        } else {
            var storageRef = firebase.storage().ref('user_uploads/' + file.name);
            var task = storageRef.put(file)
        }
       


        task.on('state_change',       
           function progress(snapshot) {
               setValue((snapshot.bytesTransferred/snapshot.totalBytes)*100)
           },
           function error(err) {
               console.log(err)
           },
           function complete() {
               // this is where to send a notification maybe 
               console.log('Uploaded to firebase storage successfully');
           }
        )
    }

     return (
         <>
           <progress value={value} max="100"></progress>
           <input 
             type="file"
             onChange={uploadFile}
             ref={inputEl}
            />
         </>
     )
}

export default UploadFile
