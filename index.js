/** @format */

import { AppRegistry } from 'react-native';
import App from './app/app';
import {name as appName} from './app.json';

//console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

console.log("app screeeen")
AppRegistry.registerComponent(appName, () => App);
 