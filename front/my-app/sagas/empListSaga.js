import axios from 'axios'
import {all,fork,takeLatest,takeEvery ,put, delay,call} from 'redux-saga/effects'; 
import 
    {EMP_LIST_REQUEST,
     EMP_LIST_SUCCESS,
     EMP_LIST_FAILURE,
     EMP_INSERT_REQUEST,
     EMP_INSERT_SUCCESS,
     EMP_INSERT_FAILURE,
     UPLOAD_IMAGES_REQUEST,
     UPLOAD_IMAGES_SUCCESS,
     UPLOAD_IMAGES_FAILURE,

    TEST_REQUEST,
    TEST_SUCCESS,
    TEST_FAILURE
    } 
from '../reducers/emp'; 



//EMP SELECT
//-----------------------------------------------------------------------------------
function APIempList(data){
    return axios.post('/emp',{data})
}

function* sagaEmpList(action){

    try{
      const result = yield call(APIempList,action.data); 
      yield  put({
            type:EMP_LIST_SUCCESS, 
            data:result.data,
        });

    }catch(e){

        console.error(e); 
        alert('error', e); 
        yield put({
            type:EMP_LIST_FAILURE, 
            error: e, 
        }); 
    }
}

function* watchempList(){
    yield takeLatest(EMP_LIST_REQUEST,sagaEmpList); 
}
//-----------------------------------------------------------------------------------


//EMP INSERT 
//-----------------------------------------------------------------------------------
function APIempInsert(data){

    return axios.post('/emp/empInsert',{data})

}

function* sagaEmpInsert(action){

    try{

        const result = yield call(APIempInsert,action.data); 
        console.log('saga' , result); 
        yield  put({
              type:EMP_INSERT_SUCCESS, 
              data:result.data,
          });
  
      }catch(e){
  
          console.error(e); 
          alert('error', e); 
          yield put({
              type:EMP_INSERT_FAILURE, 
              error: e, 
          }); 
      }

}


function* watchInsertEmp(){
    yield takeLatest(EMP_INSERT_REQUEST,sagaEmpInsert); 
}
//-----------------------------------------------------------------------------------



// FILE UPLOAD 
//-----------------------------------------------------------------------------------
function APIUploadImage(formData){
    return axios.post('/emp/images',formData,{withCredentials:true}); 
}

function* upLoadImages(action){


    try{
        const result = yield call(APIUploadImage,action.data); 
        yield  put({
              type:UPLOAD_IMAGES_SUCCESS, 
              data:result.data,
          });
  
      }catch(e){
  
          console.error(e); 
          alert('error', e); 
          yield put({
              type:UPLOAD_IMAGES_FAILURE, 
              error: e, 
          }); 
      }

}



function* watchUploadImages(){
    yield takeLatest(UPLOAD_IMAGES_REQUEST,upLoadImages); 
}
//-----------------------------------------------------------------------------------





//TEST
//-----------------------------------------------------------------------------------

function APItest(data){

    return axios.post('/emp/select',{data},{withCredentials:true})

}

function* sagaTest(action){

    try{

        const result = yield call(APItest,action.data); 
        console.log('sagasagates' , result.data); 
        yield  put({
              type:TEST_SUCCESS, 
              data:result.data,
          });
  
      }catch(e){
  
          console.error(e); 
          alert('error', e); 
          yield put({
              type:TEST_FAILURE, 
              error: e, 
          }); 
      }

}


function* watchTest(){
    yield takeLatest(TEST_REQUEST,sagaTest); 
}
//-----------------------------------------------------------------------------------







export default function* empListSaga(){

    yield all([
        fork(watchempList), 
        fork(watchInsertEmp), 
        fork(watchUploadImages), 
        fork(watchTest), 
     ])
}