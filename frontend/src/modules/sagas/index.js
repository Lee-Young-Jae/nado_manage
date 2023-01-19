import { all, fork } from "redux-saga/effects";
import userSaga from "./user";
import stockSaga from "./stock";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:3070";
// axios.defaults.baseURL = "http://192.168.0.8:3080";
axios.defaults.withCredentials = true; //사가에서 보내는 axios 요청들엔 withCredentials가 true로 공통적으로 들어간다. 서버와 쿠키 전달을 위함

// ============ 이벤트 등록 ============
export default function* rootSaga() {
  //비동기 액션 추가.
  yield all([fork(userSaga), fork(stockSaga)]);
}
// ====================================
