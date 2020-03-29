import { combineReducers } from "redux";
import logReducer from "./logReducers";
import techReducer from "./techReducers";

export default combineReducers({
  log: logReducer,
  tech: techReducer
});
