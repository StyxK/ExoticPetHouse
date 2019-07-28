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
axios.defaults.headers.common['Authorization'] = 'Epet eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ildpc3NhbnVwb25nIiwicGFzc3dvcmQiOiIkMmEkMTAkUHNpVGlhcFV1Y00ybDJBZ0o2T0RWT2FzNkIzM09zNy5tU0M3ZDllSnZSVmdOVzFyLnlkQS4iLCJpYXQiOjE1NjQzMTAxMjMsImV4cCI6MTU2NjkwMjEyM30.ReQGbAMsPN8Nxjn2d2XeqvNCSwHFYbpWS_J3d5512JA';
AppRegistry.registerComponent(appName, () => App);
