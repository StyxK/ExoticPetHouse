import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './UserReducer';
const reducers = {
  form: formReducer,
  user: userReducer
}
const allReducers= combineReducers(reducers);
export default allReducers;