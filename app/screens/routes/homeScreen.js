import React, {Component} from 'react';
import {Platform, StyleSheet, AsyncStorage, Text, TextInput, View, FlatList, Button, Alert, TouchableOpacity, TouchableHighlight, Image, ImageBackground, ScrollView, StatusBar, SafeAreaView, ActivityIndicator, Dimensions, RefreshControl, Animated, Easing, Actions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-fa-icons';

import Icono from 'react-native-vector-icons/Ionicons';
import EntypoIcono from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NetInfo from 'react-native-netinfo'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import FA from 'react-native-vector-icons/FontAwesome';

import _ from 'lodash'
import Toast, {DURATION} from 'react-native-easy-toast'
import { API_URL, PORT_API_DIRECT, PORT_API, DB_BOOKS, INDEX_NAME, LOCAL_DB_NAME, API_STATIC, SETTINGS_LOCAL_DB_NAME, GOOGLE_API_KEY } from 'react-native-dotenv'
import LinearGradient from 'react-native-linear-gradient';
import { createBottomTabNavigator, createStackNavigator, createAppContainer, HeaderBackButton, NavigationActions, StackActions } from 'react-navigation';
import styles, { colors } from '../../styles/index.style';
import { mapStyle, mapNavigation } from '../../styles/map.style';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getLang, Languages } from '../../static/languages';
import {Column as Col, Row} from 'react-native-flexbox-grid';
import { human } from 'react-native-typography'
import MapViewDirections from 'react-native-maps-directions';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import FastImage from 'react-native-fast-image'
import Placeholder, { Line, Media } from "rn-placeholder";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import BottomDrawer from '../../../libraries/drawer';
import API from '../../services/api';
import HeaderFX from '../../components/header.js';

import { SliderBox } from "../../components/carouselImage";

import {globalColors} from '../../styles/globals';

import update from 'immutability-helper'


navigator.geolocation = require('@react-native-community/geolocation');

import { BlurView, VibrancyView } from "../../../libraries/blur";

//import { FluidNavigator, Transition } from 'react-navigation-fluid-transitions';
const Remote = new API({ url: API_URL })
//let ApplicationStorage = PouchDB(LOCAL_DB_NAME, {auto_compaction: true});

const TAB_BAR_HEIGHT = 49;
const USE_METHODS = false;
const IS_IOS = Platform.OS === 'ios';
const IS_ANDROID = Platform.OS === 'android';

import Modal from 'react-native-modalbox';
var ancho = Dimensions.get('window').width; //full width
var alto = Dimensions.get('window').height; //full height


export default class HomeScreen extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
          const { params = {} } = navigation.state;
          var value = null;
        return {
          headerBackTitle: null,
            headerLeft: (
               <View>
                 <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{height: 50, width: 50, padding: 13  }}>
                   <MaterialCommunityIcons name="menu" size={24} color={globalColors.primary}/>
                 </TouchableOpacity>
               </View>
              )
        };
      };
   constructor (props) {

        super(props);

        this.state = {
          products: null,
          images: null,
          recommendedProducts: null
        };
        this.props.navigation.setParams({ onToggle: this._toggleSideBar.bind() });

        
    }
    _toggleSideBar = () => {
      this.props.screenProps.toggleOpen();
    }
    componentDidMount(){
      //this._checkCurrentLocation();
      
/*e
    BackgroundGeolocation.on('location', (location) => {
      // handle your locations here
      // to perform long running operation on iOS
      // you need to create background task
      console.log("location!", location)
      BackgroundGeolocation.startTask(taskKey => {
        // execute long running task
        // eg. ajax post location
        // IMPORTANT: task has to be ended by endTask
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on('stationary', (stationaryLocation) => {
      // handle stationary locations here
      console.log("stationary!")
      //Actions.sendLocation(stationaryLocation);
    });

    BackgroundGeolocation.on('error', (error) => {
      console.log('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.on('start', () => {
      console.log('[INFO] BackgroundGeolocation service has been started');
    });

    BackgroundGeolocation.on('stop', () => {
      console.log('[INFO] BackgroundGeolocation service has been stopped');
    });

    BackgroundGeolocation.on('authorization', (status) => {
      console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(() =>
          Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
            { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
            { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
          ]), 1000);
      }
    });

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.on('abort_requested', () => {
      console.log('[INFO] Server responded with 285 Updates Not Required');

      // Here we can decide whether we want stop the updates or not.
      // If you've configured the server to return 285, then it means the server does not require further update.
      // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
      // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
    });

    BackgroundGeolocation.on('http_authorization', () => {
      console.log('[INFO] App needs to authorize the http requests');
    });

    BackgroundGeolocation.checkStatus(status => {
      console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
      console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
      console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

      // you don't need to check status before start (this is just the example)
      if (!status.isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });

    */
      // Create Index

       this.$products()
    }

    backgroundConfigure = () => {
      BackgroundGeolocation.configure({
        desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
        stationaryRadius: 50,
        distanceFilter: 50,
        notificationTitle: 'Background tracking',
        notificationText: 'enabled',
        debug: false,
        notificationsEnabled: false,
        startOnBoot: false,
        stopOnTerminate: true,
        locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
        interval: 10000,
        fastestInterval: 5000,
        activitiesInterval: 10000,
        stopOnStillActivity: false,
        url: 'http://192.168.81.15:3000/location',
        httpHeaders: {
          'X-FOO': 'bar'
        },
        // customize post properties
        postTemplate: {
          lat: '@latitude',
          lon: '@longitude',
          foo: 'bar' // you can also add your own properties
        }
      });
    }
    $init = async() => {
      //let bool = await Remote.Auth().checkIfLoggedIn();
      let res = await Remote.Business().list();

      this.setState({businessList: res.data, loadBusiness: true, markers: [...markers], isLoading: true})
    }


  goProduct = (params) => {
    console.log("go product!", params, this.props)
    this.props.navigation.navigate('ProductProfile',{
                                        id: params.id,
                                        title: params.title
                                      });
  }

  $products = async(page) => {
    let f = await(this.props.screenProps.Remote.Products().list({page:page}));

    let recProds = null;
    if(this.state.images == null && f && f.data && f.data[0]){
      recProds = [f.data[0], f.data[1]];
    }
    this.setState((prevState) => update(prevState, { 
                    products: { 
                       $set: f.data
                    },
                    recommendedProducts: {
                      $set: recProds
                    }
                 }));
  }

  componentWillUnmount() {
   // BackgroundGeolocation.removeAllListeners();
  }

  _checkCurrentLocation = () => {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      let homeMarkerVar = { 
                  id: 'Home', 
                  title: 'Mi casa', 
                  description: 'Chacabuco 1880', 
                  coordinate: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                  }
                };
      let homeVar = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }

      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      }
      this.setState({currentLocation: homeVar, currentMarker: homeVar, currentMarker: homeMarkerVar })
      console.log("location!", region)
     // this.setState({origin: {latitude: position.coords.latitude, longitude: position.coords.longitude}})
     // this.onRegionChange(region, region.latitude, region.longitude);
    }, (error)=>console.log(error));
  }

    
    _onRefresh = () => {
      this.setState({refreshing: true});
    }

    _renderPerProduct = (item) => {
      return (
        <TouchableOpacity onPress={() => this.goProduct({ id: item.id, title: item.name})} style={styles.product}>
          <View>
            {item.hero_image && item.hero_image.medium &&
              <FastImage source={{uri: encodeURI(item.hero_image.medium) }} 
                style={{backgroundColor: 'rgba(0,0,0,.4)',
                  width: 197,
                  marginLeft: 0,
                  borderRadius: 10,
                  borderBottomLeftRadius:0,
                  borderBottomRightRadius:0,
                  height: 140}}>
               </FastImage>
            }
          </View>
          <View  style={styles.productInfo}>
           <Text numberOfLines={1} style={styles.textTitle}>{item.name}</Text>
            { (item.price && item.currency && item.currency.symbol) && 
              <View>
              <Text style={styles.textPrice}>{item.currency.symbol} {item.price}</Text>
            </View>
            }
          </View>
        </TouchableOpacity>
        )
    }

    productRec = (product) => {
      return (
        <TouchableOpacity style={{width:300, height:335, marginRight: 10,borderRadius:10, borderWidth: 1, borderColor: '#eaeaea'}}>
        

         {product.hero_image.medium != null && <FastImage source={{uri: encodeURI(product.hero_image.medium) }} 
                style={{backgroundColor: 'rgba(0,0,0,.4)',
                  width: '100%',
                  marginLeft: 0,
                  borderRadius: 10,
                  borderBottomLeftRadius:0,
                  borderBottomRightRadius:0,
                  height: 250}}>
               </FastImage>}
          <View style={{width:'100%',flexDirection: 'row', height: 50,justifyContent: 'space-between', backgroundColor: '#fff'}}>
                  <View style={{paddingLeft:15, maxWidth:210}} >
                    <Text  numberOfLines={1} style={[styles.textTitle, {marginTop:10, fontSize:22}]}>{product && product.name}</Text>
                    <Text style={[styles.textPrice, {paddingTop:3}]}>{product.currency.symbol} {product.price}</Text>
                  </View>

                  <TouchableOpacity style={[styles.verMasButton,{marginTop:10}]}>
                    <Text style={{color: '#fff', fontSize:15, fontWeight: '500'}}>Ver más</Text>
                  </TouchableOpacity>
          </View>

        </TouchableOpacity>
        )
    }
    render () {
        return (
                <ScrollView style={styles.container}>
                  <Text style={styles.textLastProducts}>Últimos productos</Text>


                  <FlatList
                    data={this.state.products}
                    initialNumToRender={3}
                    horizontal={true}
                    //ListFooterComponent={() => this.productRec()}
                    maxToRenderPerBatch={3}
                    updateCellsBatchingPeriod={1000}
                    //removeClippedSubviews={true}
                    contentContainerStyle={{marginLeft: 5,backgroundColor: 'transparent',height:220}}
                    style={{backgroundColor: 'transparent',height:220}}
                    renderItem={({ item, index }) => this._renderPerProduct(item, index)}
                    keyExtractor={item => item.id.toString()}
                  />




                  <Text style={styles.textLastProducts}>Productos recomendados</Text>
                  <FlatList
                    data={this.state.recommendedProducts}
                    initialNumToRender={3}
                    horizontal={true}
                    //ListFooterComponent={() => this.productRec()}
                    maxToRenderPerBatch={3}
                    updateCellsBatchingPeriod={1000}
                    //removeClippedSubviews={true}
                    contentContainerStyle={{marginLeft: 15,backgroundColor: 'transparent',height:400, paddingRight:20}}
                    style={{backgroundColor: 'transparent',height:400}}
                    renderItem={({ item, index }) => this.productRec(item, index)}
                    keyExtractor={item => item.id.toString()}
                  />


                </ScrollView>
        );
    
    }  
}

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
};