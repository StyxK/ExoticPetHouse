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
axios.defaults.headers.common['Authorization'] = "Epet eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRhbmFwYXQiLCJwYXNzd29yZCI6IiQyYSQxMCRxNFRoOHdBV0hKOWJFUmNMYW1NSjlPaUFCTHFyanJiTnBjVjFoN2ptNTVIdTJsZnNIMzR1aSIsImlhdCI6MTU2MjU3NzMxMiwiZXhwIjoxNTY1MTY5MzEyfQ.8UtaSloaoqb8L50z8wBcUPhNfYEgR0rOYGTEkap5ng0";
AppRegistry.registerComponent(appName, () => App);
