var createError = require('http-errors');
const express = require('express'); 
const cors = require('cors'); 
const morgan = require('morgan'); 
const cookieParser = require('cookie-parser'); 
const passport = require('passport'); 
const expressSession = require('express-session'); 
const dotenv = require('dotenv');
const passportConfig = require('./passport'); 
const app= express(); 

dotenv.config(); 
passportConfig(); 

app.use(cors({
    origin: true, 
    credentials:true,
    //--프론트와 백엔드간에 쿠키 주고 받기 위함
}));

const empAPIRouter = require('./routes/emp'); 
const authAPIRouter = require('./routes/auth'); 
const mainPosts_1001APIRouter = require('./routes/mainPosts_1001'); 


app.use(morgan('dev')); 
app.use('/',express.static('images')); 
app.use('/',express.static('uploads')); 
app.use(express.json()); 
app.use(express.urlencoded({extended : true})); //form 데이터 처리 

app.use(cookieParser()); //req.cookies 사용가능, 


// app.use(expressSession({
//     resave : false,             //매번 세션 강제 저장
//     saveUninitialized : false,  //빈 값도 저장
//     secret: process.env.COOKIE_SECRET, 
//     cookie :{
//         httpOnly : true, 
//         secure: false, //https 시 true
//       //  maxAge : 1000*60*60,
//     },
//     name:'rnbck',

// }));
// app.use(passport.initialize()); 
// app.use(passport.session()); 


app.use('/api/emp',empAPIRouter); 
app.use('/api/auth',authAPIRouter); 
app.use('/api/mainPosts_1001',mainPosts_1001APIRouter); 


//에러
// app.use(function(e, req, res, next) {
//     console.log('에러발생했어!!', e); 
//   });
app.get('/', (req,res)=>{

    res.cookie('backs' ,'beer' ,{httpOnly:true,
        secure:false, 
}); 

}); 

app.listen(3095,()=>{
    console.log('server is Runnig in 3095 port'); 
})