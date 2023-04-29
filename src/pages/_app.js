import '../styles/globals.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingBar from 'react-top-loading-bar'

import {AppProvider} from '../context/AppContext';
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react"


 function App({ Component,  pageProps: { session, ...pageProps } }) {
 const [progress, setProgress] = useState(0)
 let router = useRouter();





 useEffect(() => {
  router.events.on('routeChangeStart', () => {
    setProgress(20)
  })
  router.events.on('routeChangeComplete', () => {
    setProgress(100)
  })
  return () => {
    router.events.off('routeChangeStart', () => {
      setProgress(40)
    })
    router.events.off('routeChangeComplete', () => {
      setProgress(100)
    })
  }
}, [router.events])

  return(
    <>
    <LoadingBar
        color='#f11946'
        progress={progress}
        waitingTime={200}
        onLoaderFinished={() => setProgress(0)}
      />


      <SessionProvider session={session}>
        <AppProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
        </AppProvider>
    </SessionProvider>

      {/* <Navbar key={key} user={user} Logout={logout}/> */}
      {/* <Footer/> */}
    </>
  )
}

export default App;