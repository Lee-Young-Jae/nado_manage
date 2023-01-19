import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_ME_FAILURE,
  LOAD_ME_REQUEST,
  LOAD_ME_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../reducers/user";

function loadMeAPI(data) {
  return axios.get(`/user/load`);
}

function* loadMe(action) {
  try {
    const result = yield call(loadMeAPI, action.data);
    yield put({
      type: LOAD_ME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_ME_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI(data) {
  return axios.post("/user/signup", data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);

    yield put({
      type: USER_SIGNUP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: USER_SIGNUP_FAILURE,
      error: err.response.data,
    });
  }
}

function LogInAPI(data) {
  return axios.post("/user/login", data);
}

function* logIn(action) {
  try {
    const result = yield call(LogInAPI, action.data);

    yield put({
      type: USER_LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: USER_LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI(data) {
  return axios.post(`/user/logout`);
}

function* logOut(action) {
  try {
    const result = yield call(logOutAPI, action.data);

    yield put({
      type: USER_LOGOUT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: USER_LOGOUT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchSignUp() {
  yield takeLatest(USER_SIGNUP_REQUEST, signUp);
}

function* watchLogin() {
  yield takeLatest(USER_LOGIN_REQUEST, logIn);
}

function* watchLogout() {
  yield takeLatest(USER_LOGOUT_REQUEST, logOut);
}
function* watchLoadMe() {
  yield takeLatest(LOAD_ME_REQUEST, loadMe);
}

export default function* userSaga() {
  yield all([fork(watchSignUp), fork(watchLogin), fork(watchLogout), fork(watchLoadMe)]);
}
