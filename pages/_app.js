import {AuthProvider} from '../auth';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  // wrapped with the themeProvider 
  return (

  <AuthProvider> 
     <Component {...pageProps} />
  </AuthProvider> 
  )
}

export default MyApp
