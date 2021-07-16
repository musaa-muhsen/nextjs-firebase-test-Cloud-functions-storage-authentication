import React from 'react';
import useFirestore from '../hooks/useFirestore';
import FilePart from './FilePart';
const FileGrid = () => {
    const {docs} = useFirestore('files');
    //console.log(docs.length);
    // extract the names somehow maybe use the filter method and reducer method for this 
    //const userName = docs[0].userName
    alert(1)

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

let filePart = [];
for (let i = 0; i < filterArray.length; i++) {
   filePart.push(<FilePart docs={filterArray[i]} />)
}
console.log(filePart)
    
// return this as a component to embend into each section docs[i]
    return ( 
       {filePart}
     );
}
 
export default FileGrid;