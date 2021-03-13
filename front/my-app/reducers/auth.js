import produce from '../util/produce';

export const  initialState = {

    isJoinng : false, //회원가입 시도중 
    joined   : ''   , //회원가입 성공 

    isLogining : false, //로그인 시도 중
    userInfo : null,      //사용자 정보


}


export const JOIN_REQUEST = 'JOIN_REQUEST'; 
export const JOIN_SUCCESS = 'JOIN_SUCCESS'; 
export const JOIN_FAILURE = 'JOIN_FAILURE'; 

export const LOGIN_REQUEST = 'LOGIN_REQUEST'; 
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'; 
export const LOGIN_FAILURE = 'LOGIN_FAILURE'; 

export const LOAD_LOGIN_REQUEST = 'LOAD_LOGIN_REQUEST'; 

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'; 
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'; 
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE'; 

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'; 
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'; 
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'; 

const reducer = (state = initialState, action) => produce(state, (draft) => {


        switch(action.type){

//회원가입
//------------------------------------------------
            case JOIN_REQUEST: {
                draft.isJoinng = true;
                break; 
            }

            case JOIN_SUCCESS: {
                draft.isJoinng = false; 
                draft.joined   = '회원가입 성공!'; 
                break; 
            }

            case JOIN_FAILURE: {
                break; 
            }
//------------------------------------------------

//로그인 창 화면전환
//------------------------------------------------
            case LOAD_LOGIN_REQUEST : {
                draft.joined ='';     
                break;
            }
//------------------------------------------------



//로그인
//------------------------------------------------
            case LOGIN_REQUEST :{
                draft.isLogining = true; 
                break; 
            }

            case LOGIN_SUCCESS :{
                draft.isLogining = false;               
                draft.userInfo = action.data; 
                break; 
            }
        
            case LOGIN_FAILURE :{

                break; 
            }
//------------------------------------------------


//로그인 정보 유지 
//------------------------------------------------
            case LOAD_USER_REQUEST :{
                break; 
            }

            case LOAD_USER_SUCCESS :{
                draft.userInfo = action.data; 
                break; 
            }

            case LOAD_USER_FAILURE :{

                break; 
            }
//------------------------------------------------

//로그아웃 
//------------------------------------------------
            case LOGOUT_REQUEST :{
                break; 
            }

            case LOGOUT_SUCCESS :{
                draft.userInfo =null; 
                break; 
            }

            case LOGOUT_FAILURE :{
                break; 
            }
//------------------------------------------------

            default :  break;
    
             
        }

    }); 


export default reducer;