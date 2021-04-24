import Head from 'next/head'
import Link from 'next/link'
import React,{useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from  'axios'; 
import 
    {SAVE_IP_ADRESS_REQUEST,} 
    from '../reducers/testReducer'; 

import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';

const Home =({ip,result})=>{

  const dispatch = useDispatch(); 
  //const {clientIp} = useSelector((state)=>state.testReducer);

  // useEffect(()=>{

  //   dispatch({type:SAVE_IP_ADRESS_REQUEST,
  //             data:ip,
  //   });

  // },[]); 
  console.log('clientIp==>',ip,'    result=>', result); 
  return (
    <div>
     <Link href="/posts/first-post-Server-side"><a>go to first-page-Server-side</a></Link>
     <br/>
     <Link href="/posts/first-post-Static-Generation"><a>go to first-page-Static</a></Link>
     <br/>
     <Link href="/posts/abc?foo=bar"><a>DynamicRouter Also goes to pages/post/[pid].js</a></Link>
     <br />
     <Link href="/posts/abc/a-comment"><a>DynamicRouter Also goes to pages/post/[pid]/[comment].js</a></Link>
     <br />
     <Link href="/posts/testPage"><a>테스트 페이지Gee</a></Link>

   </div>

  )
}


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  
  const ip ='1111';//context.req.headers['x-real-ip'] || context.req.connection.remoteAddress
  //const apiResult =await axios.get(`https://ipinfo.io/${ip}?token=ad6b444b39c31e`);
   const result ='Seoul'; //apiResult.data.region; 
  return {
    props:{ip,result},
  }

});

export default Home; 
