import {urlFor} from '../../sanity';

const StaticsImages = ({sanityData}) => {
    //console.log(sanityData.one[0].statsImages)
    const StatsImages = sanityData.one[0].statsImages.map((d,i) => {
        //console.log(d.asset)
        return  <img className="imgs" key={i} src={urlFor(d.asset)} /> 
    })
    //console.log(StatsImages)
    return ( 
        <div className="statsWrapper">
            <p>Stats Data Images</p>
 <div className="statsContainer">
          
          {StatsImages}
        </div>
        </div>
     
     );
}
 
export default StaticsImages;