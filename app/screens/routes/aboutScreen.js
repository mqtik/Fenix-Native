import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, ActivityIndicator, View, Button, Alert, TouchableOpacity, Image, ImageBackground, ScrollView, StatusBar, SafeAreaView, Dimensions, ListView, Animated, TouchableHighlight, RefreshControl, findNodeHandle } from 'react-native';
import Icon from 'react-native-fa-icons';
import Icono from 'react-native-vector-icons/Ionicons';
import EntypoIcono from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable'


import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import _ from 'lodash'
import Toast, {DURATION} from 'react-native-easy-toast'
import { API_URL, PORT_API_DIRECT, PORT_API, DB_BOOKS, INDEX_NAME, LOCAL_DB_NAME, API_STATIC, SETTINGS_LOCAL_DB_NAME, LOCAL_DB_DRAFTS } from 'react-native-dotenv'
import LinearGradient from 'react-native-linear-gradient';
import uuid from 'react-native-uuid';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { human } from 'react-native-typography'

import { getLang, Languages } from '../../static/languages';

import Snackbar from 'react-native-snackbar';

import API from '../../services/api';

import { BlurView, VibrancyView } from "../../../libraries/blur";

import AwesomeButton from "react-native-really-awesome-button";

import FastImage from 'react-native-fast-image'
import {globalColors} from '../../styles/globals';

const Remote = new API({ url: API_URL })

var ancho = Dimensions.get('window').width; //full width
var alto = Dimensions.get('window').height; //full height

export default class AboutScreen extends Component<Props>{
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
        msg: null,
        sended: false,
        name: null
      }
   }

   componentDidMount(){
   }



  render(){
    return(
      <ScrollView style={{width: '100%', height: '100%',
       marginTop: 0, backgroundColor: '#fff'}}>
        <FastImage source={{uri: 'https://www.luxuvere.com/wp-content/uploads/2018/09/LuxExpose-Montblanc-Meisterst%C3%BCck-Le-Petit-Prince-1.jpg' }} 
                style={{backgroundColor: 'rgba(0,0,0,.4)',
                  width: '100%',
                  marginLeft: 0,
                  borderRadius: 0,
                  height: 250}}>
               </FastImage>
         
         <Text style={{padding:15, fontSize:18,color:'#999'}}>
          Lorem Ipsum Is Simply Dummy Text Of The 
          Printing. Lorem Ipsum is simply dummy text of 
          the printing and typesetting industry. Lorem 
          Ipsum has been the industry's standard dummy 
          text ever since the 1500s, when an unknown 
          printer took a galley of type and scrambled it 
          to make a type specimen book.
          Lorem Ipsum Is Simply Dummy Text Of The 
          Printing. Lorem Ipsum is simply dummy text of 
          the printing and typesetting industry. Lorem 
          Ipsum has been the industry's standard dum.
        </Text>

        <FastImage source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTkES7pr0PJMqlUXefzqk5bMRL6EpjZi-KPLQ&usqp=CAU' }} 
                style={{backgroundColor: 'rgba(0,0,0,.4)',
                  width: '100%',
                  marginLeft: 0,
                  borderRadius: 0,
                  height: 250}}>
               </FastImage>
      </ScrollView>
      );
  }
}

const styles = StyleSheet.create({

});