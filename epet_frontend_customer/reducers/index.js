import { combineReducers } from "redux";
import petsReducer from "./petsReducer";
import userReducer from "./userReducer";
import chatReducer from "./ChatReducer";

export default combineReducers({
  pets: petsReducer,
  user: userReducer,
  chat: chatReducer
});
