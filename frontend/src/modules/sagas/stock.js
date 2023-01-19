import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_STOCK_FAILURE,
  LOAD_STOCK_REQUEST,
  LOAD_STOCK_SUCCESS,
  SEARCH_STOCK_FAILURE,
  SEARCH_STOCK_REQUEST,
  SEARCH_STOCK_SUCCESS,
} from "../reducers/stock";

function searchStockAPI(data) {
  return axios.get(`/stock/list/${data}`);
}

function* searchStock(action) {
  try {
    const result = yield call(searchStockAPI, action.data);

    yield put({
      type: SEARCH_STOCK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: SEARCH_STOCK_FAILURE,
      error: err.response.data,
    });
  }
}

function loadStockAPI(data) {
  return axios.get(
    `/stock?shortCode=${data.shortCode}&BASE_DT=${data.BASE_DT}&ROWS=${data.ROWS}`
  );
}

function* loadStock(action) {
  try {
    const result = yield call(loadStockAPI, action.data);

    yield put({
      type: LOAD_STOCK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_STOCK_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchSearchStock() {
  yield takeLatest(SEARCH_STOCK_REQUEST, searchStock);
}

function* watchStockDetail() {
  yield takeLatest(LOAD_STOCK_REQUEST, loadStock);
}

export default function* userSaga() {
  yield all([fork(watchSearchStock), fork(watchStockDetail)]);
}
