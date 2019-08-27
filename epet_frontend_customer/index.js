/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App.js';
import axios from "axios";
import Config from "react-native-config";

const API_URL = Config.API_URL;

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Authorization'] = "Epet eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRhbmFwYXQiLCJwYXNzd29yZCI6IiQyYSQxMCRxNFRoOHdBV0hKOWJFUmNMYW1NSjlPaUFCTHFyanJiTnBjVjFoN2ptNTVIdTJsZnNIMzR1aSIsImlhdCI6MTU2Njg5ODcxMSwiZXhwIjoxNTY5NDkwNzExfQ.5q_s-ttb6RZB5R85aWuZai0vlhTgBh8qqStFCB76X2I";
AppRegistry.registerComponent(appName, () => App);
