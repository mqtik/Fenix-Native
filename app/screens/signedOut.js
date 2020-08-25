/**
 * Signed Out Component
 * Login & Register
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, StatusBar, TouchableHighlight, TextInput, View, Button, Alert, TouchableOpacity, Image, ImageBackground, ActivityIndicator, Dimensions, findNodeHandle } from 'react-native';
import Icon from 'react-native-fa-icons';

import Icono from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PouchDB from 'pouchdb-react-native'
import APIUpsert from 'pouchdb-upsert'
import Toast, {DURATION} from 'react-native-easy-toast'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { createStackNavigator, createAppContainer, NavigationActions, StackActions } from 'react-navigation';
import { API_URL, PORT_API_DIRECT, PORT_API, SETTINGS_LOCAL_DB_NAME, DB_BOOKS, LOCAL_DB_NAME } from 'react-native-dotenv'
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';
import Snackbar from 'react-native-snackbar';
import { getLang, Languages } from '../static/languages';
import RNRestart from 'react-native-restart';
import { human } from 'react-native-typography'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import API from '../services/api';
import {Column as Col, Row} from 'react-native-flexbox-grid';
import Modal from "react-native-modal";
import AwesomeButton from "react-native-really-awesome-button";
import update from 'immutability-helper'
 

PouchDB.plugin(APIUpsert);

const Remote = new API({ url: API_URL })
let MCloud = PouchDB(LOCAL_DB_NAME, {auto_compaction: true});

let ancho = Dimensions.get('window').width; //full width
let alto = Dimensions.get('window').height; //full height

type Props = { navigation: Function }

const slides = [
                  {
                    key: 'somethun',
                    title: 'Visualiza tus productos',
                    text: 'Puedes acceder al listado de tus productos, estés donde estés',
                    icon: 'md-briefcase-outline',
                    colors: ['#63E2FF', '#B066FE'],
                  },
                  {
                    key: 'somethun1',
                    title: 'Accede a los pedidos',
                    text: 'Visualiza los pedidos pasados y los pedidos pendientes, desde un solo lugar',
                    icon: 'md-business-sharp',
                    colors: ['#A3A1FF', '#3A3897'],
                  },
                  {
                    key: 'somethun2',
                    title: 'Contacta a las empresas',
                    text: 'Mantén el contacto directo con las empresas de tus productos favoritos',
                    icon: 'md-list-outline',
                    colors: ['#29ABE2', '#4F00BC'],
                  },
                ];

export default class SignedOut extends Component<Props> {
  constructor() {
      super()
      this.state = {
         introText: '',
         username: 'm@keetup.com',
         password: '24230112',
         auth: null,
         placeholder: Languages.Username[getLang()],
         showPassword: false,
         color: 'red',
         exist: 'false',

         first_name: 'Matute',
         email: 'mfork@keetup.com',

         last_name: null,
         isLoading: true,
         statusTab: 'login',
         isOpen: false,
         buttonState: 'upload',
         heightContainer: 290,

         sliderIndex: 0,
         currentView: 'slides'
      }
      

   }


   componentDidMount() {
      // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
       this.setState({isLoading: false})
    }
            
   _onLogout = () => {
     console.log("SignedOut _onLogout()")
     Remote.Auth().signOut().then(res => {
            console.log("SIGNING OUT!", res)
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
          });
   }
   onContinueAs = () => {
        
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'SignedIn', params: {
                          onLogout: this._onLogout,
                          user: this.state.username,
                          register: false
                        } })],
        });
      this.props.navigation.dispatch(resetAction);
   }
   onRegisterAs = () => {
        
       /* const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'SignedIn', params: {
                          onLogout: this._onLogout,
                          user: this.state.username,
                          register: true
                        } })],
        });
      this.props.navigation.dispatch(resetAction);*/
    
                         MCloud.upsert('CheckRegister', {isNew: true}).then(res => {
        // success, res is {rev: '1-xxx', updated: true, id: 'myDocId'}
                          console.log("updated doc register", res)
                                         
                        }).catch(err => {
                          // error
                          console.log("otro err", err)
                        });
                         /* this.props.navigation.navigate('SignedIn', {
                                register: true
                              })*/
         const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'SignedIn', params: {
                          onLogout: this._onLogout,
                          register: true
                        } })],
        });
      this.props.navigation.dispatch(resetAction);
                     
      /*ApplicationStorage.upsert('UserData', doc => {

                     this.isNew = true;
                     this.updated =true;
                    }).then(res=> {
                       console.log("updated doc register", res)
                       ApplicationStorage.get('UserData').then(user => {
                         console.log("User data!", user)
                       }).catch(err => {
                         console.log("err!", err)
                       })
                    }).catch(err => {
                      console.log("error on doc register", err)
                    });*/
     
   }

   onNext = () => {
      this.setState({introText: 'text'})
   }
   _renderItem = props => (
      <View
        style={[styles.mainContent, {
          width: props.width,
          height: 300,
        }]}
      >
        <View style={{marginTop: -100,width:250,height:250,backgroundColor: '#ccc', borderRadius: 200, justifyContent: 'center', alignItems: 'center'}}>
          <Ionicons style={{ backgroundColor: 'transparent' }} name={props.icon} size={150} color="#000" />
        </View>
        <View style={{marginTop: -250}}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.text}>{props.text}</Text>
        </View>
       
      </View>
  );
   _onPress = () => {
     


   }
   _onLogin = async() => {

    /*Snackbar.show({
            title: 'Please agree to this.',
            duration: Snackbar.LENGTH_INDEFINITE,
            action: {
              title: 'AGREE',
              onPress: () => Snackbar.show({ title: 'Thank you!' }),
              color: 'green',
            },
          })*/
     Snackbar.show({ title: 'Signing you in...' })
     
     // Sign in: It will return an access token that you must set in the following functions.
     let sgn = await Remote.Auth().signIn(this.state.username, this.state.password).catch(e => e);



       if(sgn.error != null){
        Snackbar.show({ title: sgn.message });
       }
       if(sgn.code == 422 || sgn.code == 500 || sgn.code == 403 || sgn.code == 404){
        Snackbar.show({ title: sgn.message });

       // return;
       }

       if(sgn.token_type == 'Bearer' && sgn.expires_in != null && sgn.access_token != null){

         let stk = await Remote.Auth().setAccessToken(sgn).catch(e => null);
         // Set access token in the app (client)



         let m = await Remote.Auth().me().catch(e => e);
           // Since the /login endpoint doesn't return any info of the user, let's call it
            console.log("auth res me!", m)
        let sm = await Remote.Auth().saveMe(m.data).catch(e => e)
             // We like to keep functions raw, so it can be reusable.
             // So, /me will only return the API data,
             // and we want to save that data in the app
             // in order to perform this only one time.

          
          return this.props.screenProps.switchScreen();
       } else {
        return;
       }
     // }).catch(err => {
     //   __DEV__ && console.log("There has been an error", err)
     //   Snackbar.show({ title: 'Algo fue mal!' });
     // })
   }
   _onRegister = () => {
     console.log("On register!", this.state)
    Snackbar.show({ title: 'Creating your account...' })
    
     Remote.Auth().signUp(this.state.first_name, this.state.username, this.state.email, this.state.password)
     .then(res => {
       Snackbar.show({ title: 'Account successfully created. Logging in.' })

       console.log("[Registro]", res)

       if(res.code == 422 || res.code == 500){
        Snackbar.show({ title: res.message });
        return;
       }

       Remote.Auth().signIn(this.state.email, this.state.password)
         .then(res => {
           console.log("logged in mti!", res)
           if(res.token_type == 'Bearer' && res.expires_in != null && res.access_token != null){

             // Let's show a toast
             //Snackbar.show({ title: 'Welcome!' });

             // Set access token in the app (client)
             Remote.Auth().setAccessToken(res).then(resAcc => {
               // Since the /login endpoint doesn't return any info of the user, let's call it
               Remote.Auth().me().then(resMe => {
                 // We like to keep functions raw, so it can be reusable.
                 // So, /me will only return the API data,
                 // and we want to save that data in the app
                 // in order to perform this only one time.
                 Remote.Auth().saveMe(resMe.data).then(resSaveMe => {
                   // Now, we can continue to the app
                   this.onRegisterAs();
                 })
               })
             });
           }
         }).catch(err => {
           __DEV__ && console.log("There has been an error", err)
           Snackbar.show({ title: 'Algo fue mal!' });
         })

       
       
     }).catch(err => {
      Snackbar.show({ title: 'Something went wrong' })
       console.log("on error login in", err)
     })
   }

  _scrollToInput = (reactNode) => {
      // Add a 'scroll' ref to your ScrollView
      this.scroll.props.scrollToFocusedInput(reactNode)
    }

   _onRenderForgotPassword = () => {
     return (
       <View style={styles.flexElement}>
       <View style={styles.linesView}>
         <Text style={styles.headline}>LOST PASSWORD</Text>
         <Text style={styles.subline}>Input your e-mail{"\n"}to reset your password</Text>
       </View>
       <View style={{marginTop: 10}}>
         <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "E-mail or username"
               placeholderTextColor = "#666"
               autoCapitalize = "none"
               onChangeText={(text) => this.setState({email: text})}/>
       </View>
       <View style = {{marginTop: 3}}>
         <TouchableHighlight style={{borderRadius: 10, margin: 10, height: 50, backgroundColor: 'rgba(0,0,0,.4)', width: ancho - 20}}>
               <Text style={styles.headlineAuth, {color: '#fff', justifyContent: 'center', alignSelf: 'center', margin: 13, fontSize: 18}}>
               Reset password
               </Text>
         </TouchableHighlight>
       </View>
      </View>
      );
   }
   _onFilled = (tab) => {
     if(tab == 'login' && this.state.password == ''){
       if(this.state.username == ''){
         return true;
       } else {
         return false;
       }
     }
     else if(tab == 'register' && this.state.password == '' && this.state.first_name == '' && this.state.username == '' && this.state.email == '') {
       
         return true;
      
     } else {
       return false;
     }
   }
   _onRenderLogin = () => {
     return (
       <View style={[styles.flexElement]}>
       <View style={{marginTop: 10}}>
         <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#A2AAAD"
               autoCapitalize = "none"
               ref={(input) => { this.rutLoginInput = input; }}
               onFocus={(event) => {
                  this._scrollToInput(findNodeHandle(event.target))
                }}
                value={this.state.username}
               onSubmitEditing={() => { this.passwordInput.focus(); }}
               onChangeText={(text) => this.setState({username: text})}/>
       </View>
       <View style = {{marginTop: 20}}>
         <TextInput 
               secureTextEntry={true}
               password={true}
               style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Clave"
               placeholderTextColor = "#A2AAAD"
               autoCapitalize = "none"
               ref={(input) => { this.passwordInput = input; }}
               onFocus={(event) => {
                  this._scrollToInput(findNodeHandle(event.target))
                }}
                value={this.state.password}
               onSubmitEditing={() => { this._onLogin() }}
               onChangeText={(text) => this.setState({password: text})}/>
       </View>
       
       <View style = {{marginTop: 20}}>
        <AwesomeButton
                    progress
                    onPress={async(next) => {
                      /** Do Something **/
                      this._onLogin();
                      next();
                    }}
                    width={340}
                    style={{alignSelf: 'center', justifyContent: 'center', marginTop: 10, opacity: this._onFilled('login') ? 0.5 : 1,}}
                    alignSelf={'center'}
                    raiseLevel={0}
                    backgroundShadow={'#fff'}
                    borderWidth={2}
                    height={45}
                    borderRadius={28}
                    backgroundColor={'#AB61C6'}
                    borderColor={'#8a4ea0'}
                    textSize={17}
                  >
                   Entrar
         </AwesomeButton>

  
       </View>
      
       <View style = {{marginTop: 8, height: 40, backgroundColor: 'transparent'}}>
            
               <TouchableOpacity onPress={() => this.setState({statusTab: 'register', heightContainer: 600})} style={{justifyContent: 'center', alignSelf: 'center', width: '95%', borderRadius: 8, height: 40, backgroundColor: 'transparent'}}>
                 <Row size={12} style={{position:'absolute', bottom: 20, left:0, right:0}}>
                  <Col sm={6} md={6} lg={6}>
                       <Text style={[human.caption, {color: '#606470', margin: 0, textAlign: 'right'}]}>No eres miembro?</Text>
                    </Col>
                  <Col sm={6} md={6} lg={6}>
                       <Text style={[human.caption, {color: '#AB61C6', marginLeft: 5, fontWeight: 'bold'}]}>Crea una cuenta</Text>
                  </Col>
                </Row> 
               </TouchableOpacity>
               
       </View>
      </View>

      );
   }
   _onRenderRegister = () => {
     return (
       <View style={styles.flexElement}>
       <View style={{marginTop: 8}}>
         <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Nombre"
               placeholderTextColor = "#A2AAAD"
               autoCapitalize = "none"
               blurOnSubmit={false}
               ref={(input) => { this.firstInput = input; }}
               onFocus={(event) => {
                  this._scrollToInput(findNodeHandle(event.target))
                }}
               value={this.state.first_name}
               onSubmitEditing={() => { this.emailInput.focus(); }}
               onChangeText={(text) => this.setState({first_name: text})}/>
       </View>
       <View style={{marginTop: 20}}>
         <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "E-mail"
               placeholderTextColor = "#A2AAAD"
               autoCapitalize = "none"
               blurOnSubmit={false}
               ref={(input) => { this.emailInput = input; }}
               onFocus={(event) => {
                  this._scrollToInput(findNodeHandle(event.target))
                }}
                value={this.state.email}
               onSubmitEditing={() => { this.rutInput.focus(); }}
               onChangeText={(text) => this.setState({email: text})}/>
       </View>
       <View style={{marginTop: 10}}>
         <TextInput style = {[styles.input, {marginTop: 10}]}
               underlineColorAndroid = "transparent"
               placeholder = "RUT"
               placeholderTextColor = "#A2AAAD"
               autoCapitalize = "none"
               blurOnSubmit={false}
               onFocus={(event) => {
                  this._scrollToInput(findNodeHandle(event.target))
                }}
               ref={(input) => { this.rutInput = input; }}
               onSubmitEditing={() => { this.passInput.focus(); }}
               value={this.state.username}
               onChangeText={(text) => this.setState({username: text})}/>
       </View>
       <View style = {{marginTop: 20}}>
         <TextInput style = {styles.input}
               secureTextEntry={true}
               password={true}
               underlineColorAndroid = "transparent"
               placeholder = "Clave"
               placeholderTextColor = "#A2AAAD"
               autoCapitalize = "none"
               blurOnSubmit={false}
               onFocus={(event) => {
                  this._scrollToInput(findNodeHandle(event.target))
                }}
               ref={(input) => { this.passInput = input; }}
               onSubmitEditing={() => { this._onRegister(); }}
               value={this.state.password}
               onChangeText={(text) => this.setState({password: text})}/>
       </View>

       <View style = {{marginTop: 20}}>
        <AwesomeButton
                    progress
                    onPress={async(next) => {
                      /** Do Something **/
                      await(this._onRegister());
                      next();
                    }}
                    width={340}
                    style={{alignSelf: 'center', justifyContent: 'center', marginTop: 10, opacity: this._onFilled('register') ? 0.5 : 1,}}
                    alignSelf={'center'}
                    raiseLevel={0}
                    backgroundShadow={'#fff'}
                    borderWidth={2}
                    height={45}
                    borderRadius={28}
                    backgroundColor={'#AB61C6'}
                    borderColor={'#8a4ea0'}
                    textSize={17}
                  >
                   Crear cuenta
         </AwesomeButton>

        {/* <TouchableHighlight 
           onPress={() => this._onRegister()}
           style={{opacity: this._onFilled('register') ? 0.5 : 1, borderRadius: 28, borderWidth: 2, borderColor: '#1E888A', margin: 10, height: 50, backgroundColor: '#08B8B8', width: ancho - 50}}>
               <Text style={styles.headlineAuth, {color: '#fff', justifyContent: 'center', alignSelf: 'center', marginTop: 13, fontSize: 18, fontWeight: 'bold'}}>Crear cuenta</Text>
         </TouchableHighlight>*/}
       </View>
      

       <View style = {{marginTop: 8, marginBottom: 10, height: 30, backgroundColor: 'transparent'}}>
         
               <TouchableOpacity onPress={() => this.setState({statusTab: 'login', heightContainer: 600})} style={{justifyContent: 'center', alignSelf: 'center', width: '95%', borderRadius: 8, height: 40, backgroundColor: 'transparent'}}>
                 <Row size={12} style={{position:'absolute', bottom: 20, left:0, right:0}}>
                  <Col sm={7} md={7} lg={7}>
                       <Text style={[human.caption, {color: '#606470', margin: 0, textAlign: 'right'}]}>Ya eres miembro?</Text>
                    </Col>
                  <Col sm={5} md={5} lg={5}>
                       <Text style={[human.caption, {color: '#AB61C6', marginLeft: 5, fontWeight: 'bold'}]}>Ingresa</Text>
                  </Col>
                </Row> 
               </TouchableOpacity>
               
       </View>

      
      </View>
      );
   }



  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }

  comenzar = () => {
    //if(this.state.sliderIndex <= 3){
      let i = this.state.sliderIndex + 1;
      console.log("comenzar", i, this.state.sliderIndex)
      if(i <= 2){
        this.slider?.goToSlide(i, true)
        this.setState((prevState) => update(prevState, { 
          sliderIndex: { 
                  $set: i
            }
          }));
      } else {
        this.setState((prevState) => update(prevState, { 
              currentView: { 
                  $set: 'login'
                }
              }));
      }
    //}
  }
  currentSlide = (index) => {
    this.setState((prevState) => update(prevState, { 
        sliderIndex: { 
                $set: index 
          }
        }));
  }
  render() {
    if (this.state.isLoading == true) {
      return (
        <ActivityIndicator
            style={styles.indicator}
            color="#000"
            size="large"
          />
        )
    } else {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{    
          flexGrow: 1,
          justifyContent: 'space-between'
        }}
        innerRef={ref => {
          this.scroll = ref
        }}>
        {/*<Image
            style={{
                alignSelf: 'center',
                height: 100,
                width: '60%',
                borderWidth: 0,
                borderRadius: 0,
                marginTop: 30
              }}            
              source={require('../../assets/logo_app.png')}
              resizeMode="stretch"
          />*/}

        {this.state.currentView == 'slides' ?
          <View style={{flex:1}}>

            <AppIntroSlider
                  slides={slides}
                  ref={(ref) => (this.slider = ref)}
                  renderItem={this._renderItem}
                  paginationStyle={{bottom: 100}}
                  showSkipButton={false}
                  showPrevButton={false}
                  showNextButton={false}
                  showDoneButton={false}
                  dotStyle={{backgroundColor: 'rgba(0, 0, 0, .2)'}}
                  onSlideChange={index => this.currentSlide(index)}
                  activeDotStyle={{backgroundColor: 'rgba(0, 0, 0, .8)', height:13,width:13,borderRadius:50}}

                />


              <View style={{position: 'absolute', bottom: 30, width: '100%',justifyContent: 'center',alignItems: 'center',}}>
                <TouchableOpacity onPress={() => this.comenzar()} style={{padding:15,width: '80%', justifyContent: 'center',alignItems: 'center', borderRadius:30, backgroundColor: '#AB61C6'}}>
                  <Text style={{color: '#fff', fontSize:18,  fontWeight:'500'}}>Comenzar</Text>
                </TouchableOpacity>
              </View>
              </View> 
              :
               <View style={{flex:1}}>
               <Image
            style={{
                alignSelf: 'center',
                height: 133,
                width: 321,
                borderWidth: 0,
                borderRadius: 0,
                marginTop: 100
              }}            
              source={require('../../assets/logo_app_string.png')}
              resizeMode="stretch"
          />
              <View style={styles.optionsContainer}>
               {this.state.statusTab == 'login' && this._onRenderLogin()}
               {this.state.statusTab == 'register' && this._onRenderRegister()}
               {this.state.statusTab == 'forgot' && this._onRenderForgotPassword()}

              </View>
              </View>
        }
       {/* <TouchableOpacity 
        onPress={() => this.setState({isOpen: true, statusTab: 'login'})}
        style={[styles.twoColumnsButton, {left: 8, bottom: 50, backgroundColor: '#000'}]}>
              <Text 
              style={styles.twoColumnsText}
              >Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => this.setState({isOpen: true, statusTab: 'register'})}
        style={[styles.twoColumnsButton, {right: 8, bottom: 50}]}>
              <Text style={styles.twoColumnsText}>Register</Text>
        </TouchableOpacity>
      */}

          
          <StatusBar
                      barStyle={'light-content'}
                      color={'#000'}
                      backgroundColor={'transparent'}
                    />
       </KeyboardAwareScrollView>
        
          


    );
    }
  }
}

module.exports = SignedOut;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },


  flexElement: {
    backgroundColor: '#fff',
   
  },
  input: {
      margin: 0,
      height: 40,
      borderColor: '#EEEEEE',
      borderBottomWidth: 1,
      backgroundColor: 'rgba(255,255,255,.2)',
      alignSelf: 'center',
      width: ancho - 30,
      padding: 10,
      borderRadius: 10,
      fontSize: 16
   },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'rgba(0, 0, 0, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
    fontSize: 17,
    paddingRight: 20,
    paddingLeft: 20
  },
  title: {
    fontSize: 26,
    color: '#000',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
   btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },
  sessionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  headlineAuth: {
    fontSize: 17,
    justifyContent: 'center', alignSelf: 'center'
  },
  twoColumnsButton: {
    height: 60, 
    width: (ancho / 2) - 10, 
    position: 'absolute',
    backgroundColor: '#dc2c72', 
    borderRadius: 8, 
    alignItems: 'center'
  },
  twoColumnsText: {
    color: '#fff', 
    justifyContent: 'center', alignSelf: 'center',
    marginLeft: 0, 
    marginTop: 18, 
    fontSize: 20, 
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 4
  },
  forgotPassword: {
    color: '#fff'
  },
  buttonSend: {
    color: '#fff',
    backgroundColor: '#111',
    borderRadius: 10
  },
  headline: {
    fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        color: '#fff'
  },
  subline: {
    fontSize: 12,
    letterSpacing: 0.5,
    fontSize: 13,
    color: 'rgba(255,255,255,.4)'
  },
  linesView: {
    textAlign: 'left',
    width: '90%',
    alignItems: 'stretch'
  },
  optionsContainer: {
    alignSelf: 'center',
    flexGrow: 1,
    flexDirection: 'column', justifyContent: 'flex-end',
    paddingBottom:50
  }
});
