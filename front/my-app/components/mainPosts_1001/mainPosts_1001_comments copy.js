import React, { useCallback,useEffect, useState, createRef, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import 
    {
        MAINPOSTS_1001_COMMENTBYCOMMENTINSERT_REQUEST,
        MAINPOSTS_1001_COMMENTS_REQUEST
    } 
from '../../reducers/mainPosts_1001'; 
import { Badge } from 'antd';

const Comments1001 = ()=>{
                
        const {mainPosts_1001Comments} = useSelector((state)=>state.mainPosts_1001);                 
        const dispatch = useDispatch();

        useEffect(()=>{
            dispatch({
                type:MAINPOSTS_1001_COMMENTS_REQUEST, 
                data:{
                  postId:'10000001',
                  nickName:'2222',
                  postFlag:'1001',
                  who:'nick1111', 
                }
              }); 
        },[])
        
         console.log('댓글 commentList',mainPosts_1001Comments);



    return (
        <>
        <div className="divTable">  
        {mainPosts_1001Comments && mainPosts_1001Comments.map((v,i)=>(
            
            <div className='divTableRow' >
                <div className="divTableCell">
                    {v.commentId}
                </div>            
            </div>
        ))}
        </div>
     
        </>   


                
    )

}

export default memo(Comments1001); 