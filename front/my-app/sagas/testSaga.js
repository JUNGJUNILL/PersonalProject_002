import { all, fork, put, takeLatest, call, throttle, delay} from 'redux-saga/effects';
const fetch =require('node-fetch');
import axios from 'axios'
import {
    TEST_REQUEST,
    TEST_SUCCESS,
    TEST_FAILURE,

    TEST_REQUEST02,
    TEST_SUCCESS02,
    TEST_FAILURE02,

    SAVE_IP_ADRESS_REQUEST,
    SAVE_IP_ADRESS_SUCCESS,
    SAVE_IP_ADRESS_FAILURE,

} from '../reducers/testReducer';


//------------------------------------------------------------------------
async function  testAPI(data) {

    const res =await fetch('http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=0629834ae89dc98668de1dd8f46c9b34&targetDt=20120101')
    const json = await res.json(); 
    const posts =  JSON.parse(JSON.stringify(json)); 
    const jsonlist = posts.boxOfficeResult.dailyBoxOfficeList
    return jsonlist;
  }

function* test(){
    try{

        //call 동기 함수호출         :블로킹   (결과값 받을 때까지 기다림)
        //fork 비동기 함수호출        :논블로킹 (결과값 받을 때까지 안기다림)
        const result = yield call(testAPI); 

        //call의 동작원리
        // axios.post('/api/test').then((result)=>{
        //     yield put({
        //         type:TEST_SUCCESS,
        //         data: result,
        //     }); 
        // });


        //put , dispatch 라고 생각하며 된다. 
        yield put({
            type:TEST_SUCCESS,
            data: result,
        }); 

    }catch(e){
        console.log('에러 발생==>' , e); 
        yield put({
            type:TEST_FAILURE,
            error:e.response.data,
        })
    }
}
//------------------------------------------------------------------------

function test02API(data){
    return axios.post('/emp/select',{data}); 
    
}


function* test02(action){
    try{
        const result = yield call(test02API,action.data); 
        yield  put({
              type:TEST_SUCCESS02, 
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


function* saveClientIpAdress(action){

    try{    
        console.log('saveClientIpAdress saga', action); 
        yield put({ 
                    type:SAVE_IP_ADRESS_SUCCESS,
                    data:action.data,
        });

    }catch(e){
        console.log(e); 
        alert('sagas error  ' , e); 
        yield put({
            type:SAVE_IP_ADRESS_FAILURE,
            error:e,
        })
    }
} 


function* watchTest() {
    yield takeLatest(TEST_REQUEST, test);
    //TEST_REQUEST 액션이 실행될 때까지 기다리겠다.
    //takeLatest 더블 클릭 시 서버에 2번요청 간다.
    //응답은 한번만 온다.
    //결국 db에 데이터가 2개 저장 될 수 있다. 
    //이걸 방지한게 throttle이라는 것이 있다. : 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는것
  }

function* watchTest02() {
    yield takeLatest(TEST_REQUEST02, test02);
}

function* watchSaveClientIpAdress(){
    yield takeLatest(SAVE_IP_ADRESS_REQUEST,saveClientIpAdress);
}



export default function* testSaga() {
    yield all([
                fork(watchTest),
                fork(watchTest02), 
                fork(watchSaveClientIpAdress), 
              ]); 
}