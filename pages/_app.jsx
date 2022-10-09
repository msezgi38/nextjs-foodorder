import '../styles/globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from '../layout/Layout';
import store from '../redux/store';
import { Provider } from "react-redux"
import { SessionProvider } from "next-auth/react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from "next/router"
import Nprogress from "nprogress"
import "nprogress/nprogress.css"
import "../styles/globals.css"

Router.events.on("routeChangeStart", () => Nprogress.start())
Router.events.on("routeChangeComplete", () => Nprogress.done())
Router.events.on("routeChangeError", () => Nprogress.done())

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout >
          <div className="pt-[88px]">
            <ToastContainer />
            <Component {...pageProps} />
          </div>
        </Layout>
      </Provider>
    </SessionProvider>
  )
}


export default MyApp
