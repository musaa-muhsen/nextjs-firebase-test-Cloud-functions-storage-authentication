import {AuthProvider} from '../auth';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  // wrapped with the themeProvider and also have CSSReset 
  return (

  <AuthProvider> 
     <Component {...pageProps} />
  </AuthProvider> 
  )
}

export default MyApp
