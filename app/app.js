/**
 * Dependences
 * Typings v0.1
 *
 * @format
 * @flow
 */
 global.Buffer = global.Buffer || require('buffer').Buffer

import React, {Component} from 'react';
import {Platform, AppRegistry, ActivityIndicator, StyleSheet, Animated, Easing} from 'react-native';
import Icon from 'react-native-fa-icons';
//import PouchDB from 'pouchdb-react-native';
import {  API_URL, 
          PORT_API_DIRECT, 
          PORT_API, 
          DB_BOOKS, 
          INDEX_NAME, 
          LOCAL_DB_NAME, 
          API_STATIC, 
          SETTINGS_LOCAL_DB_NAME 
  } from 'react-native-dotenv'
import { createStackNavigator, createAppContainer, NavigationActions } from 'react-navigation';
import { fadeIn } from 'react-navigation-transitions';
import API from './services/api';
import moment from "moment/min/moment-with-locales";

import SplashScreen from 'react-native-splash-screen';


//let ApplicationStorage = PouchDB(LOCAL_DB_NAME, {auto_compaction: true});

/**
 * Screens
 * Navigation
 *
 * @format
 * @flow
 */
import SignedOut from './screens/signedOut.js';
import SignedIn from './screens/signedIn.js';



let initRoute;

console.disableYellowBox = true;


const Routes = createStackNavigator({
    SignedOut:{
        screen: SignedOut,
        navigationOptions: {
                 header: null//Will hide header for LoginStack 
           }
    },
    SignedIn:{
        screen: SignedIn,
        navigationOptions: {
              header: null,
              gesturesEnabled: false
             /*headerLeft: null,
             title: 'Typings',
             gesturesEnabled: false,
             headerStyle: {
              backgroundColor: '#333',
               },
             headerTintColor: '#fff',
             headerTitleStyle: {
               fontWeight: '200',
              },*/
       }
    }
}, { initialRouteName: initRoute, transitionConfig: () => fadeIn(), });

const AppNavigator = createAppContainer(Routes);
module.exports = Routes;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = { navigation: Function }



export default class App extends Component<Props> {
  constructor(props) {
      super(props)
      this.state = {
         isLoading: true,
         isLoggedIn: null,
         isLoggingOut: false,
         new: false,
         rootUser: null
      }

      this.Remote = new API({ url: API_URL })
      this.logOut = this._logOut.bind(this);
      this.isNew = this._isNew.bind(this);


   }
   componentDidMount() {

     // Set dates in spanish
     SplashScreen.hide();
     this.$init();
  
     moment.locale('es');
     
     //console.log("Mounting app")

        
   }

   $init = async() => {
      let u = await this.Remote.Auth().getMeOffline().catch(e => e);
      let lg = false;
      let usr = null;
      if(u._id){
         usr = u;
         lg = true;
      }
      console.log("INIT A PP!",  u)
      return this.setState({ 
        isLoading: false, 
        isLoggedIn: lg,
        rootUser: u ? u : null
      });
   }
   onNext = () => {
      this.setState({introText: 'My Changed Text'})
   }
   _isNew = () => {
     this.setState({new: true})
   }
   _switchNavigator = async() => {
     let u = await this.Remote.Auth().getMeOffline().catch(e => e);
      let lg = false;
      let usr = null;
      if(u._id){
         usr = u;
         lg = true;
      }
      console.log("INIT A PP!",  u)
      return this.setState({ 
        isLoading: false, 
        isLoggedIn: lg,
        rootUser: u ? u : null
      });
   }

   _logOut = () => {
     
     //Remote.Auth().signOut();
     //this.setState({isLoggingOut: true})
     this.setState({isLoggedIn: false})
     __DEV__ && console.log("logOut: Logging out", this.state, this.props)
     //RNRestart.Restart();
     //this.props.navigation.navigate('SignedOut')
   }

      /*<Text style={styles.instructions}>To get started, edit App.js</Text>*/
        /*<Text style={styles.instructions}>{instructions}</Text>*/

  render() {
   // __DEV__ && console.log("app.js properties", this.props)
    if (this.state.isLoading == true) {
      return (
        <ActivityIndicator
            style={styles.indicator}
            color="#000"
            size="large"
          />
        )
      } else {
        if(this.state.isLoggedIn == true) {
          return (
            <SignedIn screenProps={{logOut: () => this.logOut(), switchScreen: () => this._switchNavigator(), Remote: this.Remote, navigation: this.props.navigation, rootUser: this.state.rootUser }} style={{marginTop: 0, paddingTop: 0}} 
            navigation={this.props.navigation}/>
          );
        } else {
          return (
            <AppNavigator screenProps={{Remote: this.Remote, switchScreen: () => this._switchNavigator()}}style={{marginTop: 0, paddingTop: 0}} navigation={this.props.navigation}/>
          );
        }
    }
  }
}

module.exports = App;

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }
});

AppRegistry.registerComponent('Navigation', () => Navigation);