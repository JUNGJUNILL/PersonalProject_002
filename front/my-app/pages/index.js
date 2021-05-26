import Head from 'next/head'
import Link from 'next/link'
import React,{useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from  'axios'; 
import {END} from 'redux-saga'; 
import 
    {LOAD_USER_REQUEST,} 
    from '../reducers/auth'; 

import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';

const Home =()=>{

  useEffect(()=>{
    Kakao.init('71a70e1c6ee55af30c3f9ec51fd7dcb7'); 
  },[]); 

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

   const cookie = context.req ? context.req.headers.cookie : '';
   console.log('context.req.headers.cookie==> ', context.req.headers.cookie)
   axios.defaults.headers.Cookie = '';
   if (context.req && cookie) { //쿠키 공유 방지 
     axios.defaults.headers.Cookie = cookie;
   }
 
   context.store.dispatch({
    type:LOAD_USER_REQUEST
  });


  context.store.dispatch(END); 
  await context.store.sagaTask.toPromise(); 


});

export default Home; 
