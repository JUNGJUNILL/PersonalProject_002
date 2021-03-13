import React , {useState,useEffect,useCallback}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Pagenation from '../../util/Pagenation'
import Router from 'next/router'; 

import wrapper from '../../store/configureStore';

import 
    {TEST_REQUEST02,} 
    from '../../reducers/testReducer'; 

const DealerInfo = ({pages,group}) =>{
  const dispatch         = useDispatch(); 
  const {testArray02}      = useSelector((state)=>state.testReducer); 

                                 //store의 state를 불러오는 hook 
                                 //store의 state 중에서 count의 state를 불러온다.

/*-------------------------------------------페이징 처리 로직 start-------------------------------------------------------*/
const [nowPage,setNowPage] = useState(0);                       //현재 페이지
const [postsPerPage] = useState(5);                             //한 페이지당 list 수 
const [groupPage , setGroupPage] = useState(5);                 //페이징 그룹 당 수  1~5 , 6~10 , 11~15 ... 5의 배수만 입력가능 
const [nowGroupPageArray,setNowGroupPageArray] =useState([]);   //현재 페이징 그룹 배열


const pagenate =useCallback((pageNumber, groupPageArray)=>{

  setNowPage(pageNumber); 

  nowGroupPageArray.length=0; 

  setNowGroupPageArray(nowGroupPageArray.concat(groupPageArray));

  const indexOfLastPost = pageNumber * postsPerPage;   
  const indexOfFirstPost = indexOfLastPost - postsPerPage;  

   dispatch({
      type:TEST_REQUEST02, 
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





                                 
                              
    return (
        <div>

        
         <div className='divTable' style={{marginTop:'3%'}}>
           <div className='divTableBody'>
           <div className='divTableRow'>
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
  console.log('ssr 아니냐?'); 
  const pages = context.query.nowPage; 
  const group  =  context.query.group ? parseInt(context.query.group) : 0;   
                                            // 0;//parseInt(context.query.group);
  return {
      props: {pages,group}, // will be passed to the page component as props
    } 

  });


export default DealerInfo;