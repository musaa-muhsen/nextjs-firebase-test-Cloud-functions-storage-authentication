import {AuthProvider} from '../auth';



function MyApp({ Component, pageProps }) {
  // wrapped with the themeProvider and also have CSSReset 
  return (

  <AuthProvider> 
     <Component {...pageProps} />
  </AuthProvider> 
  )
}

export default MyApp
