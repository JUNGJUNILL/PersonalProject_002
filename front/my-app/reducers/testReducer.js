import produce from '../util/produce';


export const  initialState = {
    testArray     : [], 

}


//게시물 list
export const TEST_REQUEST='TEST_REQUEST';
export const TEST_SUCCESS='TEST_SUCCESS';
export const TEST_FAILURE='TEST_FAILURE';


const reducer = (state = initialState, action) => produce(state, (draft) => {

    switch(action.type){

        case TEST_REQUEST : {
            break;
        }
        case TEST_SUCCESS : {
            //draft.testArray.length=0; 
            console.log('TEST SUCCESS ==> ' , action.data); 
            action.data.forEach((v)=>{
                draft.testArray.push(v); 
            }); 

            break;

        }
        case TEST_FAILURE: {
            break; 
        }




        default : break; 
    
    }

}); 
export default reducer;