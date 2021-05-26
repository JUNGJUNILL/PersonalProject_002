import produce from '../util/produce';


export const  initialState = {

    emplist : [], 
    imagePaths : [],
    postInserting : false,

}

export const EMP_LIST_REQUEST = 'EMP_LIST_REQUEST'; 
export const EMP_LIST_SUCCESS = 'EMP_LIST_SUCCESS'; 
export const EMP_LIST_FAILURE = 'EMP_LIST_FAILURE'; 


export const EMP_INSERT_REQUEST = 'EMP_INSERT_REQUEST'; 
export const EMP_INSERT_SUCCESS = 'EMP_INSERT_SUCCESS'; 
export const EMP_INSERT_FAILURE = 'EMP_INSERT_FAILURE'; 

// export const UPLOAD_IMAGES_REQUEST="UPLOAD_IMAGES_REQUEST";
// export const UPLOAD_IMAGES_SUCCESS="UPLOAD_IMAGES_SUCCESS";
// export const UPLOAD_IMAGES_FAILURE="UPLOAD_IMAGES_FAILURE";

export const DETAIL_INFO_REQUEST ='DETAIL_INFO_REQUEST'; 
export const DETAIL_INFO_SUCCESS ='DETAIL_INFO_SUCCESS'; 
export const DETAIL_INFO_FAILURE ='DETAIL_INFO_FAILURE'; 

export const TEST_REQUEST = 'TEST_REQUEST'; 
export const TEST_SUCCESS = 'TEST_SUCCESS'; 
export const TEST_FAILURE = 'TEST_FAILURE'; 


const reducer = (state = initialState, action) => produce(state, (draft) => {




        switch(action.type){

        
//----------------------------------------
            case EMP_LIST_REQUEST: {
                break; 
            }


            case EMP_LIST_SUCCESS: {
                draft.emplist.length=0; 
                //배열 초기화
                action.data.forEach((v)=>{
                    draft.emplist.push(v); 
                }); 
                break; 
            }

            case EMP_LIST_FAILURE: {
                break; 
            }
//----------------------------------------


//----------------------------------------
            // case UPLOAD_IMAGES_REQUEST: {
            //     break; 
            // }


            // case UPLOAD_IMAGES_SUCCESS: {
                
            //     draft.imagePaths.length=0; 
            //     action.data.forEach((v)=>{
            //         draft.imagePaths.push(v); 
            //     }); 

            //     break; 
            // }

            // case UPLOAD_IMAGES_FAILURE: {
            //     break; 
            // }
//----------------------------------------


//게시글 작성 
//----------------------------------------
            case EMP_INSERT_REQUEST: {
                draft.postInserting = true; 
                break; 
            }


            case EMP_INSERT_SUCCESS: {


                break; 
            }

            case EMP_INSERT_FAILURE: {
                break; 
            }
//----------------------------------------




//게시글 상세 페이지 가져오기 
//----------------------------------------
            case DETAIL_INFO_REQUEST: {
                break; 
            }


            case DETAIL_INFO_SUCCESS: {


                break; 
            }

            case DETAIL_INFO_FAILURE: {
                break; 
            }
//----------------------------------------

            default : break; 
        }
}); 

export default reducer;