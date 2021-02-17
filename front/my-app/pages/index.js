import Head from 'next/head'
import Link from 'next/link'

import AppLayout from '../components/AppLayout';


export default function Home({allPostsData}) {
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
     <Link href="/posts/testPage"><a>테스트 페이지</a></Link>

   </div>

  )
}
