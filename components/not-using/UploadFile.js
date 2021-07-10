import firebase from 'firebase/app';
import 'firebase/storage';
import {useRef, useState} from 'react';

// there's no ref here 
// this is the first one when just uploading and nothing more but you can see 
const UploadFile = () => {

    const [value, setValue] = useState(0);
    const [complete, setComplete] = useState(null);
    const inputEl = useRef(null);
    console.log(inputEl);

    function uploadFile() {
        var file = inputEl.current.files[0];
        //console.log(file);
       // condition here is because on cancelled download 
       // if(file === undefined || file === null) {
           if (file) {
            return null
        } else {
            var storageRef = firebase.storage().ref('user_uploads/' + file.name);
            var task = storageRef.put(file)
        }
       


        task.on('state_change',       
           function progress(snapshot) {
               // only for the progress part 
               setValue((snapshot.bytesTransferred/snapshot.totalBytes)*100)
           },
           function error(err) {
               console.log(err)
           },
           function complete() {
               // this is where to send a notification maybe 
               setComplete('Uploaded to firebase storage successfully');
           }
        )
    }

     return (
         <div className="upload-container">
             <p>You can upload any type of file, but still currently working on the ability to download and categories from other routes.</p>
           <progress value={value} max="100"></progress>
           <input 
             type="file"
             onChange={uploadFile}
             ref={inputEl}
            />
            {complete}
         </div>
     )
}

export default UploadFile
