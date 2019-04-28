import { combineReducers } from "redux";
import petsReducer from "./petsReducer";
import userReducer from "./userReducer";

export default combineReducers({
  pets: petsReducer,
  user: userReducer
});
