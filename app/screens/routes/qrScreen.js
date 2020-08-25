import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, ActivityIndicator, View, Button, Alert, TouchableOpacity, Image, ImageBackground, ScrollView, StatusBar, SafeAreaView, Dimensions, ListView, Animated, TouchableHighlight, RefreshControl, findNodeHandle } from 'react-native';
import Icon from 'react-native-fa-icons';
import Icono from 'react-native-vector-icons/Ionicons';
import EntypoIcono from 'react-native-vector-icons/Entypo';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



import QRCodeScanner from 'react-native-qrcode-scanner';

import _ from 'lodash'
import Toast, {DURATION} from 'react-native-easy-toast'
import { API_URL, PORT_API_DIRECT, PORT_API, DB_BOOKS, INDEX_NAME, LOCAL_DB_NAME, API_STATIC, SETTINGS_LOCAL_DB_NAME, LOCAL_DB_DRAFTS } from 'react-native-dotenv'
import LinearGradient from 'react-native-linear-gradient';
import uuid from 'react-native-uuid';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { human } from 'react-native-typography'

import { getLang, Languages } from '../../static/languages';

import API from '../../services/api';

import { BlurView, VibrancyView } from "../../../libraries/blur";

const Remote = new API({ url: API_URL })

var ancho = Dimensions.get('window').width; //full width
var alto = Dimensions.get('window').height; //full height

export default class QRScreen extends Component<Props>{
    static navigationOptions = ({ navigation }) => {
          const { params = {} } = navigation.state;
          var value = null;
        return {
            headerLeft: (
               <View>
                 <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{height: 50, width: 50, padding: 13  }}>
                   <SimpleLineIcons name="menu" size={24} color="#606498"/>
                 </TouchableOpacity>
               </View>
              ),
            headerRight: (
               <View>
                 <TouchableOpacity onPress={() => console.log("viajes")} style={{height: 50, width: 40, marginTop: 18, alignSelf: 'flex-end'}}>
                   <MaterialCommunityIcons name="bell-outline" size={28} color="#606498"/>
                 </TouchableOpacity>
               </View>
              )
        };
      };
    constructor(props) {
      super(props);
      this.state = {
        text: 'keetup-hakuna',
        viewRef: null,
      }
   }

   componentDidMount(){
     this.setState({ viewRef: findNodeHandle(this.viewRef) });
   }

   onViewLoaded() {
    
  }

  onSuccess = (e) => {
    if(e.data){
      alert("Scanned!"+e.data);
    }
    console.log(e)
    setTimeout(() => {
      this.scanner.reactivate();
    }, 5000);
    
  }

  _renderIOS = () => {
    return (
        <BlurView
        blurType="light"
                          blurAmount={10}
                          blurRadius={15}
                          downsampleFactor={10}
                style={{
                                
                                height: 100,
                                width: '100%',
                                alignSelf: 'center',
                                top: 0,
                                left: 0,
                                right: 0,
                                backgroundColor: 'rgba(255,255,255,.4)'
                              }}
              >


                <View style={{position: 'absolute', width: '100%', justifyContent: 'center', alignItems: 'center', top: 10, padding: 20, zIndex: 9,}}>
                        <Text style={[human.body, {textAlign: 'center', color: 'rgba(255,255,255,.5)'}]}>Scan QR {"\n"} para empezar viaje</Text>
                      </View>
                
              </BlurView>
                   
      )
  }

    _renderAndroid = () => {
    return (
        <View
                style={{
                                
                                height: 100,
                                width: '100%',
                                alignSelf: 'center',
                                top: 0,
                                left: 0,
                                right: 0,
                                backgroundColor: 'rgba(255,255,255,.4)'
                              }}
              >


                <View style={{position: 'absolute', width: '100%', justifyContent: 'center', alignItems: 'center', top: 10, padding: 20, zIndex: 9,}}>
                        <Text style={[human.body, {textAlign: 'center', color: 'rgba(0,0,0,.5)'}]}>Scan QR {"\n"} para empezar viaje</Text>
                      </View>
              </View>
      )
  }

  render(){
    if(Remote.Auth().isChofer() == true){
      return (
        <View style={{flex: 1, marginTop: -100, backgroundColor: '#fff'}}>
          <QRCodeScanner
            ref={(node) => { this.scanner = node }}
            onRead={this.onSuccess}
            
            bottomContent={
              
              <View style={{position: 'absolute', bottom: -100, width: '100%', height: 200}}

                ref={(viewRef) => { this.viewRef = viewRef; }} >
                {Platform.OS == 'ios' && this._renderIOS()}
                {Platform.OS == 'android' && this._renderAndroid()}
              
                
              </View>
            }
            cameraStyle={{overflow: 'hidden', height: alto + 4}}
          />
          </View>
        );
    } else {
        return(
          <ScrollView style={{flex: 1, marginTop: -80, backgroundColor: '#fff'}}>
              <View style={{flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center', marginTop: 150}}>
                  {/*<QRCode
                      value={this.state.text}
                      size={300}
                      bgColor='black'
                      fgColor='white'
                      />*/}

            </View>
          </ScrollView>
        );
      }
      
    }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
    marginTop: 40
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});