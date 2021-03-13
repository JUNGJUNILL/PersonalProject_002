import React from 'react';

import Head from 'next/head';
import 'antd/dist/antd.css';
import  '../CSS/antdMobile.css';
import AppLayout from '../components/AppLayout'; 
import wrapper from '../store/configureStore';


const Personal_Project02 = ({ Component, pageProps }) => (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>Personal_Project02</title>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      </Head>
      <AppLayout>
         <Component {...pageProps} />
      </AppLayout>
    </div>
  );


  export function reportWebVitals(metric) {
    //console.log('metric===>' , metric);
  }

  
export default wrapper.withRedux(Personal_Project02);