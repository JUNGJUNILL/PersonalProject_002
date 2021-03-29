import Link from 'next/link'
import React , {useState,useEffect,useCallback}from 'react'
const fetch =require('node-fetch');




 function FirstPost({jsonlist}){

    return (    

        <ul>
        빠락스 비어
   
        {jsonlist.map((v) => (
          <li>{v.movieNm}</li>
        ))}
    
  
      </ul>
      )
}
// getStaticProps : 언제 접속해도 데이터가 바뀔 일이 없으면, 웬만하면 안바뀌는 애들(블로그 게시글, 뉴스, 이벤트 화면 등), 
//                  정적 html 파일로 뽑아준다. 그러므로 서버 부하를 좀 줄일 수 있다. , 대부분의 경우 getStaticProps를 쓰기가 힘들다. 
export async function getStaticProps() {

    console.log('빠락스 비어'); 

    const res =await fetch('http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=0629834ae89dc98668de1dd8f46c9b34&targetDt=20120101')
    const json = await res.json(); 
    const posts =  JSON.parse(JSON.stringify(json)); 
    const jsonlist = posts.boxOfficeResult.dailyBoxOfficeList
    console.log(jsonlist); 

    return {
        props : {jsonlist}, 
    }
  }

export default FirstPost; 