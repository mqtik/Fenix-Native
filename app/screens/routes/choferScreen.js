import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, ActivityIndicator, View, Button, Alert, TouchableOpacity, TouchableHighlight, Image, ImageBackground, ScrollView, StatusBar, SafeAreaView } from 'react-native';

// Icons
import FontAwesome from 'react-native-fa-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EntypoIcono from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FA5 from 'react-native-vector-icons/FontAwesome5';

import Toast, {DURATION} from 'react-native-easy-toast'
import { API_URL, PORT_API_DIRECT, PORT_API, DB_BOOKS, INDEX_NAME, LOCAL_DB_NAME, API_STATIC, SETTINGS_LOCAL_DB_NAME } from 'react-native-dotenv'
import LinearGradient from 'react-native-linear-gradient';

import { StackActions, NavigationActions } from 'react-navigation';
import { getLang, Languages } from '../../static/languages';

import moment from "moment/min/moment-with-locales";
import { human } from 'react-native-typography'
import {Column as Col, Row} from 'react-native-flexbox-grid';
import _ from 'lodash'
import PhoneInput from 'react-native-phone-input'

import API from '../../services/api';

// Styles
import styles from '../../styles/profileStyle';
const Remote = new API({ url: API_URL });

export default class ChoferScreen extends Component<Props>{
    static navigationOptions = ({ navigation }) => {
          const { params = {} } = navigation.state;
          var value = null;
          // viajes: navigation.navigate('Viajes')
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
        editMode: false,
        nombre: null,
        apellidoPaterno: null,
        apellidoMaterno: null,
        phone: null,
        direccion: null,
        genero: null,
        misHijos: null,
        adultosConfianza: null
	    };
	    //console.log("this props settings", this.props)
	    
	  }
	  componentDidMount() {
      Remote.Auth().rmNew().then(res=>{
        console.log("removing rm new", res)
      }).catch(err => {
        console.log("rm new ", err)
      });
	  }
    _onSave = () => {
      this.setState({editMode: false})
    }
	  render(){
        return(
          <ScrollView style={{width: '100%', marginTop: -80, backgroundColor: '#fff'}}>

            {/* Header  */}

              <View style={{marginTop: 100}}>
                <TouchableOpacity
                style={{justifyContent: 'center', width: 100, height: 100, backgroundColor: '#EEEEEE', borderRadius: 100, alignSelf: 'center'}}
                onPress={() => this.setState({editMode: true})}
                >
                  <Image
                                      style={{
                                          alignSelf: 'center',
                                          marginTop: -10,
                                        }}            
                                        source={require('../../../assets/choose_avatar.png')}
                                    />
                   <MaterialCommunityIcons name="pencil" size={25} color="#08B8B8"
                   style={{position: 'absolute', top:80, right: -10}}/>
                </TouchableOpacity>
              </View>
              <View style={{width: '100%', alignItems: 'center', marginTop: 30}}>
                 <Text style={[human.headline, {color: '#4F4F4F'}]}>DATOS DEL CHOFER</Text>
                 <MaterialCommunityIcons name="pencil" size={25} color="#08B8B8"
                   style={{position: 'absolute', top:0, right: 20}}/>
              </View>

            {/* Profile content */}


              <View>
                <Text style={[human.caption, {color: '#C4C4C4', marginTop: 15, marginLeft: 15}]}>
                  Nombre
                </Text>
                <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = ""
               placeholderTextColor = "#A2AAAD"
               //autoCapitalize = "none"
               editable={this.state.editMode} 
               selectTextOnFocus={this.state.editMode}
               style={[styles.input, {borderBottomWidth: this.state.editMode == true ? 1 : 0}]}
               value={this.state.nombre}
               onChangeText={(text) => this.setState({nombre: text})}/>

               <Text style={[human.caption, {color: '#C4C4C4', marginTop: 15, marginLeft: 15}]}>
                  Apellido Paterno
                </Text>
                <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = ""
               placeholderTextColor = "#A2AAAD"
               //autoCapitalize = "none"
               editable={this.state.editMode} 
               selectTextOnFocus={this.state.editMode}
               style={[styles.input, {borderBottomWidth: this.state.editMode == true ? 1 : 0}]}
               value={this.state.apellidoPaterno}
               onChangeText={(text) => this.setState({apellidoPaterno: text})}/>

               <Text style={[human.caption, {color: '#C4C4C4', marginTop: 15, marginLeft: 15}]}>
                  Apellido Materno
                </Text>
                <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = ""
               placeholderTextColor = "#A2AAAD"
               //autoCapitalize = "none"
               editable={this.state.editMode} 
               selectTextOnFocus={this.state.editMode}
               style={[styles.input, {borderBottomWidth: this.state.editMode == true ? 1 : 0}]}
               value={this.state.apellidoMaterno}
               onChangeText={(text) => this.setState({apellidoMaterno: text})}/>



               <Text style={[human.caption, {color: '#C4C4C4', marginTop: 15, marginLeft: 15}]}>
                  Celular
                </Text>
               <PhoneInput style={{marginLeft: 10, marginRight: 10, padding: 20, width: '100%', borderBottomWidth: this.state.editMode == true ? 1 : 0, borderColor: '#EEEEEE'}} ref='phone'/>
              

              <Text style={[human.caption, {color: '#C4C4C4', marginTop: 15, marginLeft: 15}]}>
                  Dirección
                </Text>
                <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = ""
               placeholderTextColor = "#A2AAAD"
               //autoCapitalize = "none"
               editable={this.state.editMode} 
               selectTextOnFocus={this.state.editMode}
               style={[styles.input, {borderBottomWidth: this.state.editMode == true ? 1 : 0}]}
               value={this.state.direccion}
               onChangeText={(text) => this.setState({direccion: text})}/>

               <Text style={[human.caption, {color: '#C4C4C4', marginTop: 15, marginLeft: 15}]}>
                  ¿Eres mamá o papá?
                </Text>

                <View style={{padding: 20}}>
                  <Ionicons name="ios-male" size={25} color="#828282"
                     style={{position: 'relative', left: 0}}/>
                  <Ionicons name="ios-female" size={25} color="#828282"
                     style={{position: 'relative', left: 50, top: -25}}/>
                 </View>

              </View>




              {
                this.state.editMode == true &&
                <TouchableHighlight 
                     style={styles.saveButton}
                     onPress={() => this._onSave()}>
                     <Text style={styles.saveButtonText}>Guardar datos</Text>
                 </TouchableHighlight>
              }
              
          </ScrollView>
        );
    }

}