import React, { useCallback,useEffect, useState, createRef, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import custumDateFormat from  '../../util/custumDateFormat';
import {Avatar, Button} from 'antd'
import Comment1001ByComments from './mainPosts_1001_commentByComments'
import CommentTextArea       from './mainPosts_1001_textArea'
import {DislikeTwoTone,LikeTwoTone,UserOutlined} from '@ant-design/icons'
import 
    {
        MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_REQUEST,
        MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_REQUEST,
    } 
from '../../reducers/mainPosts_1001'; 

const Comments1001 = ({
                      postFlag,
                      nickName,
                      postId,
                      userInfo,
                      submitDay,

                      commentId,
                      comment,
                      who,
                      flag,
                      
                      good,
                      bad,
                      createdDate,

                      likeBtn,

                      clickedComponent,
                      likeDislikeflag,
                      byCommentCount,
                      commentByCommentList,
                      mainPosts_1001CommentByComments,
                      unfoldList,

                    })=>{
                
                        
  const dispatch = useDispatch();
  const {clickCommentId,
            commentByCommentCount,
            commentByCommentInsertCommentId} = useSelector((state)=>state.mainPosts_1001); 
  const ref = createRef(); 
  const blank_pattern = /^\s+|\s+&/g;  
        
  //대댓글 입력 
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
        //대댓글 입력
        dispatch({
            type:MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_REQUEST, 
            data:{
                postFlag,
                nickName,
                postId,
                commentId,
                who:userInfo,
                comment,   
                submitDay
            }
        }); 

        //인풋 초기화, 포커스 
        if(ref.current){
                ref.current.clearInput(); 
                ref.current.focusInput(); 
        }

      },[mainPosts_1001CommentByComments,ref,commentByCommentInsertCommentId,commentByCommentCount]);



      //대댓글 좋아요, 싫어요 버든 
      const commentByCommentLikeBtn =useCallback((byCommentId,flag,likeDislike,submitDay)=>{
            
            if(flag==="Y"){
                
                alert('이미 좋아요! 싫어요! 했습니다.'); 
                return; 
        
            }else{  
                dispatch({
                    type:MAINPOSTS_1001_COMMENTBYCOMMENTLIKE_REQUEST,
                    data:{
                        byCommentId,
                        commentId,
                        postId,
                        postFlag,
                        nickName,
                        who:userInfo,
                        flag : likeDislike,
                        submitDay,
                        mainPosts_1001CommentByComments:[...mainPosts_1001CommentByComments], 
                    }
                })
            }

            alert(`${likeDislike}`); 

      },[mainPosts_1001CommentByComments])

    return (
        <>        
                <div  className='divTableRow' >
                    <div  className="divTableCellDetail">        
                    <Avatar size="small" icon={<UserOutlined />} />  <b>{who}</b> &nbsp; <small>{custumDateFormat(createdDate)}</small><br/>
                    {comment},  {commentId}<br />
                    <a onClick={()=>commentByCommentList(postFlag,nickName,postId,commentId,clickCommentId,unfoldList,submitDay)}>{`답글[${commentByCommentInsertCommentId===commentId ? commentByCommentCount : byCommentCount}]`   }</a>          
                        <div  style={{marginTop:"1%",display:"block",float:"right"}}>
                            <LikeTwoTone onClick={()=>likeBtn(commentId,flag,'good',submitDay)} twoToneColor={clickedComponent && likeDislikeflag==='good' ? "#ff0000" : "#ff6600"}/>{clickedComponent && likeDislikeflag==='good' ? parseInt(good)+1:good}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <DislikeTwoTone onClick={()=>likeBtn(commentId,flag,'bad',submitDay)} twoToneColor={clickedComponent && likeDislikeflag==='bad' ? "#ff0000" : "#ff6600"} />{clickedComponent && likeDislikeflag==='bad' ? parseInt(bad)+1:bad}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <br />
                        </div> 
                    </div>
                </div>  

                {/*대댓글 리스트*/}
                {unfoldList ==='unfold' && commentId === clickCommentId && mainPosts_1001CommentByComments && mainPosts_1001CommentByComments.map((v,i)=>(
                    <Comment1001ByComments                  
                            key={i}
                            postFlag={postFlag}
                            nickName={nickName}
                            postId={postId}
                            userInfo={userInfo}
                            commentId={commentId}
                            submitDay={submitDay}

                            byCommentId={v.byCommentId}
                            comment={v.comment}
                            who={v.who}

                            good={v.good}
                            bad={v.bad}
                            flag={v.flag}
                            createdDate={v.createdDate}

                            commentByCommentLikeBtn={commentByCommentLikeBtn}

                            clickedComponent={v.clickedComponent}
                            likeDislikeflag={v.likeDislikeflag}
                    />
                    
                ))}
                
               {/*대댓글 입력 창*/}
               {unfoldList ==='unfold' && clickCommentId === commentId && byCommentCount >= 0 && 
                    <CommentTextArea   
                            postFlag={postFlag} 
                            nickName={nickName} 
                            postId={postId} 
                            userInfo={userInfo}
                            submitDay={submitDay}
                            insertComment={insertComment}
   
                            ref={ref}           
                            />
                }
        </>   


                
    )

}

export default memo(Comments1001); 