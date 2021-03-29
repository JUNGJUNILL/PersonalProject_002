const express = require('express'); 
const router  = express.Router(); 
const pool = require('../DataBaseInfo'); 
const {isLoggedIn,vertifiyToken} = require('./middlewares'); 
const multer =require('multer'); 
const path   =require('path');
const fs = require('fs'); 
var requestIp = require('request-ip');
const data =require('../jsonData/dealerInfoData.js'); 
const fetch = require('node-fetch'); 




const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, done) {

        fs.readdir(`images/${req.query.postFlag}/${req.query.user}`,(error,files)=>{
          if(error){
            fs.mkdirSync(`images/${req.query.postFlag}/${req.query.user}`); 
          }
        }); 

       done(null, 'images');
       //done(null,'uploads'); 
      },
      filename(req, file, done) {
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext); // 제로초.png, ext===.png, basename===제로초
        done(null, basename + new Date().valueOf() + ext);
      },
    }),
    limits: { fileSize: 20 * 1024 * 1024 },
  });

const upload2 = multer({
  storage: multer.diskStorage({

    destination(req,file,done){
      done(null,'uploads');
    },


    filename(req,file,done){
      const ext = path.extname(file.originalname); //확장자명
      const basename = path.basename(file.originalname, ext);// 파일명
      done(null,basename+'_'+new Date().getTime() + ext);
    } 

  }),

  //limits : {fileSize:20 *1024 *1025} //20MB

});

    //일반 이미지 업로드 
    //이미지 업로드
                               //none
                               //fields
                               //single
router.post('/images',upload.array('image'),(req,res)=>{
        console.log('images==>' , req.files); 
    return res.json(req.files.map(v=>v.filename)); 

}); 


//CKEditor image upload
router.post('/ckeditor',upload.single('upload'),(req,res,next)=>{
    const postIdFolder       = req.query.postFlag; 
    const userNickNameFolder = req.query.user; 

    const TempFile = req.file; 
    console.log('TempFile==>' , TempFile); 

    const TempPathfile = TempFile.path; 
    console.log('TempPathfile==>' , TempPathfile); 

    //const targetPathUrl = path.join(__dirname,"../images/"+TempFile.filename); 
    const targetPathUrl = path.join(__dirname,`../images/${postIdFolder}/${userNickNameFolder}/`+TempFile.filename); 
    console.log('targetPathUrl==>', targetPathUrl); 
    console.log('TempFile.originalname==>' , TempFile.originalname); 


    
    if(path.extname(TempFile.originalname).toLowerCase() ===".png" || ".jpg" || ".gif"){


      fs.rename(TempPathfile , targetPathUrl , err =>{

        res.status(200).json({
          uploaded:true,
          url:`http://captainryan.gonetis.com:3095/${postIdFolder}/${userNickNameFolder}/${TempFile.filename}`
        })

        if(err){
          console.error(err); 
          next(); 
        }

      })

    }

}); 

router.post('/upload',upload2.single('files'),async(req,res,next)=>{

  try{  
    console.log(req.files); 
    
    return res.json('hello'); 

  }catch(e){
    console.error(e); 
    next(e); 
  }
}); 
  


//게시글 SELECT
router.get('/', async (req,res,next)=>{
    
    try{    
       // const {name , job, currentPage, maxPage}= req.body.data;   

        const name  =req.query.name;
        const job   =req.query.job;
        const currentPage = req.query.currentPage;
        const maxPage = req.query.maxPage; 

        let stringQuery = 'CALL US_SELECT_emp'; 
            stringQuery =stringQuery.concat(`('${name}',`);
            stringQuery =stringQuery.concat(`'${job}',`); 
            stringQuery =stringQuery.concat(`${currentPage},`); 
            stringQuery =stringQuery.concat(`${maxPage})`);

        const emplist = await pool.query(stringQuery); 
        console.log(stringQuery); 
        return res.json(emplist[0]); 
      

    }catch(e){
        console.log(e); 
        next(e); 
    }

}); 


//게시글 INSERT 
router.post('/empInsert', async (req,res,next)=>{

  try{
      const {content,title,userNickName} = req.body.data; 
      const _title   = decodeURIComponent(title); 
      const _content = decodeURIComponent(content); 
      const _userNickName   = decodeURIComponent(userNickName); 
      const _postFlag = "1001"; 

      // let editContent=""; 
      // const str = '<img';
      // const strIndex = _content.indexOf(str); 
      // if(strIndex !== -1){
      //   editContent = _content.substring(0,strIndex+str.length)+` style="width:100%;height:auto"` + _content.substring(strIndex+str.length); 
      // }else{
      //   editContent = _content; 
      // }
      

      let stringQuery = 'CALL US_INSERT_mainPosts'; 
          stringQuery =stringQuery.concat(`('${_title}',`);
          stringQuery =stringQuery.concat(`'${_content}',`); 
          stringQuery =stringQuery.concat(`'${_userNickName}',`); 
          stringQuery =stringQuery.concat(`'${_postFlag}')`);
          

      const empInsert = await pool.query(stringQuery); 
      console.log(stringQuery); 
      return res.status(200).json(empInsert); 


  }catch(e){
      console.log(e); 
      next(e); 
  }
}); 


//게시글 TEST 
router.post('/select', async (req,res,next)=>{

  try{

    const {clientIp,init} = req.body.data; 
 
     //모듈 시스템에 대해 계략적으로 배움 : https://uroa.tistory.com/57
     //실제 데이터
     let dealerInfoList;

    if(init){ //첫 로드시 

      const request = await fetch(`https://ipinfo.io/${clientIp}?token=${process.env.IPTOKEN}`)
      const json = await request.json(); 

      dealerInfoList =  data.dealerInfoList().filter((v,i,array)=>{
        if(v.region === json.region){
          return array;
        }
      }); 

    return res.json(dealerInfoList); 

    }else{ //select 박스 변경 시 

       dealerInfoList =  data.dealerInfoList().filter((v,i,array)=>{
        if(v.region === clientIp){
          return array;
        }
      });          

      return res.json(dealerInfoList); 
    }

  }catch(e){
      console.log(e); 
      next(e); 
  }
}); 





module.exports  = router; 