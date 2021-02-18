import React, { useCallback,useEffect, useState, createRef, memo } from 'react'

import custumDateFormat from  '../../util/custumDateFormat';
import {DislikeTwoTone,LikeTwoTone , UserOutlined, FieldTimeOutlined} from '@ant-design/icons'

const Comment1001ByComments = ({
                                key,
                                postFlag,
                                nickName,
                                postId,
                                userInfo,
                                commentId,

                                byCommentId,
                                comment,
                                who,

                                good,
                                bad,
                                flag,
                                createdDate,
                                commentByCommentLikeBtn,

                                clickedComponent,
                                likeDislikeflag

                                })=>{
    return (
        <div className='divTableRow' >
            <div className="divTableCell02">
                    └&nbsp;<b>{who}</b> &nbsp; <small>{custumDateFormat(createdDate)}</small><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;{comment}
                <div  style={{marginTop:"1%",display:"block",float:"right"}}>
                    <LikeTwoTone onClick={()=>commentByCommentLikeBtn(byCommentId,flag,'good')} twoToneColor={clickedComponent && likeDislikeflag==='good' ? "#ff0000" : "#1ba640"}/>{clickedComponent && likeDislikeflag==='good' ? parseInt(good)+1:good}
                    &nbsp;&nbsp;&nbsp;
                    <DislikeTwoTone onClick={()=>commentByCommentLikeBtn(byCommentId,flag,'bad')} twoToneColor={clickedComponent && likeDislikeflag==='bad' ? "#ff0000" : "#1ba640"} />{clickedComponent && likeDislikeflag==='bad' ? parseInt(bad)+1:bad}
                    &nbsp;&nbsp;&nbsp;
                    <br />
                </div> 
            </div>
        </div>   
    )
}

export default memo(Comment1001ByComments); 