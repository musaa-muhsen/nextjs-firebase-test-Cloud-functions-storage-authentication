import {urlFor} from '../../sanity';
//import styles from '../styles/LandingPage.module.scss'

const LandingPageMain = ({sanityData}) => {
    console.log(sanityData.two[0].randomLandingPage)
    return ( 
        <div className='landingPageContainer'>
          <img width="400" src={urlFor(sanityData.two[0].imageLandingPage.asset)} /> 
          <p>{sanityData.two[0].randomLandingPage}</p>

        </div>
     );
}
 
export default LandingPageMain;