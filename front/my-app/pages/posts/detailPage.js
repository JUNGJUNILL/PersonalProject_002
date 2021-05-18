import React, { useCallback,useEffect, useState, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import wrapper from '../../store/configureStore';
import Comments1001 from '../../components/mainPosts_1001/mainPosts_1001_comments'
import CommentTextArea from '../../components/mainPosts_1001/mainPosts_1001_textArea'
import 
    {MAINPOSTS_1001_DETAIL_INFO_REQUEST,
     MAINPOSTS_1001_COMMENTS_REQUEST, 
     MAINPOSTS_1001_COMMENTINSERT_REQUEST,
     MAINPOSTS_1001_COMMENTLIKE_REQUEST,
     MAINPOSTS_1001_COMMENTBYCOMMENT_REQUEST,
     MAINPOSTS_1001_MAINPOSTLIKE_REQUEST
    } 
from '../../reducers/mainPosts_1001'; 

import {DislikeTwoTone,LikeTwoTone , UserOutlined, FieldTimeOutlined} from '@ant-design/icons'
import {Button} from 'antd'
import custumDateFormat from  '../../util/custumDateFormat';



const detailPage  = ({nickName,postFlag,postId,submitDay}) =>{

  const dispatch = useDispatch(); 
  const {mainPosts_1001Info , 
         mainPosts_1001Comments,
         mainPosts_1001CommentByComments
        } = useSelector((state)=>state.mainPosts_1001); 

  const userInfo      = '1111'; //useSelector((state)=>state.auth);
  const ref = createRef(); 
  const blank_pattern = /^\s+|\s+&/g;  
  const [unfoldList,setUnfoldList] = useState('fold'); 

  useEffect(()=>{
    
    //댓글 리스트 
    dispatch({
      type:MAINPOSTS_1001_COMMENTS_REQUEST, 
      data:{
        postId,
        nickName,
        postFlag,
        who:userInfo, 
        submitDay,
      }
    }); 

    //상세 정보 
    dispatch({
          type:MAINPOSTS_1001_DETAIL_INFO_REQUEST, 
          data:{
            postId,
            nickName,
            postFlag,
            who:userInfo,
            submitDay
          }
    });

  },[nickName,postFlag,postId,submitDay]);

  //게시글 좋아요, 실어요 버튼
  const postLikeBtn = useCallback((likeFlag,submitDay)=>{

    if(!userInfo){
      alert('로그인이 필요한 서비스 입니다.'); 
      return;
    }

    if(mainPosts_1001Info[0].flag==='Y'){
      
      alert('이미 좋아요! 싫어요! 했습니다.');       
      return; 
    
    }
    alert(`${submitDay}+submitDay`)
    //게시글 좋아요!
    dispatch({
            type:MAINPOSTS_1001_MAINPOSTLIKE_REQUEST,
            data:{
              postId,
              nickName,
              postFlag,
              who: userInfo, 
              flag:likeFlag, 
              submitDay,
              mainPosts_1001Info:[...mainPosts_1001Info], 
            }
    }); 
  

  },[mainPosts_1001Info])


  //댓글 좋아요, 싫어요 버튼 
  const likeBtn =useCallback((commentid,flag,likeDislike,submitDay)=>{
      if(!userInfo){
        alert('로그인이 필요한 서비스 입니다.'); 
        return;
      }

      if(flag==="Y"){
        
        alert('이미 좋아요! 싫어요! 했습니다.'); 
        return; 
  
      }else{

        //댓글 좋아요!
        dispatch({
          type:MAINPOSTS_1001_COMMENTLIKE_REQUEST, 
          data:{
            commentid,
            postFlag,
            postId,
            flag: likeDislike ,
            who: userInfo,
            nickName,
            submitDay,
            mainPosts_1001Comments:[...mainPosts_1001Comments],
          }
      }); 

    }

     alert(`${likeDislike}`); 
    
    },[mainPosts_1001Comments]); 


  //댓글 입력 
  const insertComment = useCallback((postFlag,postId,nickName,comment,submitDay)=>{
    if(comment.length === 0 || comment.replace(blank_pattern,'')===""){
      
         
        alert('댓글을 입력해 주세요!'); 
        if(ref.current){
          ref.current.focusInput(); 
        } 
        return; 
        }
    
        if(comment.length === 300){
          alert('300자 이상 입력 할 수 없습니다.'); 
          return; 
        }

        
        
          //댓글 입력
          dispatch({
            type:MAINPOSTS_1001_COMMENTINSERT_REQUEST, 
            data:{
              postId,
              postFlag,
              nickName ,
              who:userInfo, 
              comment,
              submitDay,
            }
        });

        setUnfoldList('fold'); 


         //인풋 초기화, 포커스 
        if(ref.current){
          ref.current.clearInput(); 
          ref.current.focusInput(); 
        }


      },[mainPosts_1001Comments,ref]);



      //대댓글 리스트 
      const commentByCommentList =useCallback((postFlag,nickName,postId,commentId,clickCommentId,unfoldList,submitDay)=>{
               
                if(unfoldList==='unfold' && commentId === clickCommentId){
                  setUnfoldList('fold'); 
                }else{
                  setUnfoldList('unfold'); 
                }

                dispatch({
                    type:MAINPOSTS_1001_COMMENTBYCOMMENT_REQUEST,
                    data:{
                        postFlag,
                        nickName,
                        postId,
                        commentId,
                        who:userInfo,
                        submitDay
                    }
                });      

              
               
      },[mainPosts_1001CommentByComments,unfoldList]); 



    return (
      
    <div >
    {/*상세 페이지 타이틀--------------------------------------------------------------------------------*/}
      <div className='divTable' style={{marginTop:'3%'}}>
            <div className='divTableRowTh'>
                <div className='divTableCellTh'>{mainPosts_1001Info[0].title},{mainPosts_1001Info[0].postId} [{mainPosts_1001Comments.length}]</div>
           </div>
           <div className='divTableRow'>
                <div className='divTableCell'>
                  <UserOutlined />  {mainPosts_1001Info[0].userNickName}<br />
                  <FieldTimeOutlined />  {custumDateFormat(mainPosts_1001Info[0].createdDate)}<br />
                  <LikeTwoTone twoToneColor="#1ba640"/> : {mainPosts_1001Info[0].good} <DislikeTwoTone  twoToneColor="#1ba640"/> : {mainPosts_1001Info[0].bad} 
                </div>
           </div>
      </div>
    {/*상세 페이지 타이틀--------------------------------------------------------------------------------*/}

      <div style={{width:"100%",height:"auto", border:"1px solid", borderColor:"#8cc49c",marginTop:"1%"}}>
         광고입니다.
      </div>
   





    {/*상세 페이지 컨텐츠--------------------------------------------------------------------------------*/}
     <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"1%"}}>
        <div dangerouslySetInnerHTML={{__html:mainPosts_1001Info[0].content}}/>
     </div> 
    {/*상세 페이지 컨텐츠--------------------------------------------------------------------------------*/}   
    




    <div style={{width:"100%",height:"auto", border:"1px solid", borderColor:"#8cc49c",marginTop:"1%"}}>
      광고입니다.
    </div>





    {/*좋아요 싫어요 버튼--------------------------------------------------------------------------------*/}
    <div className='divTable'>
      <div className='divTableRowTh' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <Button onClick={()=>postLikeBtn('good',submitDay)}><LikeTwoTone  twoToneColor={mainPosts_1001Info[0].clicked === 'good' ? "#ff0000":"#1ba640"}/></Button>&nbsp;&nbsp;&nbsp;&nbsp;<Button onClick={()=>postLikeBtn('bad',submitDay)}><DislikeTwoTone twoToneColor={mainPosts_1001Info[0].clicked ==='bad' ? "#ff0000":"#1ba640"}/></Button>
      </div>
    </div>
    {/*좋아요 싫어요 버튼--------------------------------------------------------------------------------*/}





    {/*댓글 입력--------------------------------------------------------------------------------*/}
   <CommentTextArea   
            postFlag={postFlag} 
            nickName={nickName} 
            postId={postId} 
            userInfo={userInfo}
            insertComment={insertComment}
            submitDay={submitDay}
            ref={ref}
   />
    {/*댓글 입력--------------------------------------------------------------------------------*/}




    {/*댓글 리스트--------------------------------------------------------------------------------*/}

    <div className="divTable">
      {mainPosts_1001Comments && mainPosts_1001Comments.map((v,i)=>

        <Comments1001 
              key={i} 
              postFlag={postFlag} 
              nickName={nickName} 
              postId={postId} 
              userInfo={userInfo}
              submitDay={submitDay}
    
              commentId={v.commentId} 
              comment={v.comment} 
              who={v.who} 
              flag={v.flag} 

              good={v.good}
              bad={v.bad}      
              createdDate={v.createdDate} 
    
              likeBtn={likeBtn}

              clickedComponent={v.clickedComponent}
              likeDislikeflag={v.likeDislikeflag}
              
              byCommentCount={v.byCommentCount}
              commentByCommentList={commentByCommentList}
              mainPosts_1001CommentByComments={mainPosts_1001CommentByComments[0] && mainPosts_1001CommentByComments[0].commentId === v.commentId ? mainPosts_1001CommentByComments : ''}
              unfoldList={unfoldList}

              />
      )
    
    }
    </div>
    {/*댓글 리스트--------------------------------------------------------------------------------*/}

    </div>
        )
}


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const postId   = context.query.postId; 
  const nickName = context.query.nickName; 
  const postFlag = context.query.postFlag; 
  const submitDay = context.query.submitDay; 
  
  return {
      props: {nickName,postFlag,postId,submitDay}, // will be passed to the page component as props
    } 

});

export default detailPage; 