/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './views/Main';
import {name as appName} from './app.json';
import Config from 'react-native-config'
import axios from 'axios'

const API_URL = Config.API_URL
axios.defaults.baseURL = API_URL;

AppRegistry.registerComponent(appName, () => App);
