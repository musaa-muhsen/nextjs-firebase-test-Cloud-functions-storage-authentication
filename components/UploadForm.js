// collections store each type of data, so we could have a collection for users and then inside that collection we store documents where each document represents a single user in our case were gonna have a collection called images which is eventually going to store image urls 
import React, {useState} from 'react';
import ProgressBar from './ProgressBar';

const UploadForm = ({userName}) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null)

    const changeHandler = (e) => {
        let selected = e.target.files[0]; // could use ref
    
        if (selected) {
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError('no file was selected') // change the error to something logic 
        }
    }

    return ( 
        <div className="formContainer">
           <form>
            <input type="file" onChange={changeHandler}/>
            <div className="output">
                {error && <div className="error">{error}</div>}
                {file && <div className="fileName">{file.name}</div> }
                {file && <ProgressBar userName={userName} file={file} setFile={setFile} />} 
            </div>
        </form>
        </div>
     );
}
 
export default UploadForm;
