import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './UserReducer';
import ChatReducer from './ChatReducer';
import storeReducer from './StoreReducer';
const reducers = {
  form: formReducer,
  user: userReducer,
  chat: ChatReducer,
  store: storeReducer,
}
const allReducers= combineReducers(reducers);
export default allReducers;