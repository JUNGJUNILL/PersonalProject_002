
import { all, fork } from 'redux-saga/effects';
import axios from 'axios';



import mainPosts_1001Saga from './mainPosts_1001Saga';
import testSaga from './testSaga';
import empListSaga from './empListSaga'; 
import authSaga from './authSaga'; 

import { backUrl } from '../config/config';


axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;


export default function* rootSaga() {
    yield all([ fork(mainPosts_1001Saga), 
                fork(testSaga), 
                fork(empListSaga), 
                fork(authSaga), 
    ]);
  }
