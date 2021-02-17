const passport = require('passport'); 
const local    = require('./local'); 
const kakaoLogin =require('./kakao'); 
const pool = require('../DataBaseInfo');


module.exports = () =>{


    passport.serializeUser((user,done)=>{
        console.log('passport.index.js' , user); 
        return done(null,user.userId); 
    }); 

    //매 요청마다 실행됨, 캐싱을 해줘야 한다. 
    passport.deserializeUser( async(id,done)=>{

        try{
            let type='kakao'; 
            let stringQuery = 'CALL US_SELECT_getUserInfo'; 
            stringQuery = stringQuery.concat(`('${id}',`);
            stringQuery = stringQuery.concat(`'${type}')`);
            const user = await pool.query(stringQuery); 
            delete user[0][0].password; 
            const userInfo =user[0][0];
            return done(null,userInfo); 

        }catch(e){
            console.error(e); 
            return done(e); 
        }
    }); 

    local(); 

    kakaoLogin(); 
    

}