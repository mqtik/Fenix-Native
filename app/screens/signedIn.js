/**
 * Typings SignedIn
 * typings.co
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, Header, ActivityIndicator, StyleSheet, Text, TextInput, View, Button, Alert, TouchableOpacity, Image, ImageBackground, ScrollView, StatusBar, SafeAreaView, Animated, Easing, NativeModules } from 'react-native';
import Icon from 'react-native-fa-icons';
import Icono from 'react-native-vector-icons/Ionicons';
import EntypoIcono from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import PouchDB from 'pouchdb-react-native'
import Toast, {DURATION} from 'react-native-easy-toast'
import { API_URL, LOCAL_DB_DRAFTS, LOCAL_DB_CHAPTERS, PORT_API_DIRECT, PORT_API, DB_BOOKS, INDEX_NAME, LOCAL_DB_NAME, API_STATIC, SETTINGS_LOCAL_DB_NAME } from 'react-native-dotenv'
import LinearGradient from 'react-native-linear-gradient';
import styles, { colors } from '../styles/index.style';
import { createBottomTabNavigator, createDrawerNavigator, createStackNavigator, createAppContainer, HeaderBackButton, NavigationActions, StackActions } from 'react-navigation';
import RNRestart from 'react-native-restart';
import { human } from 'react-native-typography'
import {Column as Col, Row} from 'react-native-flexbox-grid';

// Routes
import HomeScreen from './routes/homeScreen.js';
import ProductsScreen from './routes/productsScreen.js';

import ProductProfileScreen from './routes/productProfileScreen.js';
import ProfileScreen from './routes/profileScreen.js';
import AboutScreen from './routes/aboutScreen.js';
import ChoferScreen from './routes/choferScreen.js';
import QRScreen from './routes/qrScreen.js';
import ViajesScreen from './routes/viajesScreen.js';
import ContactScreen from './routes/contactScreen.js';

import HeaderFX from '../components/header.js';
import NavbarBottom from '../components/navbar.js';
import DrawerBar from '../components/sidebar.js';

// Get API class
import API from '../services/api';

// Languages
import { getLang, Languages } from '../static/languages';

const Remote = new API({ url: API_URL })

const IS_ANDROID = Platform.OS === 'android';




const HomeNavigator = createStackNavigator({
                        Home:{
                            screen: HomeScreen,
                            navigationOptions: {
                              header: props => <HeaderFX {...props} />,
                              headerTitle: 'Inicio',
                                 gesturesEnabled: true,
                                 headerTitleStyle: {flex: 1, textAlign: 'center'},
                                 headerStyle: {
                                   elevation: 0,
                                  backgroundColor: 'transparent',
                                  borderBottomWidth: 0,
                                  ...Platform.select({
                                          android: {
                                            marginTop: 24,
                                          },
                                        })
                                   },
                                 headerTintColor: '#000',
                                 headerTitleStyle: {
                                   fontWeight: '500',
                                  }
                           }
                        },
                        ProductProfile:{
                            screen: ProductProfileScreen,
                            navigationOptions: {
                              header: props => <HeaderFX {...props} />,

                                 gesturesEnabled: true,
                                 headerTitleStyle: {flex: 1, textAlign: 'center'},
                                 headerStyle: {
                                   elevation: 0,
                                  backgroundColor: 'transparent',
                                  borderBottomWidth: 0,
                                  ...Platform.select({
                                          android: {
                                            marginTop: 24,
                                          },
                                        })
                                   },
                                 headerTintColor: '#000',
                                 headerTitleStyle: {
                                   fontWeight: '500',
                                  }
                           }

                        }
                    }, {initialRouteName: 'Home', headerMode: 'float'});

      const ProfileNavigator = createStackNavigator({
                        Profile:{
                            screen: ProfileScreen,
                            navigationOptions: {
                              header: props => <HeaderFX {...props} />,
                              headerTitle: 'Profile',
                              // headerTitle: (
                              //         <View style={{flex: 1, alignItems: 'center'}}><Image style={{
                              //                   alignSelf: 'center',

                              //                   marginTop: -15,
                              //                   height: 80,
                              //                   width: 80
                              //                 }} 
                              //                 resizeMode="contain" 
                              //                 source={require('../../assets/logo_app.png')}/>
                              //                 </View>
                              //     ),
                                 gesturesEnabled: true,
                                 headerTitleStyle: {flex: 1, textAlign: 'center'},
                                 headerStyle: {
                                   elevation: 0,
                                  backgroundColor: 'transparent',
                                  borderBottomWidth: 0,
                                  ...Platform.select({
                                          android: {
                                            marginTop: 24,
                                          },
                                        })
                                   },
                                 headerTintColor: '#000',
                                 headerTitleStyle: {
                                   fontWeight: '500',
                                  }
                           }
                        },
                        
                    }, {initialRouteName: 'Profile'});


      const ChoferNavigator = createStackNavigator({
                        Chofer:{
                            screen: ChoferScreen,
                            navigationOptions: {
                              header: props => <HeaderFX {...props} />,
                              headerTitle: (
                                      <View style={{flex: 1, alignItems: 'center'}}><Image style={{
                                                alignSelf: 'center',

                                                marginTop: -15,
                                                height: 80,
                                                width: 80
                                              }} 
                                              resizeMode="contain" 
                                              source={require('../../assets/logo_app.png')}/>
                                              </View>
                                  ),
                                 gesturesEnabled: true,
                                 headerTitleStyle: {flex: 1, textAlign: 'center'},
                                 headerStyle: {
                                   elevation: 0,
                                  backgroundColor: 'transparent',
                                  borderBottomWidth: 0,
                                  ...Platform.select({
                                          android: {
                                            marginTop: 24,
                                          },
                                        })
                                   },
                                 headerTintColor: '#fff',
                                 headerTitleStyle: {
                                   fontWeight: '200',
                                  }
                           }
                        },
                        
                    }, {initialRouteName: 'Chofer'});

      const QRNavigator = createStackNavigator({
                        QRNav:{
                            screen: QRScreen,
                            navigationOptions: {
                              header: props => <HeaderFX {...props} />,
                              headerTitle: (
                                      <View style={{flex: 1, alignItems: 'center'}}><Image style={{
                                                alignSelf: 'center',

                                                marginTop: -15,
                                                height: 80,
                                                width: 80
                                              }} 
                                              resizeMode="contain" 
                                              source={require('../../assets/logo_app.png')}/>
                                              </View>
                                  ),
                                 gesturesEnabled: true,
                                 headerTitleStyle: {flex: 1, textAlign: 'center'},
                                 headerStyle: {
                                   elevation: 0,
                                  backgroundColor: 'transparent',
                                  borderBottomWidth: 0,
                                  ...Platform.select({
                                          android: {
                                            marginTop: 24,
                                          },
                                        })
                                   },
                                 headerTintColor: '#fff',
                                 headerTitleStyle: {
                                   fontWeight: '200',
                                  }
                           }

                        }
                    }, {initialRouteName: 'QRNav'});

     const ViajesNavigator = createStackNavigator({
                        Viajes:{
                            screen: ViajesScreen,
                            navigationOptions: {
                              header: props => <HeaderFX {...props} />,
                              headerTitle: (
                                      <View style={{flex: 1, alignItems: 'center'}}><Image style={{
                                                alignSelf: 'center',

                                                marginTop: -15,
                                                height: 80,
                                                width: 80
                                              }} 
                                              resizeMode="contain" 
                                              source={require('../../assets/logo_app.png')}/>
                                              </View>
                                  ),
                                 gesturesEnabled: true,
                                 headerTitleStyle: {flex: 1, textAlign: 'center'},
                                 headerStyle: {
                                   elevation: 0,
                                  backgroundColor: 'transparent',
                                  borderBottomWidth: 0,
                                  ...Platform.select({
                                          android: {
                                            marginTop: 24,
                                          },
                                        })
                                   },
                                 headerTintColor: '#fff',
                                 headerTitleStyle: {
                                   fontWeight: '200',
                                  }
                           }

                        }
                    }, {initialRouteName: 'Viajes'});

     const ContactNavigator = createStackNavigator({
                        Contact:{
                            screen: ContactScreen,
                            navigationOptions: {
                              header: props => <HeaderFX {...props} />,
                              headerTitle: 'Contacto',
                                 gesturesEnabled: true,
                                 headerTitleStyle: {flex: 1, textAlign: 'center'},
                                 headerStyle: {
                                   elevation: 0,
                                  backgroundColor: 'transparent',
                                  borderBottomWidth: 0,
                                  ...Platform.select({
                                          android: {
                                            marginTop: 24,
                                          },
                                        })
                                   },
                                 headerTintColor: '#000',
                                 headerTitleStyle: {
                                   fontWeight: '500',
                                  }
                           }

                        }
                    }, {initialRouteName: 'Contact'});

     const AboutNavigator = createStackNavigator({
                        About:{
                            screen: AboutScreen,
                            navigationOptions: {
                              header: props => <HeaderFX {...props} />,
                              headerTitle: 'Acerca de la app',
                                 gesturesEnabled: true,
                                 headerTitleStyle: {flex: 1, textAlign: 'center'},
                                 headerStyle: {
                                   elevation: 0,
                                  backgroundColor: 'transparent',
                                  borderBottomWidth: 0,
                                  ...Platform.select({
                                          android: {
                                            marginTop: 24,
                                          },
                                        })
                                   },
                                 headerTintColor: '#000',
                                 headerTitleStyle: {
                                   fontWeight: '500',
                                  }
                           }

                        }
                    }, {initialRouteName: 'About'});

     const ProductsNavigator = createStackNavigator({
                        Products:{
                            screen: ProductsScreen,
                            navigationOptions: {
                              header: props => <HeaderFX {...props} />,
                              headerTitle: 'Products',
                                 gesturesEnabled: true,
                                 headerTitleStyle: {flex: 1, textAlign: 'center'},
                                 headerStyle: {
                                   elevation: 0,
                                  backgroundColor: 'transparent',
                                  borderBottomWidth: 0,
                                  ...Platform.select({
                                          android: {
                                            marginTop: 24,
                                          },
                                        })
                                   },
                                 headerTintColor: '#000',
                                 headerTitleStyle: {
                                   fontWeight: '500',
                                  }
                           }

                        },
                        ProductProfile:{
                            screen: ProductProfileScreen,
                            navigationOptions: {
                              header: props => <HeaderFX {...props} />,

                                 gesturesEnabled: true,
                                 headerTitleStyle: {flex: 1, textAlign: 'center'},
                                 headerStyle: {
                                   elevation: 0,
                                  backgroundColor: 'transparent',
                                  borderBottomWidth: 0,
                                  ...Platform.select({
                                          android: {
                                            marginTop: 24,
                                          },
                                        })
                                   },
                                 headerTintColor: '#000',
                                 headerTitleStyle: {
                                   fontWeight: '500',
                                  }
                           }

                        }
                    }, {initialRouteName: 'Products'});

        const TabNavigation = createDrawerNavigator({
            Home: {
             screen: HomeNavigator,
                 navigationOptions: {
                    drawerLabel: 'Ruta',
                    drawerIcon: ({ tintColor }) => (
                      <Icono name="ios-bus" size={25} color="#606498"/>
                    ),
                  }
             },
            QR: { 
              screen: QRNavigator,
              navigationOptions: {
                    drawerLabel: 'Código QR',
                    drawerIcon: ({ tintColor }) => (
                      <Icono name="ios-qr-scanner" size={25} color="#606498"/>
                    ),
                    
                  },
             },
            Profile: { 
              screen: ProfileNavigator,
              navigationOptions: {
                    drawerLabel: 'Profile',
                    drawerIcon: ({ tintColor }) => (
                      <Feather name="user" size={25} color="#606498"/>
                    ),
                  }
             },
             Products: { 
              screen: ProductsNavigator,
              navigationOptions: {
                    drawerLabel: 'Products',
                    drawerIcon: ({ tintColor }) => (
                      <Feather name="user" size={25} color="#606498"/>
                    ),
                  }
             },
             Chofer: { 
              screen: ChoferNavigator,
              navigationOptions: {
                    drawerLabel: 'Chofer',
                    drawerIcon: ({ tintColor }) => (
                      <Feather name="user" size={25} color="#606498"/>
                    ),
                  }
             },
            Viajes: {
              screen: ViajesNavigator,
              navigationOptions: {
                    drawerLabel: 'Viajes',
                    drawerIcon: ({ tintColor }) => (
                      <Feather name="user" size={25} color="#606498"/>
                    ),
                  }
            },
            Contact: {
              screen: ContactNavigator,
              navigationOptions: {
                    drawerLabel: 'Contact',
                    drawerIcon: ({ tintColor }) => (
                      <Feather name="user" size={25} color="#606498"/>
                    ),
                  }
            },
            About: {
              screen: AboutNavigator,
              navigationOptions: {
                    drawerLabel: 'About',
                    drawerIcon: ({ tintColor }) => (
                      <Feather name="user" size={25} color="#606498"/>
                    ),
                  }
            }
        },{
            contentComponent: DrawerBar,
            drawerType : "slide",
            overlayColor: 'transparent',
            contentOptions: {
                activeTintColor: '#606498',
                inactiveTintColor: '#606498',
                activeBackgroundColor: '#fdfdfd',
                itemsContainerStyle: {
                  marginVertical: 0,
                },
                labelStyle: {
                  fontSize: 16,
                  paddingLeft: 30
                },
                itemStyle: {
                  paddingLeft: 25,

                },
                iconContainerStyle: {
                  opacity: 1,
                  marginRight: -30,
                }
              },
            navigationOptions: {
                  
                   },
                 
        });
const MainNavigator = createAppContainer(TabNavigation);



type Props = { navigation: Function }

export default class SignedIn extends React.Component {
  
  constructor(props) {
      super(props);
      this.state = {
         open: false,
         new: null,
         isLoading: true
      }
      //this.isChofer = this._isBusiness.bind(this);

   }
   componentDidMount() {
    // console.log("signedIn: This props component mount", this.props)
    
     //console.log("De dónde viene?", this.props.navigation.state)

   }

    toggleOpen = () => {
      this.setState({ open: !this.state.open });
    };

    _toggleOpen = () => {
      this.setState({ open: true });
    };

    goTo = (section) => {
      /*this.props.navigation.navigate(NavigationActions.navigate({
          routeName: 'SignedIn',
          action: NavigationActions.navigate({ routeName: section })
      }))*/
     // console.log("Properties navigation", navigation)
    }

    _onLogout = () => {

          Remote.Auth().signOut().then(res => {
            //console.log("SIGNING OUT!", res)
            //console.log("properties of logout signed in", this.props)
                if(typeof this.props.screenProps !== 'undefined'){
                     // console.log("SCREEN PROPS DEFINED! USE THEM!!")
                      //this.props.screenProps.logOut();
                    } else {
                      //this.props.navigation.state.params.onLogout();
                      //console.log("SCREEN PROPS UNDEFINED! USE NAVIGATE STATE")
                    }
                   // console.log("this props logout", this.props)
          
              RNRestart.Restart();
          }).catch(err => {
              RNRestart.Restart();
          });

          
    }

    _isBusiness = async() => {

         return await(Remote.Auth().isBusiness());

          
    }

    render() {

        // return (
        //     <View style={styles.container}>
        //       <MainNavigator/>
        //     </View>
        // );

         return (
            <MainNavigator screenProps={{ rootUser: this.props.screenProps.rootUser, Remote: this.props.screenProps.Remote, onLogout: this._onLogout, toggleOpen: this._toggleOpen.bind(), isBusiness: this._isBusiness.bind() }}/>
           );
        
        
    }
}

module.exports = SignedIn;

