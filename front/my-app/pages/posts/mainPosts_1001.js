
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




const mainPosts_1001 = ({pages,group})=>{

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
  const gotoDetail = useCallback((postId,userNickName,postFlag)=>{

    router.push({pathname:'/posts/detailPage',
                 query:{postId,nickName:userNickName,postFlag},
              }); 
  },[]); 


  //게시글 쓰기
  const gotoEdit = useCallback(()=>{

    router.push('/CKEditor'); 
  },[]); 
  

   return (
    <div>

      <div className="divTable">
            {mainPosts_1001.map((v,i)=>(
               <div className='divTableRow' onClick={()=>gotoDetail(v.postId,v.userNickName,'1001',nowPage)}>
                  <div className='divTableCell'><div className="divImageCell"><img src={v.content.indexOf(`<img src=`) !== -1 ? v.content.substr(v.content.indexOf(`<img src=`)+`<img src=`.length ,v.content.substring(v.content.indexOf(`<img src=`)+`<img src=`.length).indexOf('>')).split(`"`).join(''):`http://captainryan.gonetis.com:3095/noimages.gif`} /></div></div>
                  <div className="divTableCell" ><Link href={{pathname:'/posts/detailPage' , query:{postId:v.postId,nickName:v.userNickName,postFlag:'1001'}}} ><a><font style={{fontSize:'2.5vh'}}>{isEmpty(v.title)} [{v.commentCount}]</font></a></Link><br/>
                  <LikeTwoTone twoToneColor="#1ba640"/> : {v.good} <DislikeTwoTone twoToneColor="#1ba640"/> : {v.bad}  <EyeOutlined color="red"/> : {v.hit}<br/>
                  <UserOutlined /> {isEmpty(v.userNickName)}   <FieldTimeOutlined /> {custumDateFormat(v.createdDate)}<br />
                  </div>
              </div>
            ))}
      </div>


  <Button type="primary" onClick={gotoEdit} style={{marginTop:"1%",display:"block",float:"right"}}>글쓰기</Button> 
  
      <Pagenation pagenate={pagenate} dataLength={mainPosts_1001.length} postsPerPage={postsPerPage} nowPage={nowPage} groupPage={groupPage} groupPageArray={nowGroupPageArray} />

    </div>
    );
}; 

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  

  console.log('첫 로드시 SSR 아니냐?'); 
  const pages = context.query.nowPage; 
  const group  =  context.query.group ? parseInt(context.query.group) : 0;   
                                            // 0;//parseInt(context.query.group);
  return {
      props: {pages,group}, // will be passed to the page component as props
    } 

});

export default mainPosts_1001; 