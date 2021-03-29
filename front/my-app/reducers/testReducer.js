import produce from '../util/produce';


export const  initialState = {
    testArray     : [], 
    testArray02   : [],
    clientIp      : '',
}


//게시물 list
export const TEST_REQUEST='TEST_REQUEST';
export const TEST_SUCCESS='TEST_SUCCESS';
export const TEST_FAILURE='TEST_FAILURE';

//유통사 리스트 
export const TEST_REQUEST02='TEST_REQUEST02';
export const TEST_SUCCESS02='TEST_SUCCESS02';
export const TEST_FAILURE02='TEST_FAILURE02';

//ip 저장 
export const SAVE_IP_ADRESS_REQUEST = 'SAVE_IP_ADRESS_REQUEST'; 
export const SAVE_IP_ADRESS_SUCCESS = 'SAVE_IP_ADRESS_SUCCESS'; 
export const SAVE_IP_ADRESS_FAILURE = 'SAVE_IP_ADRESS_FAILURE'; 


//파일 업로드
export const FILE_UPLOAD_REQUEST = 'FILE_UPLOAD_REQUEST';
export const FILE_UPLOAD_SUCCESS = 'FILE_UPLOAD_SUCCESS';
export const FILE_UPLOAD_FAILURE = 'FILE_UPLOAD_FAILURE'; 

const reducer = (state = initialState, action) => produce(state, (draft) => {

    switch(action.type){

//--------------------------------------------------------------------
        case TEST_REQUEST : {
            break;
        }
        case TEST_SUCCESS : {
            //draft.testArray.length=0; 
            action.data.forEach((v)=>{
                draft.testArray.push(v); 
            }); 

            break;

        }
        case TEST_FAILURE: {
            break; 
        }
//--------------------------------------------------------------------


//--------------------------------------------------------------------
        case TEST_REQUEST02 : {
            break;
        }
        case TEST_SUCCESS02 : {
            draft.testArray02.length=0; 
            action.data.forEach((v)=>{
                draft.testArray02.push(v); 
            }); 

            break;

        }
        case TEST_FAILURE02: {
            break; 
        }
//--------------------------------------------------------------------

//사용자 아이피 저장
//--------------------------------------------------------------------
        case SAVE_IP_ADRESS_REQUEST: {      
            console.log('reducer==>',SAVE_IP_ADRESS_REQUEST);     
            break; 
        }

        case SAVE_IP_ADRESS_SUCCESS: {
            draft.clientIp=action.data;
            break; 
        }

        case SAVE_IP_ADRESS_FAILURE: {
            draft.clientIp=`can't not found ip adress`;
            break; 
        }
//--------------------------------------------------------------------

//파일 업로드
//--------------------------------------------------------------------
        case FILE_UPLOAD_REQUEST: {      
            break; 
        }

        case FILE_UPLOAD_SUCCESS: {
            break; 
        }

        case FILE_UPLOAD_FAILURE: {
            break; 
        }
//--------------------------------------------------------------------



        default : break; 
    
    }

}); 
export default reducer;