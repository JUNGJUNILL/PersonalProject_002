import Link from 'next/link'
import React , {useState,useEffect,useCallback}from 'react'
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
const fetch =require('node-fetch');
import testComponent from '../../components/testComponent';




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

//export const getServerSideProps = wrapper.getServerSideProps(async (context) => {

  export  const getServerSideProps = async ()=> {
    console.log('빠락스 비어'); 

    const res =await fetch('http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=0629834ae89dc98668de1dd8f46c9b34&targetDt=20120101')
    const json = await res.json(); 
    const posts =  JSON.parse(JSON.stringify(json)); 
    const jsonlist = posts.boxOfficeResult.dailyBoxOfficeList
    console.log(jsonlist); 



    return {
        props : {jsonlist}, 
    }


  };

export default FirstPost; 