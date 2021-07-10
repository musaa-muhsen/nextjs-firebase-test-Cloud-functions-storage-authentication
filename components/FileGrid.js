import React from 'react';
import useFirestore from '../hooks/useFirestore';

const FileGrid = () => {
    const {docs} = useFirestore('files');
    console.log(docs)
    return ( 
        <div className="fileGrid">
            {
                docs && docs.map(doc => (
                    <div className="fileWrapper" key={doc.id}>
                        <a href={doc.url} download>{doc.fileName}</a>
                    </div>
                ))
            }
        </div>
     );
}
 
export default FileGrid;