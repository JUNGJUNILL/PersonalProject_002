import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
const fetch =require('node-fetch');
import {
    TEST_REQUEST,
    TEST_SUCCESS,
    TEST_FAILURE
} from '../reducers/testReducer';


async function  testAPI(data) {

    const res =await fetch('http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=0629834ae89dc98668de1dd8f46c9b34&targetDt=20120101')
    const json = await res.json(); 
    const posts =  JSON.parse(JSON.stringify(json)); 
    const jsonlist = posts.boxOfficeResult.dailyBoxOfficeList
    return jsonlist;
  }

function* test(){
    try{

        const result = yield call(testAPI); 
        console.log('result====>' , result); 
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


function* watchTest() {
    yield takeLatest(TEST_REQUEST, test);
  }


export default function* testSaga() {
    yield all([
                fork(watchTest),
              ]); 
}