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
axios.defaults.headers.common['Authorization'] = 'Epet eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ildpc3NhbnVwb25nIiwicGFzc3dvcmQiOiIkMmEkMTAkUHNpVGlhcFV1Y00ybDJBZ0o2T0RWT2FzNkIzM09zNy5tU0M3ZDllSnZSVmdOVzFyLnlkQS4iLCJpYXQiOjE1NjY5Nzk2MzEsImV4cCI6MTU2OTU3MTYzMX0.gMLTb9W26xomtQi3tAbuIkqEkomor8R55HaryHR0bqM';
AppRegistry.registerComponent(appName, () => App);
