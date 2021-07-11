import React from 'react';
import {urlFor} from '../../sanity';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, { Autoplay,Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
SwiperCore.use([ Autoplay,Pagination]);

//import styles from '../styles/LandingPage.module.scss'

const LandingPageMain = ({sanityData}) => {
  //console.log(sanityData)
 
  const slides = [];
  for (let i = 0; i < sanityData.two[0].slides.length; i += 1) {
      slides.push(
          <SwiperSlide key={`slide-${i}`} >
            <div className='swiperContainer'>
            <img  className="imageSizeLandingPage" src={urlFor(sanityData.two[0].slides[i].imageLandingPage)} alt={[i]} />  
           <p  className="imageSizeLandingPage">{sanityData.two[0].slides[i].textLandingPage}</p> 
            </div>
          </SwiperSlide>
      );
  }
  
    //console.log(sanityData.two[0].randomLandingPage)
    return ( 
        <div className='landingPageContainer'>
          {/* <img width="400" src={urlFor(sanityData.two[0].imageLandingPage.asset)} /> 
          <p>{sanityData.two[0].randomLandingPage}</p> */}
           <Swiper 
              slidesPerView={1}
              loop={true} 
              pagination={{ clickable: true }}
              autoplay={{
                  delay: 7000,
                  disableOnInteraction: false
                }}>
                  {slides} 
              </Swiper>

        </div>
     );
}
 
export default LandingPageMain;