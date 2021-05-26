const express = require('express');
const passport = require('passport');
const {isLoggedIn , vertifiyToken} = require('./middlewares')
const bcrypt = require('bcrypt');
const pool = require('../DataBaseInfo');
const jwt = require('jsonwebtoken'); 
const router = express.Router();
const multer =require('multer'); 
const path   =require('path');
const fs = require('fs'); 

const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, done) {
          
        const postFlag= req.query.postFlag;
        const user= decodeURIComponent(req.query.user);
        
    fs.readdir(`images/${postFlag}/${user}`,(error,files)=>{
        if(error){
            fs.mkdirSync(`images/${postFlag}/${user}`); 
        }
    }); 

       done(null, `images/${postFlag}/${user}`);
       //done(null,'uploads'); 
      },
      filename(req, file, done) {
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext); // 제로초.png, ext===.png, basename===제로초
        done(null, basename + new Date().valueOf() + ext);
      },
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, //20MB
  });



  router.post('/images',upload.array('image'),(req,res)=>{
     return res.json(req.files.map(v=>v.filename)); 
  }); 





//게시글 SELECT
router.post('/', async (req,res,next)=>{

    try{    
        const {postFlag, currentPage, maxPage}= req.body.data;   
        let stringQuery = 'CALL US_SELECT_mainPosts'; 
            stringQuery =stringQuery.concat(`('${postFlag}',`);
            stringQuery =stringQuery.concat(`${currentPage},`); 
            stringQuery =stringQuery.concat(`${maxPage})`);

        const mainPosts_1001_List = await pool.query(stringQuery); 
        console.log(stringQuery); 
        return res.json(mainPosts_1001_List[0]); 
      

    }catch(e){
        console.log(e); 
        next(e); 
    }

}); 


//게시글 상세정보 
router.post('/mainPosts_1001Detail', async (req,res,next)=>{

    try{    
        const {postId, nickName, postFlag, who, submitDay}= req.body.data; 


        //(쿠키가 없는 경우 게시글 정보로 쿠키생성)
        if(!req.cookies[process.env.HITCOUNT_COOKIE] || req.cookies[process.env.HITCOUNT_COOKIE] !== postId+nickName+postFlag){

            let rowQuery ='CALL US_UPDATE_mainPostsHit'; 
            rowQuery =rowQuery.concat(`('${postId}',`);
            rowQuery =rowQuery.concat(`'${decodeURIComponent(nickName)}',`);
            rowQuery =rowQuery.concat(`'${postFlag}',`); 
            rowQuery =rowQuery.concat(`'${submitDay}')`);
            console.log(rowQuery); 
            await pool.query(rowQuery); 
         
            res.cookie(process.env.HITCOUNT_COOKIE,postId+decodeURIComponent(nickName)+postFlag,
                {httpOnly:true,
                secure:false,
            }); 

        }


        let stringQuery = 'CALL US_SELECT_mainPostsDetail'; 
            stringQuery =stringQuery.concat(`('${postId}',`);
            stringQuery =stringQuery.concat(`'${decodeURIComponent(nickName)}',`); 
            stringQuery =stringQuery.concat(`'${postFlag}',`);
            stringQuery =stringQuery.concat(`'${who}',`); 
            stringQuery =stringQuery.concat(`'${submitDay}')`);

        const mainPosts_1001Detail = await pool.query(stringQuery); 
        console.log(stringQuery); 
        return res.json(mainPosts_1001Detail[0]); 
      

    }catch(e){
        console.log(e); 
        next(e); 
    }

}); 


//게시글 댓글 리스트 
router.post('/mainPosts_1001Comments', async (req,res,next)=>{


    try{

        const {postId, nickName, postFlag, who, submitDay}= req.body.data; 
        

        let stringQuery = 'CALL US_SELECT_mainPostComments'; 
        stringQuery =stringQuery.concat(`('${postFlag}',`);
        stringQuery =stringQuery.concat(`'${postId}',`); 
        stringQuery =stringQuery.concat(`'${nickName}',`);
        stringQuery =stringQuery.concat(`'${who}',`); 
        stringQuery =stringQuery.concat(`'${submitDay}')`);

        const mainPosts_1001Comments = await pool.query(stringQuery); 
        console.log(stringQuery); 
        return res.json(mainPosts_1001Comments[0]); 



    }catch(e){
        console.log(e); 
        next(e); 
    }


}); 



//게시글 댓글 INSERT
router.post('/mainPosts_1001CommentInsert', async (req,res,next)=>{


    try{

        const { postId,
                postFlag,
                nickName,
                who,
                comment,
                submitDay,}= req.body.data; 
        

        let stringQuery = 'CALL US_INSERT_mainPostsComments'; 
        stringQuery =stringQuery.concat(`('${postId}',`);
        stringQuery =stringQuery.concat(`'${postFlag}',`); 
        stringQuery =stringQuery.concat(`'${nickName}',`); 
        stringQuery =stringQuery.concat(`'${who}',`); 
        stringQuery =stringQuery.concat(`'${comment}',`); 
        stringQuery =stringQuery.concat(`'${submitDay}')`);
        await pool.query(stringQuery); 
    
        stringQuery=''; 
        stringQuery = 'CALL US_SELECT_mainPostComments'; 
        stringQuery =stringQuery.concat(`('${postFlag}',`);
        stringQuery =stringQuery.concat(`'${postId}',`); 
        stringQuery =stringQuery.concat(`'${nickName}',`); 
        stringQuery =stringQuery.concat(`'${who}',`); 
        stringQuery =stringQuery.concat(`'${submitDay}')`);


        const mainPosts_1001CommentInsert = await pool.query(stringQuery); 
        console.log(stringQuery); 
        return res.json(mainPosts_1001CommentInsert[0]); 



    }catch(e){
        console.log(e); 
        next(e); 
    }


}); 
+
//게시글 대댓글 INSERT
router.post('/mainPosts_1001CommentByCommentInsert', async (req,res,next)=>{


    try{

        const { postFlag,
                nickName,
                postId,
                commentId,
                who,
                comment,
                submitDay,}= req.body.data; 
        

        let stringQuery = 'CALL US_INSERT_mainPostsCommentByComments'; 
        stringQuery =stringQuery.concat(`('${postFlag}',`);
        stringQuery =stringQuery.concat(`'${nickName}',`); 
        stringQuery =stringQuery.concat(`'${postId}',`); 
        stringQuery =stringQuery.concat(`'${commentId}',`); 
        stringQuery =stringQuery.concat(`'${who}',`); 
        stringQuery =stringQuery.concat(`'${comment}',`); 
        stringQuery =stringQuery.concat(`'${submitDay}')`);
        await pool.query(stringQuery); 
    
        stringQuery=''; 
        stringQuery = 'CALL US_SELECT_mainPostCommentByComments'; 
        stringQuery =stringQuery.concat(`('${postFlag}',`);
        stringQuery =stringQuery.concat(`'${nickName}',`); 
        stringQuery =stringQuery.concat(`'${postId}',`); 
        stringQuery =stringQuery.concat(`'${commentId}',`); 
        stringQuery =stringQuery.concat(`'${who}',`); 
        stringQuery =stringQuery.concat(`'${submitDay}')`);


        const mainPosts_1001CommentByCommentInsert = await pool.query(stringQuery); 
        console.log(stringQuery); 
        return res.json(mainPosts_1001CommentByCommentInsert[0]); 



    }catch(e){
        console.log(e); 
        next(e); 
    }


}); 



//게시글 LIKE / DISLIKE 
router.post('/mainPosts_1001Like', async (req,res,next)=>{

    try{
        const {
                postId,
                nickName,
                postFlag,
                who,
                flag,
                submitDay,} = req.body.data; 
        
        
        let stringQuery = 'CALL US_SELECT_mainPostLikeDislike'; 
        stringQuery =stringQuery.concat(`('${postFlag}',`);
        stringQuery =stringQuery.concat(`'${postId}',`); 
        stringQuery =stringQuery.concat(`'${nickName}',`); 
        stringQuery =stringQuery.concat(`'${who}',`); 
        stringQuery =stringQuery.concat(`'${submitDay}')`);
        console.log(stringQuery); 
        const mainPosts_1001LikeDislike = await pool.query(stringQuery); 
        
        if(mainPosts_1001LikeDislike[0][0].flag=== "N"){
            stringQuery=''; 
            stringQuery = 'CALL US_INSERT_mainPostsLikeDislike'
            stringQuery =stringQuery.concat(`('${postId}',`);
            stringQuery =stringQuery.concat(`'${nickName}',`); 
            stringQuery =stringQuery.concat(`'${postFlag}',`); 
            stringQuery =stringQuery.concat(`'${who}',`); 
            stringQuery =stringQuery.concat(`'${flag}',`); 
            stringQuery =stringQuery.concat(`'${submitDay}')`);
            console.log(stringQuery);
            await pool.query(stringQuery); 
    
        }

        
        console.log(stringQuery); 
        return res.json(postId); 

    }catch(e){
        console.log(e); 
        next(e); 

    }

}); 


//게시글 댓글 LIKE / DISLIKE 
router.post('/mainPosts_1001CommentLike', async (req,res,next)=>{

    try{

        const { 
                commentid, 
                postFlag,
                postId,
                flag,
                who,
                nickName,
                submitDay,
                }= req.body.data; 
        

        let stringQuery = 'CALL US_SELECT_mainPostCommentsLikeDislike '; 
        stringQuery =stringQuery.concat(`('${commentid}',`);
        stringQuery =stringQuery.concat(`'${postFlag}',`); 
        stringQuery =stringQuery.concat(`'${postId}',`); 
        stringQuery =stringQuery.concat(`'${nickName}',`); 
        stringQuery =stringQuery.concat(`'${who}',`); 
        stringQuery =stringQuery.concat(`'${submitDay}')`);
        console.log('stringQuery==>' , stringQuery); 
        const mainPosts_1001CommentLike = await pool.query(stringQuery); 

        if(mainPosts_1001CommentLike[0][0].flag=== "N"){
            stringQuery=''; 
            stringQuery = 'CALL US_INSERT_mainPostCommentsLikeDislike ';
            stringQuery =stringQuery.concat(`('${commentid}',`);
            stringQuery =stringQuery.concat(`'${postFlag}',`); 
            stringQuery =stringQuery.concat(`'${postId}',`); 
            stringQuery =stringQuery.concat(`'${nickName}',`); 
            stringQuery =stringQuery.concat(`'${flag}',`); 
            stringQuery =stringQuery.concat(`'${who}',`); 
            stringQuery =stringQuery.concat(`'${submitDay}')`)
            await pool.query(stringQuery); 
        }


        console.log(stringQuery); 
        return res.json(commentid); 



    }catch(e){
        console.log(e); 
        next(e); 
    }


}); 


//게시글 대댓글 리스트
router.post('/mainPosts_1001CommentByComments', async (req,res,next)=>{

        try{

            const {

                postFlag,
                nickName,
                postId,
                commentId,
                who,
                submitDay,
            } = req.body.data; 

            let stringQuery = 'CALL US_SELECT_mainPostCommentByComments '; 
            stringQuery =stringQuery.concat(`('${postFlag}',`);
            stringQuery =stringQuery.concat(`'${nickName}',`); 
            stringQuery =stringQuery.concat(`'${postId}',`); 
            stringQuery =stringQuery.concat(`'${commentId}',`); 
            stringQuery =stringQuery.concat(`'${who}',`); 
            stringQuery =stringQuery.concat(`'${submitDay}')`);


            const mainPosts_1001CommentByComment = await pool.query(stringQuery); 
            console.log(stringQuery); 
            return res.json(mainPosts_1001CommentByComment[0]); 
            
        }catch(e){
            console.log(e); 
            next(e); 
        }

}); 




//게시글 대댓글 LIKE / DISLIKE 
router.post('/mainPosts_1001CommentByCommentsLike', async (req,res,next)=>{


    try{

        const { 
                byCommentId,
                commentId, 
                postId,
                postFlag,
                nickName,
                who,
                flag,   
                submitDay  
                        }= req.body.data; 

        let stringQuery = 'CALL US_SELECT_mainPostCommentByCommentsLikeDislike '; 
        stringQuery =stringQuery.concat(`('${byCommentId}',`);
        stringQuery =stringQuery.concat(`'${commentId}',`); 
        stringQuery =stringQuery.concat(`'${postFlag}',`); 
        stringQuery =stringQuery.concat(`'${postId}',`); 
        stringQuery =stringQuery.concat(`'${nickName}',`); 
        stringQuery =stringQuery.concat(`'${who}',`); 
        stringQuery =stringQuery.concat(`'${submitDay}')`);
        console.log(stringQuery); 
        const mainPosts_1001CommentByCommentsLike = await pool.query(stringQuery); 
        if(mainPosts_1001CommentByCommentsLike[0][0].flag=== "N"){
            stringQuery=''; 
            stringQuery = 'CALL US_INSERT_mainPostCommentByCommentsLikeDislike ';
            stringQuery =stringQuery.concat(`('${byCommentId}',`);
            stringQuery =stringQuery.concat(`'${commentId}',`); 
            stringQuery =stringQuery.concat(`'${postId}',`); 
            stringQuery =stringQuery.concat(`'${postFlag}',`); 
            stringQuery =stringQuery.concat(`'${nickName}',`); 
            stringQuery =stringQuery.concat(`'${who}',`);
            stringQuery =stringQuery.concat(`'${flag}',`);
            stringQuery =stringQuery.concat(`'${submitDay}')`);
            console.log(stringQuery);
            await pool.query(stringQuery); 
        }

        return res.json(byCommentId); 

    }catch(e){
        console.log(e); 
        next(e); 
    }


}); 






module.exports  = router; 