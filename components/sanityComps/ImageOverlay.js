import React from 'react';
import {urlFor} from '../../sanity';

export default function ImageOverlay({imageState, manageModalState, modalState, setModalState}) {
    return (
        <div 
         onClick={() => manageModalState()} 
        className={`itemOverlay itemOverlay-${modalState}`}
         >
                {/* <div className="itemOverlayWrapper"> */}
                <img  src={urlFor(imageState)} alt={imageState} />
            {/* </div> */}
        </div>
    )
}