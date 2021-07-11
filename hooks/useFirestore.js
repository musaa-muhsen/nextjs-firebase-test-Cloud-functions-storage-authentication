import {useState, useEffect} from 'react';
import { projectFirestore } from '../firebaseClient';

const useFirestore = (collection) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const unsub = projectFirestore.collection(collection)
        .orderBy('createdAt' , 'desc')
        .onSnapshot((snap) => {
            // that moment in time of the database 
            // notified of that in this 
            // maybe it's at this point we should send the email
            let documents = [];
            snap.forEach(doc => {
                documents.push({...doc.data(), id: doc.id})
            });
            setDocs(documents)
        });

        return () => unsub();

    }, [collection])



    return {docs};
}
 
export default useFirestore;