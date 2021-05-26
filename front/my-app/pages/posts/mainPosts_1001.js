
import React , {useState,useEffect,useCallback}from 'react'
import {Button} from 'antd'
import Router ,{ useRouter } from 'next/router';
import Link from 'next/link'
import wrapper from '../../store/configureStore';
import Pagenation from '../../util/Pagenation'
import {DislikeTwoTone,LikeTwoTone ,EyeOutlined, UserOutlined, FieldTimeOutlined, FolderTwoTone} from '@ant-design/icons'
import 
    {MAINPOSTS_1001_LIST_REQUEST,
     MAINPOSTS_1001_DETAIL_INFO_REQUEST
    } 
from '../../reducers/mainPosts_1001'; 


import 
    {LOAD_USER_REQUEST,
    } 
from '../../reducers/auth'; 
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from '../../util/isEmpty';
import custumDateFormat from  '../../util/custumDateFormat';




const mainPosts_1001 = ({})=>{

  const dispatch         = useDispatch(); 
  const router           = useRouter(); 
  const {mainPosts_1001} = useSelector((state)=>state.mainPosts_1001); 
  const {userInfo}       = useSelector((state)=>state.auth);


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
        type:MAINPOSTS_1001_LIST_REQUEST, 
        data:{postFlag:'1001',
              currentPage:indexOfFirstPost,
              maxPage:postsPerPage
       }, 
    });

},[nowPage,nowGroupPageArray]); 

      
  //01.페이지 첫 로드시.. 
  //02.상세 정보 본 후 뒤로 가기 눌렀을 경우 
  //03.페이지 이동 후 뒤로가기 눌렀을 경우
  const pages=router.query.nowPage ? parseInt(router.query.nowPage) : 1;
  const group=router.query.group ? parseInt(router.query.group) : 0;  
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


  //게시글 상세 페이지 
  const gotoDetail = useCallback((postId,userNickName,postFlag,submitDay,userInfo)=>{
     const param=`${postId}:${userNickName}:${postFlag}:${submitDay}:${userInfo}`;
     router.push(`/posts/detailPage?postId=${param}`); 
  },[]); 


  //게시글 쓰기
  const gotoEdit = useCallback(()=>{

    router.push('/posts/CKEditor'); 
  },[]); 
  

   return (
    <div>

      <div className="divTable">
            {mainPosts_1001.map((v,i)=>(
               <div className='divTableRow' onClick={()=>gotoDetail(v.postId,v.userNickName,'1001',v.submitDay,userInfo)}>
               
               <div className='divTableImageCell'><div className="divImageCell"><img src={v.contentImages.indexOf(`<img src=`) !== -1 ? v.contentImages.substr(v.contentImages.indexOf(`<img src=`)+`<img src=`.length ,v.contentImages.substring(v.contentImages.indexOf(`<img src=`)+`<img src=`.length).indexOf('>')).split(`"`).join(''):`http://localhost:3095/noimages.gif`}  /></div></div>

                {/* 
                  <div className='divTableCell'>
                    <div className="divImageCell">
                      <img src={'https://upload.wikimedia.org/wikipedia/ko/6/60/%EA%B8%B0%EC%83%9D%EC%B6%A9_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg'} />
                    </div>
                  </div>
                */}

                  <div className="divTableCell" >    
                    <Link href={`/posts/detailPage?postId=${v.postId}:${v.userNickName}:1001:${v.submitDay}:${userInfo}`}><a>
                  
                    <font size="2">

                  <b>{isEmpty(v.title)}</b> 
                    </font>
               
                    </a></Link><span className="countFontColor">[{v.commentCount}] </span>

                    <br/>

                    <div style={{marginTop:'3%'}}>
                      <font size="1" style={{opacity:'0.7'}}>추천 {v.good}  </font>
                    <br/>
                      <font size="1" style={{opacity:'0.7'}}>{isEmpty(v.userNickName)}  {custumDateFormat(v.createdDate)}</font>
                     
                    </div>
                  </div>
              </div>
            ))}
      </div>


  <Button type="primary" onClick={gotoEdit} style={{marginTop:"1%",display:"block",float:"right"}}>글쓰기</Button> 
  
      <Pagenation pagenate={pagenate} dataLength={mainPosts_1001.length} postsPerPage={postsPerPage} nowPage={nowPage} groupPage={groupPage} groupPageArray={nowGroupPageArray} />

    </div>
    );
}; 


export default mainPosts_1001; 