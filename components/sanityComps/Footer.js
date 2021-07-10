import styles from '../../styles/Footer.module.scss';


const Footer = ({sanityData}) => {
    //console.log(sanityData.three[0].companyDetails)

    const emailAddresses = sanityData.three[0].emailAddresses.map((d,i) => {
     return  <p key={i}>{d}</p>
    })
    return ( 
        <footer className={styles.footer}>
            <div className={styles.emailContainer}>{emailAddresses}</div>
           <div className={styles.smallPrint}>
              <p>{sanityData.three[0].companyDetails}</p>
           </div> 
           
        </footer>
     );
}
 
export default Footer;