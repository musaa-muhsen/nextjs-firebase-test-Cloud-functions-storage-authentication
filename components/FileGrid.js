import React from 'react';
import useFirestore from '../hooks/useFirestore';

const FileGrid = () => {
    const {docs} = useFirestore('files');
    console.log(docs);
    // extract the names somehow maybe use the filter method and reducer method for this 
    

    return ( 
        <div className="fileGrid">
            {
                docs && docs.map(doc => {
                    let time = {
                        seconds: doc.createdAt.seconds,
                        nanoseconds: doc.createdAt.nanoseconds
                    }
                     
                    const fireBaseTime = new Date(
                        time.seconds * 1000 + time.nanoseconds / 1000000,
                      );
                      const date = fireBaseTime.toDateString();
                      const atTime = fireBaseTime.toLocaleTimeString();
                      console.log(date)


                    return (
                        <article className="fileWrapper" key={doc.id}>
                            <div className="fileNameContainer">
                                <p>{doc.fileName}</p>

                            </div>
                            {/* <a href={} download>{doc.fileName}</a> */}
                            <div className="cardFooter">
                                <div className="dateContainer">
                                    <p>{date}</p>
                                </div>
                            <div className="btnContainer">
                            <a href={doc.url} className="downloadBtn" target="_blank" rel="noopener noreferrer" download>
                         {/* <button className="downloadBtn"> */}
                            Download
                         {/* </button> */}
                           </a>
                            </div>
                            </div>
                           
                        </article>
                    )})
            }
        </div>
     );
}
 
export default FileGrid;