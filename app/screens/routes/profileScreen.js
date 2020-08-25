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
import Snackbar from 'react-native-snackbar';

import PhotoUpload from '../../components/ph_upload.js'

import { StackActions, NavigationActions } from 'react-navigation';
import { getLang, Languages } from '../../static/languages';

import moment from "moment/min/moment-with-locales";
import { human } from 'react-native-typography'
import {Column as Col, Row} from 'react-native-flexbox-grid';
import _ from 'lodash'
import PhoneInput from 'react-native-phone-input'

import API from '../../services/api';

import AwesomeButton from "react-native-really-awesome-button";

import FastImage from 'react-native-fast-image'

// Styles
import styles from '../../styles/profileStyle';
const Remote = new API({ url: API_URL });

export default class ProfileScreen extends Component<Props>{
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
      console.log("constructor props!", props.screenProps)
	    this.state = {
        editMode: false,
        nombre: props.screenProps.rootUser.name,
        apellidoPaterno: props.screenProps.rootUser.father_lastname,
        apellidoMaterno: props.screenProps.rootUser.mother_lastname,
        user: props.screenProps.rootUser,
        phone: null,
        direccion: null,
        genero: null,
        misHijos: null,
        adultosConfianza: null,
        open_picker: false,
        isLoading: true,
        avatar: props.screenProps.rootUser.avatar,
        avatarEdit: false
	    };
	    //console.log("this props settings", this.props)
	    
	  }
	  componentDidMount() {
    // this.$profile();
	  }

    $profile = async() => {
      //let rm = await Remote.Auth().rmNew();
      let k = await(Remote.Auth().getMeOffline());
      console.log("my profile!", this.props)
      this.setState({
        user: k,
        nombre: k.name,
        apellidoPaterno: k.father_lastname,
        apellidoMaterno: k.mother_lastname,
        avatar: k.avatar != null && k.avatar,
        isLoading: false
      })

      console.log("This state profile", this.state)
    }
    _onSave = async() => {
      let p = await(Remote.Auth().saveProfile(this.state));
      this.setState({editMode: false})
    }
	  render(){
        return (
          <ScrollView style={{width: '100%', marginTop: -80, backgroundColor: '#fff'}}>


              <View style={{marginTop: 100}}>
              { this.state.open_picker == false &&
                <TouchableOpacity
                style={{justifyContent: 'center', width: 100, height: 100, backgroundColor: '#EEEEEE', borderRadius: 100, alignSelf: 'center'}}
                onPress={() => this._photo.openImagePicker()}

                >

                { this.state.avatar != null && 
                  <FastImage
                     style={{
                        alignSelf: 'center',  
                         height: 100,
                         width: 100,
                         borderRadius: 50
                       }}            
                      source={{uri: this.state.avatar}}
                    />
                }

                { this.state.avatar == null && 
                  <FastImage
                     style={{
                        alignSelf: 'center',
                         marginTop: -10,
                       }}            
                      source={require('../../../assets/choose_avatar.png')}
                    />
                }

                   <MaterialCommunityIcons name="pencil" size={25} color="#08B8B8"
                   style={{position: 'absolute', top:80, right: -10}}/>
                </TouchableOpacity>
              }
              <PhotoUpload
                   ref={component => this._photo = component}
                   onResizedImageUri={uri => {
                     //this.setState({open_picker: false})
                     //Snackbar.show({ title: 'Subiendo imagen de perfil...', duration: 2000 })
                   }}
                   onResponse={() => {
                     //Snackbar.show({ title: 'Subiendo imagen de perfil...', duration: 5000 })
                   }}
                   onPhotoSelect={avatar => {
                     if (avatar) {

                      this.setState({
                        avatar: avatar,
                        avatarEdit: true,
                        editMode: true
                      })

                      console.log("imagen selectt!", this.state)
                       //console.log('Image base64 string: ', avatar)
                       Snackbar.show({ title: 'Tu imagen de perfil se ha cambiado. Guarda los cambios para que tome efecto.', duration: 5000 })
                       this.setState({open_picker: true})
                     }
                   }}
                   containerStyle={{ flex: 0 }}
                   style={{justifyContent: 'center', width: 100, height: 100, backgroundColor: '#EEEEEE'}}
                 >
                   <Image
                     style={{
                       paddingVertical: 30,
                       width: this.state.open_picker === true ? 150 : 1,
                       height: this.state.open_picker === true ? 150 : 1,
                       borderRadius: 75,
                       
                     }}
                     
                     source={require('../../../assets/choose_avatar.png')}
                   />
                   
                 </PhotoUpload>
                
              </View>
              <View style={{width: '100%', alignItems: 'center', marginTop: 30}}>
                 <Text style={[human.headline, {color: '#4F4F4F'}]}>MIS DATOS PERSONALES</Text>
                 <TouchableOpacity style={{position: 'absolute', width: 30, height: 30, top:0, right: 20}} onPress={() => this.setState({editMode: true})}>
                   <MaterialCommunityIcons name="pencil" size={25} color="#08B8B8"
                   />
                  </TouchableOpacity>
              </View>



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
               value={this.state.user.name}
               onChangeText={(text) => this.setState({
                                            user: {
                                              ...this.state.user,
                                              name: text
                                            }
                                          })}/>

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
               value={this.state.user.father_lastname}
               onChangeText={(text) => this.setState({
                                            user: {
                                              ...this.state.user,
                                              father_lastname: text
                                            }
                                          }) }/>

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
               value={this.state.user.mother_lastname}
               onChangeText={(text) => this.setState({
                                            user: {
                                              ...this.state.user,
                                              mother_lastname: text
                                            }
                                          }) }/>



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
                  {this.state.user.type == '1' && 'Soy papá'}
                  {this.state.user.type == '2' && 'Soy mamá'}
                  {this.state.user.type == null && 'Eres padre o madre?'}
                </Text>

                <View style={{padding: 20}}>
                <TouchableOpacity onPress={() => this.setState({
                                            user: {
                                              ...this.state.user,
                                              type: 1
                                            }
                                          }) }>
                  <Ionicons name="ios-male" size={25} color={this.state.user.type == '1' ? "#000": "#828282"}
                     style={{position: 'relative', left: 0}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({
                                            user: {
                                              ...this.state.user,
                                              type: 2
                                            }
                                          })}>
                  <Ionicons name="ios-female" size={25} color={this.state.user.type == '2' ? "#000": "#828282"}
                     style={{position: 'relative', left: 50, top: -25}}/>
                </TouchableOpacity>
                


               </View>
                

              </View>

              <View style={{width: '100%', alignItems: 'center', marginTop: 30}}>
                 <Text style={[human.headline, {color: '#4F4F4F'}]}>DATOS DE MIS HIJOS</Text>
              </View>
              <Text style={[human.caption, {color: '#C4C4C4', marginTop: 15, marginLeft: 15}]}>
                  No tenés ningún hijo registrado todavía
                </Text>
                
                <TouchableOpacity>

                       <Ionicons name="ios-female" size={25} color={"#000"}/>
                      <Text>Añade un hijo</Text>
               </TouchableOpacity>


              {
                this.state.editMode == true &&
                 <AwesomeButton
                    progress
                    onPress={async(next) => {
                      /** Do Something **/
                      await(this._onSave());
                      next();
                    }}
                    width={340}
                    style={{alignSelf: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10}}
                    alignSelf={'center'}
                    raiseLevel={0}
                    backgroundShadow={'#fff'}
                    borderWidth={2}
                    height={45}
                    borderRadius={28}
                    backgroundColor={'#08B8B8'}
                    borderColor={'#1E888A'}
                    textSize={17}
                  >
                    Guardar datos
                  </AwesomeButton>
              }
              
          </ScrollView>
        );
    
  }

}