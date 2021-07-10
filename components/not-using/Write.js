
// import { firebase } from '@firebase/app';
// import '@firebase/firestore';
import {projectFirestore} from '../../firebaseClient'
//import Button from 'react-bootstrap/Button'

const WriteToCloudFirestore = () => {
   // console.log(firebase.firestore().collection('test'))
    //const { user } = useUser()
    const sendData = () => {
        try {
            projectFirestore
                .collection('myCollection')
                .doc() // leave as .doc() for a random unique doc name to be assigned
                .set({
                    string_data: 'Benjamin Carlson',
                    number_data: 2,
                    boolean_data: true,
                    map_data: { stringInMap: 'Hi', numberInMap: 7 },
                    array_data: ['text', 4],
                    null_data: null,
                })
                .then(alert('Data was successfully sent to cloud firestore!'))
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return (
        <div style={{ margin: '5px 0' }}>
            <button onClick={sendData}>Send Data To Cloud Firestore</button>
        </div>
    )
}

export default WriteToCloudFirestore