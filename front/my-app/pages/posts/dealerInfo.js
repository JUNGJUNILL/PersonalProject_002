import React , {useState,useEffect,useCallback,createRef}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import Pagenation from '../../util/Pagenation'
import Router from 'next/router'; 
import axios from 'axios';


import wrapper from '../../store/configureStore';
import {localDataList}from './localData'; 

import 
    {TEST_REQUEST02,} 
from '../../reducers/testReducer'; 

const DealerInfo = ({pages,group,clientIp,clientRegion}) =>{
  const dispatch         = useDispatch(); 
  const selectRef = createRef(); 
  const subSelectRef = createRef(); 
 
  const {testArray02}      = useSelector((state)=>state.testReducer); 

                                 //store의 state를 불러오는 hook 
                                 //store의 state 중에서 count의 state를 불러온다.

/*-------------------------------------------페이징 처리 로직 start-------------------------------------------------------*/
const [nowPage,setNowPage] = useState(0);                       //현재 페이지
const [postsPerPage] = useState(5);                             //한 페이지당 list 수 
const [groupPage , setGroupPage] = useState(5);                 //페이징 그룹 당 수  1~5 , 6~10 , 11~15 ... 5의 배수만 입력가능 
const [nowGroupPageArray,setNowGroupPageArray] =useState([]);   //현재 페이징 그룹 배열


const pagenate =useCallback((pageNumber, groupPageArray)=>{
  console.log('localValue===>',localValue); 
  setNowPage(pageNumber); 

  nowGroupPageArray.length=0; 

  setNowGroupPageArray(nowGroupPageArray.concat(groupPageArray));

  const indexOfLastPost = pageNumber * postsPerPage;   
  const indexOfFirstPost = indexOfLastPost - postsPerPage;  

   dispatch({
      type:TEST_REQUEST02, 
      data:{clientIp:clientIp,init:'initload'},
  });

},[nowPage,nowGroupPageArray]); 

    
//01.페이지 첫 로드시.. 
//02.상세 정보 본 후 뒤로 가기 눌렀을 경우 
//03.페이지 이동 후 뒤로가기 눌렀을 경우
useEffect(()=>{

    //초기에 groupPage 만큼 배열을 생생해 주어야 한다. 
    let pageArray =Array.from({length: groupPage}, (v, i) => i);


    //groupPage 페이지 그룹 변경 시 로직 (5에서 ▶ 눌렀을 때)
    if((group % groupPage === 0 )){
            pageArray.length=0; 

              for(let i=group; i<group+groupPage; i++){
                pageArray.push(i); 

              }
         }

        pagenate(parseInt(pages),pageArray);
    
},[pages]); 

/*-------------------------------------------페이징 처리 로직   end-------------------------------------------------------*/


  const [localValue,setLocalVale] = useState(null); 
  const [subLocalValue,setSubLocalValue] = useState(null); 
  const [changeMainLocal , setChangeMainLocal] = useState(false);

  //광역시, 도 list
  const mainLocal = localDataList.filter((v,i,array)=>{

      if(v.city===v.cityCode){
          return array;
      }

  }); 

  //광역시, 도 별 하위 지역 list
  const subLocal = localDataList.filter((v,i,array)=>{

        if(v.regionName===clientRegion){
            return array;
        }

    }); 

    
  const [array,setArray] = useState(subLocal); 


  const onChangeMainLocal = () =>{
      try{

      let changeSubLocalList = localDataList.filter((v,i,array)=>{
          if(v.regionName === selectRef.current.value){
              return array;
          }
      }); 

      setArray([...changeSubLocalList]); 
      
      dispatch({
        type:TEST_REQUEST02, 
        data:{clientIp:selectRef.current.value,},
    });

    }catch(e){
      alert(e); 
    }
  }



    return (
        <div>
          <input type="text" value={localValue}/>
        {clientRegion}
         <div className='divTable' style={{marginTop:'3%'}}>
            <select ref={selectRef} onChange={onChangeMainLocal}>
              {mainLocal.map((v)=>(              
                  <option value={v.regionName} selected={clientRegion===v.regionName}>{v.regionNameHangul}</option>
              ))}
            </select>
             <select ref={subSelectRef} >
            {/*
             {array.map((v)=>(
           
              <option value={v.cityCode} selected={clientIp.regionName===clientIp.city || changeMainLocal
                                                   ? v.cityCode.split('_')[1]==='0'                             //도별 인구가 가장 많은 시 자동 선택
                                                   : v.city.toUpperCase()===clientIp.city.toUpperCase()}        //ip에서 가져 온 시, 구 자동 선택                                      
                                                   >       
                                                   {v.regionNameHangul}
              </option>
            ))}
             */}
             {array.map((v)=>(
                <option value={v.cityCode}>{v.regionNameHangul}</option>
              ))}
            </select>
           <div className='divTableBody'>
           <div className='divTableRow'>
                    <div className='divTableCell'>No</div>
                     <div className='divTableCell'>코드</div>
                     <div className='divTableCell'>유통사명</div>
                     {/*
                     <div className='divTableCell'>사원명</div>
                     <div className='divTableCell'>직책</div>
                     <div className='divTableCell'>매니져번호</div>
                     <div className='divTableCell'>입사일</div>
                     <div className='divTableCell'>급여</div>
                     <div className='divTableCell'>인센</div>
                     <div className='divTableCell'>부서번호</div>
                    */}
           </div>
            {testArray02 && testArray02.map((v,i)=>(
                <div className='divTableRow' key={i}>
                    <div className='divTableCell'>{i+1}</div>
                     <div className='divTableCell'>{v.dealerCode}</div>
                     <div className='divTableCell'>{v.infoName}</div>
                     {/*
                     <div className='divTableCell'>{v.JOB}</div>
                     <div className='divTableCell'>{v.MGR}</div>
                     <div className='divTableCell'>{v.HIREDATE}</div>
                     <div className='divTableCell'>{v.SAL}</div>
                     <div className='divTableCell'>{v.COMM}</div>
                     <div className='divTableCell'>{v.DEPTNO}</div>
                     */}
                </div>
            ))}
            </div>
         </div>
         <Pagenation pagenate={pagenate} dataLength={testArray02.length} postsPerPage={postsPerPage} nowPage={nowPage} groupPage={groupPage} groupPageArray={nowGroupPageArray} />
        </div>
    )

}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {


  //{region:28,regionName:'Incheon',city:'Incheon'};//
  const clientIp ='211.43.131.61';//context.req.headers['x-real-ip'] || context.req.connection.remoteAddress
 
  const apiResult =await axios.get(`https://ipinfo.io/${clientIp}?token=ad6b444b39c31e`); 
  const clientRegion = apiResult.data.region; 
  const pages = context.query.nowPage; 
  const group  =  context.query.group ? parseInt(context.query.group) : 0;   
                                            // 0;//parseInt(context.query.group);
  return {
      props: {pages,group,clientIp,clientRegion}, // will be passed to the page component as props
    } 

  });


export default DealerInfo;