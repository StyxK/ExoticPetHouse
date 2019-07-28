/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './views/Main';
import {name as appName} from './app.json';
import axios from 'axios';
import Config from 'react-native-config';

const API_URL = Config.API_URL

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Authorization'] = 'Epet eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3QiLCJwYXNzd29yZCI6IiQyYSQxMCR6b2dzZDVPb3VIcEdSYXpJVUtNdGRlL2NuSlVrcFY5QkxFNlFzZ042RElnenlLRUY0NTgvYSIsImlhdCI6MTU2NDMwMjk1NywiZXhwIjoxNTY2ODk0OTU3fQ.XbKuvfOJbvEDjFOWnv0CGc44rXj_hOSGQ647HQ-lUFk';
AppRegistry.registerComponent(appName, () => App);
