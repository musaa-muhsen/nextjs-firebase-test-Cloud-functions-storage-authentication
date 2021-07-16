import React from 'react';
import useFirestore from '../hooks/useFirestore';

const FileGrid = () => {
    const {docs} = useFirestore('files');
    //console.log(docs.length);
    // extract the names somehow maybe use the filter method and reducer method for this 
    //const userName = docs[0].userName
    

    const namesMapped = docs.map((d,i) => {
       // console.log(d.userName)
        const names = d.userName
        return names
    })
    
    const uniqueNames = [...new Set(namesMapped)];
    // uniqueArray = a.filter(function(item, pos, self) {
    //     return self.indexOf(item) == pos;
    // })
    const filterArray = uniqueNames.map((doc,i) => {
        //console.log(d.length)
       //uniqueNames 
        for (let i = 0; i < docs.length; i++ ) {
            const result = docs.filter(d => d.userName === doc)
            return result
        }
        return result
        //return result
       // docs.map(doc => {
           // console.log(d.length)
       // });
    })
    console.log(filterArray);

 for (let i = 0; i < docs.length; i++ ) {
     // console.log(i);      
}
    
// return this as a component to embend into each section docs[i]
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
 
export default FileGrid;