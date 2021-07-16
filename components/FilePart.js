import React from 'react';

const FilePart = ({docs}) => {
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
                  //console.log(date)


                return (
                    <article className="fileWrapper" key={doc.id}>
                        <div className="fileNameContainer">
                            <p className="titleFile">{doc.fileName}</p>
                            <p className="fromWho">{doc.userName}</p>


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
 
export default FilePart;