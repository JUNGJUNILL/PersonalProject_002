import axios from 'axios'
import jwtDeCoder from 'jwt-decode'
import {all,fork,takeLatest,takeEvery ,put, delay,call} from 'redux-saga/effects'; 
import 
    {JOIN_REQUEST,
     JOIN_SUCCESS,
     JOIN_FAILURE,
     LOGIN_REQUEST,
     LOGIN_SUCCESS,
     LOGIN_FAILURE, 
     LOAD_USER_REQUEST,
     LOAD_USER_SUCCESS,
     LOAD_USER_FAILURE,
     LOGOUT_REQUEST,
     LOGOUT_SUCCESS,
     LOGOUT_FAILURE,
    } 
from '../reducers/auth'; 


//유저정보 유지 사이클 
//------------------------------------------------------------------------
function APILoadUser(data){

    return axios.get('/auth/' ,{data}, {withCredentials:true}); 
}

function* sagaLoadUser(action){

    try{

        const result = yield call(APILoadUser,action.data);
        console.log('데이타!!==>' + result.data.nick) 
    
        yield put({
                type:LOAD_USER_SUCCESS, 
                data: result.data.nick,           
        }); 

    }catch(e){
        console.error(e); 
        yield put({
            type:LOAD_USER_FAILURE,
            error:e, 
        });
    }

}


function* watchLoadUser(){
    yield takeEvery(LOAD_USER_REQUEST,sagaLoadUser);
}
//------------------------------------------------------------------------




//회원가입 사이클 
//------------------------------------------------------------------------
function APIJoin(data){
    console.log('data==>' , data); 
    return axios.post('/auth/join',{data},{withCredentials:true}); 

}




function* sagaJoin(action){
    
    try{
       console.log(action, action.data);
        const result = yield call(APIJoin,action.data); 
        yield put({
            type:JOIN_SUCCESS,
            data: result,
        }); 

    }catch(e){

      console.error(e); 

        yield put({
            type:JOIN_FAILURE,
            error:e, 
        })
    }

}



function* watchJoin(){
    yield takeLatest(JOIN_REQUEST,sagaJoin)
}
//------------------------------------------------------------------------




//로그아웃 사이클
//------------------------------------------------------------------------
function APILogOut(){

    return axios.get('/auth/logOut',{withCredentials:true});


}

function* sagaLogOut(){


    try{
      const result =   yield call(APILogOut); 
    

        yield put({
            type:LOGOUT_SUCCESS,
        }); 


    }catch(e){
        alert('로그아웃 에러'); 
        yield put({
            type:LOGOUT_FAILURE, 
            error:e,
        })
    }
}

function* watchLogOut(){
    yield takeLatest(LOGOUT_REQUEST,sagaLogOut); 
}
//------------------------------------------------------------------------


//로그인 사이클
//------------------------------------------------------------------------
function APILogin(data){

    //jwt 로그인
    return axios.post('/auth/login',{data},{withCredentials:true});

    //passport local 로그인
    //return axios.post('/auth/login',data,{withCredentials:true});
}
//카카오 로그인 
function APILoginKakao(){

    return axios.get('/auth/kakao/',{withCredentials:true});
}

function APILoginKakaoSDK(){
    return axios.get('/auth/kakaoTest/',{withCredentials:true});
}

function* sagaLogin(action){


    try{

        let result; 
        let decoded;
        if(action.data.loginType==='local'){
            
            result = yield call(APILogin,action.data); 
            console.log('result.data.token==>' , result.data.token); 
            decoded =jwtDeCoder(result.data.token); 
            yield put({
                type:LOGIN_SUCCESS,
                data:decoded.nick,
            }); 

        }else if(action.data.loginType==='kakao'){

            result = yield call(APILoginKakao); 
            decoded =result.data;
            yield put({
                type:LOGIN_SUCCESS,
                data:decoded.nick,
            }); 

        }else{
            if(Kakao.isInitialized()){
                    console.log('Kakao.isInitialized()=>>',Kakao.isInitialized())
                    Kakao.Auth.authorize({
                        
                        redirectUri:'http://captainryan.gonetis.com:3095/api/auth/kakaoTest',
                        //redirectUri:'/auth/kakao/',
                        
                        success : function(authObj){
                            console.log('성공이야!==>', authObj); 
                        }

                    });
            }
            result = yield call(APILoginKakao); 
            decoded =result.data;
            yield put({
                type:LOGIN_SUCCESS,
                data:decoded.nick,
            }); 
        }
        
                               



    }catch(e){
        alert('로그인 에러',result); 
        yield put({
            type:LOGIN_FAILURE, 
            error:e,
        })
    }
}

function* watchLogin(){
    yield takeEvery(LOGIN_REQUEST,sagaLogin); 
}
//------------------------------------------------------------------------


export default function* authSaga(){


    yield all([
        fork(watchJoin), 
        fork(watchLogin), 
        fork(watchLoadUser), 
        fork(watchLogOut), 
        
    ])
}