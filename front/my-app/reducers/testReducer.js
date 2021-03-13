import produce from '../util/produce';


export const  initialState = {
    testArray     : [], 
    testArray02   : [],
}


//게시물 list
export const TEST_REQUEST='TEST_REQUEST';
export const TEST_SUCCESS='TEST_SUCCESS';
export const TEST_FAILURE='TEST_FAILURE';

export const TEST_REQUEST02='TEST_REQUEST02';
export const TEST_SUCCESS02='TEST_SUCCESS02';
export const TEST_FAILURE02='TEST_FAILURE02';



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



        default : break; 
    
    }

}); 
export default reducer;