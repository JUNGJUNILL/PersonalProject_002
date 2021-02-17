//const KakaoStrategy = require('passport-kakao').Strategy; 
const passport = require('passport'); 
const KakaoStrategy = require('passport-kakao').Strategy
const bcrypt = require('bcrypt'); 
const pool = require('../DataBaseInfo');

module.exports = () =>{

	


    passport.use(new KakaoStrategy({
        //clientID:'8cf1ea216775ee5a5ff24a71b855846c', 
        clientID:'71a70e1c6ee55af30c3f9ec51fd7dcb7', 
        callbackURL:' /api/auth/kakao/callback', 
    }, async (accessToken, refreshToken, profile, done)=>{

        try{
            
            let loginType='kakao'; 
            let stringQuery = 'CALL US_SELECT_getUserInfo'; 
            stringQuery = stringQuery.concat(`('${profile.id}',`);
            stringQuery = stringQuery.concat(`'${loginType}')`);
            
            const exUser = await pool.query(stringQuery); 
            const hello=exUser[0][0]; 
            
            //카카오로 로그인 한 적이 있는 경우 
            if(hello){
                return done(null,hello); 
            //그렇지 않은 경우 loginType을 kakao로 회원가입 로직을 실행시켜준다.
            }else{
                const hashedPassword = await bcrypt.hash('kakao',12); 
                console.log('profileprofile=>',profile); 
                let email = profile._json && profile._json.kaccount_email; 
                let nickname = profile.nickname; 
                let snsId = profile.id; 
                let loginType1='kakao'; 
                let password ='kakao'; 
                let phone ='kakao'; 
                let address ='kakao'; 

                let stringQuery1 = 'CALL US_INSERT_client'; 
                    stringQuery1 = stringQuery1.concat(`('${snsId}',`);
                    stringQuery1 = stringQuery1.concat(`'${nickname}',`);
                    stringQuery1 = stringQuery1.concat(`'${hashedPassword}',`);
                    stringQuery1 = stringQuery1.concat(`'${password}',`);
                    stringQuery1 = stringQuery1.concat(`'${password}',`);
                    stringQuery1 = stringQuery1.concat(`'${password}',`);
                    stringQuery1 = stringQuery1.concat(`'${email}',`);
                    stringQuery1 = stringQuery1.concat(`'${phone}',`);
                    stringQuery1 = stringQuery1.concat(`'${address}',`);
                    stringQuery1 = stringQuery1.concat(`'${loginType1}')`);
                    await pool.query(stringQuery1);
                    stringQuery1=''; 
                    stringQuery1 = 'CALL US_SELECT_getUserInfo'; 
                    stringQuery1 = stringQuery1.concat(`('${snsId}',`);
                    stringQuery1 = stringQuery1.concat(`'${loginType1}')`);
        
                    console.log('stringQuery1=>',stringQuery1); 
   
            //--이런식으로 될런지는 잘 모르겠다. 
                const newUser = await pool.query(stringQuery1);
                console.log('되긴되는거냐?',newUser); 
                const kakaoUser = newUser[0][0];
                console.log(stringQuery1); 
               // return res.status(200).json(clientInsert);  
                return done(null,kakaoUser); 
            }


        }catch(e){
            //alert('카카로 로그인 에러',e); 
            console.error('무슨 에러냐==>',e); 
            return done(e); 
        }
    }));
};