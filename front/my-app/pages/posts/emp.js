import React, { useCallback,useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Pagenation from '../../util/Pagenation'
import Router from 'next/router'; 

import wrapper from '../../store/configureStore';

import 
    {EMP_LIST_REQUEST,} 
    from '../../reducers/emp'; 

const Emp = ({pages,group}) =>{
    console.log(pages,group); 

    const dispatch = useDispatch(); 
    const {emplist}    = useSelector(state => state.emp); 
                                 //store의 state를 불러오는 hook 
                                 //store의 state 중에서 count의 state를 불러온다.

    const [nowPage,setNowPage] = useState(0);                       //현재 페이지
    const [postsPerPage] = useState(5);                             //한 페이지당 list 수 
    const [groupPage , setGroupPage] = useState(5);                 //페이징 그룹 당 수  1~5 , 6~10 , 11~15 ...
    const [nowGroupPageArray,setNowGroupPageArray] =useState([]);  //현제 페이징 그룹 배열

    const getEmplist = useCallback(()=>{
          
    },[])

    const gotoEdit = useCallback(()=>{

            Router.push('/CKEditor'); 
    },[]); 



    // useEffect(()=>{

    //     dispatch({
    //         type:EMP_LIST_REQUEST, 
    //         data:{name:'',
    //               job:'',
    //               currentPage:nowPage,
    //               maxPage:postsPerPage
    //              }, 
    //     })

    //   },[]); 


     // const currentPosts = emplist.slice(indexOfFirstPost,indexOfLastPost); //0~5
      /*
      1 페이지 = 1*5 =5 
                5-5 =0 
                0~5 
      2 페이지 = 2*5=10 
                10-5=5 
                5~10
      3 페이지 = 3*5=15 
      */
    const pagenate =useCallback((pageNumber, groupPageArray)=>{
        setNowPage(pageNumber); 
        nowGroupPageArray.length=0; 
        setNowGroupPageArray(nowGroupPageArray.concat(groupPageArray));
        const indexOfLastPost = pageNumber * postsPerPage;   
        const indexOfFirstPost = indexOfLastPost - postsPerPage;  

    dispatch({
        type:EMP_LIST_REQUEST, 
        data:{name:'',
            job:'',
            currentPage:indexOfFirstPost,
            maxPage:postsPerPage
            }, 
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

                                 
                              
    return (
        <div>

        
         <div className='divTable' style={{marginTop:'3%'}}>
           <div className='divTableBody'>
           <div className='divTableRow'>
                     <div className='divTableCell'>사원번호</div>
                     <div className='divTableCell'>사원명</div>
                     <div className='divTableCell'>직책</div>
                     <div className='divTableCell'>매니져번호</div>
                     <div className='divTableCell'>입사일</div>
                     <div className='divTableCell'>급여</div>
                     <div className='divTableCell'>인센</div>
                     <div className='divTableCell'>부서번호</div>
           </div>
            {emplist && emplist.map((v,i)=>(
                <div className='divTableRow' key={i}>
                     <div className='divTableCell'>{v.EMPNO}</div>
                     <div className='divTableCell'>{v.ENAME}</div>
                     <div className='divTableCell'>{v.JOB}</div>
                     <div className='divTableCell'>{v.MGR}</div>
                     <div className='divTableCell'>{v.HIREDATE}</div>
                     <div className='divTableCell'>{v.SAL}</div>
                     <div className='divTableCell'>{v.COMM}</div>
                     <div className='divTableCell'>{v.DEPTNO}</div>
                </div>
            ))}
            </div>
         </div>
        <Pagenation pagenate={pagenate} dataLength={emplist.length} postsPerPage={postsPerPage} nowPage={nowPage} groupPage={groupPage} groupPageArray={nowGroupPageArray} />
        </div>
    )

}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  
    console.log('context.query=>' , context.query);
    const pages = context.query.nowPage; 
    const group  =0;//parseInt(context.query.group);
    return {
        props: {pages,group}, // will be passed to the page component as props
      } 

  });


export default Emp;