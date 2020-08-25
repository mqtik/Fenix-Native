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

import {globalColors} from '../../styles/globals';

const Remote = new API({ url: API_URL })

var ancho = Dimensions.get('window').width; //full width
var alto = Dimensions.get('window').height; //full height

export default class ContactoScreen extends Component<Props>{
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
     if (this.view !== undefined && this.view !== null) {
        this.view.fadeIn(500);
      }
    this.$contact();
   }

   $contact = async() => {
    let k = await(Remote.Auth().getMeOffline());

    this.setState({
      name: k.name
    })
      console.log("my profile!", k)
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

  _onSend = async() => {
    let f = await(Remote.Auth().contactHakuna(this.state.msg));
    console.log("RESPONSEOF CONTACT", f)


    this.setState({sended: true});
    return;
  }
  _onSended = () => {
    return (
      <Animatable.View
          ref={ref => (this.view = ref)}
          animation="fadeIn"
          style={{justifyContent:'center', alignItems:'center'}}
          easing="ease-in">
            <View style={{margin: 30, marginBottom: 30}}>
              <Text style={[human.headline, {textAlign: 'center', color: '#666'}]}>Gracias!{"\n"}Tu mensaje ha sido enviado{"\n"}correctamente</Text>
            </View>
            
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' ,backgroundColor: globalColors.secondary, height: 100, justifyContent:'center',alignItems: 'center', width: 100,borderRadius:100}}>

                  <MaterialCommunityIcons name="check" size={48} color={'#fff'}/>
              </Animatable.View>
          </Animatable.View>
      );
  }
  _onContactContainer = () => {
    return (
      <View>

        <View style={{margin: 30, marginBottom: 0}}>
          <Text style={human.headline}>Hola {this.props.screenProps.rootUser.name}, {"\n"}Quieres enviar una sugerencia?</Text>
        </View>
        <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Escríbe un mensaje"
               placeholderTextColor = "#666"
               autoCapitalize = "none"
               onChangeText={(text) => this.setState({msg: text})}/>

               

                <AwesomeButton
                    progress
                    onPress={async(next) => {
                      /** Do Something **/
                      await(this._onSend());
                      next();
                    }}
                    width={352}
                    style={{alignSelf: 'center', justifyContent: 'center', marginTop: 10}}
                    alignSelf={'center'}
                    raiseLevel={0}
                    backgroundShadow={'#fff'}
                    borderWidth={2}
                    height={50}
                    borderRadius={28}
                    backgroundColor={globalColors.primary}
                    borderColor={globalColors.primary}
                    textSize={17}
                  >
                   Enviar Mensaje
                  </AwesomeButton>

                  <View style={{padding:15,marginTop:15}}>
                    <Text style={{fontSize:20,marginBottom:20,color:'#555'}}>
                      Cómo encontrarnos
                    </Text>

                    <Text style={styles.contactText}>
                      <Text style={{fontWeight:'bold'}}>Dirección:</Text> Boulevard Galvez 1033, Santa Fe, Argentina
                    </Text>
                    <Text style={styles.contactText}>
                      <Text style={{fontWeight:'bold'}}>Teléfono:</Text> +549 342 536 8666
                    </Text>
                    <Text style={styles.contactText}>
                      <Text style={{fontWeight:'bold'}}>Sitio web:</Text> www.keetup.com
                    </Text>
                  </View>
       </View>
      );
  }

  render(){
    return(
      <ScrollView style={{width: '100%', height: '100%',
       marginTop: -80, backgroundColor: '#fff'}}>
        <View style={{marginTop: 100}}>
          {this.state.sended == false && this._onContactContainer()}
          {this.state.sended == true && this._onSended()}
         </View>
         
      </ScrollView>
      );
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
  },
  saveButton: {
      alignSelf: 'center', 
      borderRadius: 28, 
      borderWidth: 2, 
      borderColor: '#1E888A', 
      margin: 10, 
      height: 50, 
      backgroundColor: '#08B8B8', 
      width: '80%'
    },
    saveButtonText: {
      color: '#fff', 
      justifyContent: 'center', 
      alignSelf: 'center', 
      margin: 13, 
      fontSize: 18
    },
    input: {
      margin: 0,
      height: 145,
      borderColor: '#EEEEEE',
      borderBottomWidth: 1,
      backgroundColor: 'rgba(255,255,255,.2)',
      alignSelf: 'center',
      width: ancho - 30,
      padding: 10,
      borderRadius: 10,
      fontSize: 16
   },
   contactText:{
    fontSize:17,
    paddingTop:5,
    color:'#888'
   }
});