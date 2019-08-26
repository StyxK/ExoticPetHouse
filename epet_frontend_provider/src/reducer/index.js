import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './UserReducer';
import ChatReducer from './ChatReducer';
const reducers = {
  form: formReducer,
  user: userReducer,
  chat: ChatReducer
}
const allReducers= combineReducers(reducers);
export default allReducers;