import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { applyMiddleware, createStore } from "redux"; // ,compose 배포시 composeWithDevTools 대신 compose 사용
import rootReducer from "./modules/reducers";
import { Provider } from "react-redux";
import myLogger from "./middlewares/configureStore";
import { configureStore } from "@reduxjs/toolkit";

import rootSaga from "./modules/sagas";
import createSagaMiddleware from "redux-saga";
const sagaMiddleware = createSagaMiddleware();

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(sagaMiddleware, myLogger))
//   // compose(applyMiddleware(sagaMiddleware, myLogger))
// );

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware, myLogger],
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);

const rootNode = document.getElementById("root");
ReactDOM.createRoot(rootNode).render(
  <Provider store={store}>
    <App />
  </Provider>
);
