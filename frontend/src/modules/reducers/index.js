import { combineReducers } from "redux";
import user from "./user";
import stock from "./stock";

const rootReducer = combineReducers({
  user,
  stock,
});

export default rootReducer;
