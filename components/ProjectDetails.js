import BlockContent from '@sanity/block-content-to-react';

const ProjectDetails = ({sanityData}) => {
    return ( 
        <div className='projectDetails'>
            <BlockContent blocks={sanityData.one[0].blockText} />
        </div>
       
     );
}
 
export default ProjectDetails;