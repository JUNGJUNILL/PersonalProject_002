const jwt = require('jsonwebtoken'); 

exports.isLoggedIn = (req,res,next)=>{

  if(req.isAuthenticated()){
      next(); 
      //next()를 하면 다음 미들웨어로 간다. 
  }else{
      res.status(401).send('로그인이 필요합니다.'); 
  }


};



exports.isNotLoggedIn = (req,res,next)=>{

if(!req.isAuthenticated()){
  next(); 
  //next()를 하면 다음 미들웨어로 간다. 
}else{
  res.status(401).send('로그인 한 사용자는 접근할 수 없습니다.'); 
}


};


exports.vertifiyToken = (req,res,next) =>{

  try{

    
    if(req.cookies[process.env.NOTLOGIN_COOKIE] && !req.cookies[process.env.COOKIE_SECRET] && !req.cookies[process.env.KAKAO_COOKIE]){
      return next(); 
    }else if(req.cookies[process.env.KAKAO_COOKIE]){
      return next(); 
    }


    //쿠키에 저장된 토큰 유요성 검증 
    req.decoded = jwt.verify(req.cookies[process.env.COOKIE_SECRET],process.env.JWT_SECRET); 
    return next(); 

  }catch(e){
  
    if(e.name ==='TokenExpiredError'){ //토큰 유효기간 초과
      return res.status(419).send({
        conde:419,
        message:'토큰이 만료되었습니다.', 
      }); 
    }    
    
    //쿠키 존재여부 
    //쿠키 없으면 쿠키 만들어라
    //쿠키의 value값은 사용자 외부 아이피
    if(Object.keys(req.cookies).length === 0){ 

      const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
      console.log('ip==>', ip); 
      res.cookie(process.env.NOTLOGIN_COOKIE, ip ,
                                                  {httpOnly:true,
                                                  secure:false, 
      }); 

    } 
    

    return res.status(401).send({
      code:401,
      message : '유효하지 않는 토큰입니다.', 
    }); 

  }

}