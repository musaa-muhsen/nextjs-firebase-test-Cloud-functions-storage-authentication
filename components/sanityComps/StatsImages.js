import {urlFor} from '../../sanity';
import {useState} from 'react';
import { set } from 'lodash';
import ImageOverlay from './ImageOverlay';
//import ModalImage from "react-modal-image";

//console.log(ModalImage)


const StaticsImages = ({sanityData}) => {

    const [modalState, setModalState] = useState(false);
    const [imageState, setImageState] = useState(null);
    //console.log(modalState)
    // const manageState = () => {
    //     setModalState(!modalState);
    // }
    //console.log(sanityData.one[0].statsImages)
    const manageModalState = (i) => {
        if (i === null || i === undefined) {
            setModalState(!modalState)
        } else {
            setModalState(!modalState)
            setImageState(i)
        }  
    }
    const StatsImages = sanityData.one[0].statsImages.map((d,i) => {
        //console.log(i)
        return (
            <img onClick={() => manageModalState(d.asset)} className="imgs" key={i} src={urlFor(d.asset)} /> 
        )  
    })
    //console.log(StatsImages)
    return ( 
        <div className="statsWrapper">
            <p>Stats Data Images - modal idea (test example)</p>
        <div className="statsContainer">
          
          {StatsImages}
          {modalState && <ImageOverlay modalState={modalState} imageState={imageState} setModalState={setModalState} manageModalState={manageModalState} />} 
        </div>
        </div>
     
     );
}
 
export default StaticsImages;