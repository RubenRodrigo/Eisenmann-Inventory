import { useRouter } from 'next/dist/client/router'
import { Provider } from 'react-redux'
import { Layout } from '../components/Layout/Layout'
import { useStore } from '../store/store'

import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      {
        (router.pathname !== '/login')
          ?
          <Layout>
            <Component {...pageProps} />
          </Layout>
          :
          <Component {...pageProps} />
      }
    </Provider>
  )
  // if (router.pathname !== '/login') {
  //   return (
  //     <Layout>
  //       <Component {...pageProps} />
  //     </Layout>
  //   )
  // } else {
  //   return (
  //     <Component {...pageProps} />
  //   )
  // }

}

export default MyApp
