import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, ActivityIndicator, View, Button, Alert, TouchableOpacity, Image, ImageBackground, ScrollView, StatusBar, SafeAreaView, Dimensions, ListView, Animated, TouchableHighlight, RefreshControl } from 'react-native';

// Icons
import FontAwesome from 'react-native-fa-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EntypoIcono from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FA5 from 'react-native-vector-icons/FontAwesome5';

// dependences
import _ from 'lodash'
import Toast, {DURATION} from 'react-native-easy-toast'
import { API_URL, PORT_API_DIRECT, PORT_API, DB_BOOKS, INDEX_NAME, LOCAL_DB_NAME, API_STATIC, SETTINGS_LOCAL_DB_NAME, LOCAL_DB_DRAFTS } from 'react-native-dotenv'
import LinearGradient from 'react-native-linear-gradient';
import uuid from 'react-native-uuid';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import moment from "moment/min/moment-with-locales";
import { human } from 'react-native-typography'
import {Column as Col, Row} from 'react-native-flexbox-grid';

// Styles
import styles from '../../styles/viajesStyle';

// Languages
import { getLang, Languages } from '../../static/languages';

// Static JSON
//import { viajesObject } from '../../static/hakuna';

const viajesObject = [
    {
        date: '2013-02-08',
        depart: {
            salida: '06:30',
            llegada: '13:30', // @return: date || stand-by
            speed: '60', // km/h
        },
        arrival: {
            salida: '06:30',
            llegada: '13:30', // @return: date || stand-by
            speed: '60', // km/h
        }
    },
    {
        date: '2013-02-05',
        depart: {
            salida: '06:30',
            llegada: '13:30', // @return: date || stand-by
            speed: '60', // km/h
        },
        arrival: {
            salida: '06:30',
            llegada: '13:30', // @return: date || stand-by
            speed: '60', // km/h
        }
    },
    {
        date: '2013-02-02',
        depart: {
            salida: '06:30',
            llegada: '13:30', // @return: date || stand-by
            speed: '60', // km/h
        },
        arrival: {
            salida: '06:30',
            llegada: '13:30', // @return: date || stand-by
            speed: '60', // km/h
        }
    },
    {
        date: '2013-01-28',
        depart: {
            salida: '06:30',
            llegada: '13:30', // @return: date || stand-by
            speed: '60', // km/h
        },
        arrival: {
            salida: '06:30',
            llegada: '13:30', // @return: date || stand-by
            speed: '60', // km/h
        }
    },
];



var ancho = Dimensions.get('window').width; //full width
var alto = Dimensions.get('window').height; //full height

export default class MenoresScreen extends Component<Props>{
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

      }
   }

   componentDidMount(){
     console.log("Viajes object", viajesObject)
   }


  render(){
    
        return(
          <ScrollView style={{flex: 1, marginTop: -80, backgroundColor: '#fff'}}>
            <View style={{paddingTop: 70, paddingLeft: 5, paddingRight: 5}}>
              { 
                viajesObject.map((key, i) => {
                     console.log("map key viajes!", key.date)
                     return (
                       <View key={key.date} style={{marginBottom: 30}}>
                       <Text style={[human.headline, { marginLeft: 15, marginTop: 20, marginBottom: 10, color: '#4F4F4F'}]}>{moment(key.date).format("dddd, d")} de {moment(key.date).format("MMMM YYYY")}</Text>
                        <View style={styles.viajeContainer}>
                           <Text style={[human.caption, {fontWeight: 'bold', marginLeft: 5, color: '#323643'}]}>
                             IDA
                           </Text>
                       
                         <Row size={12} style={{marginTop: 10}}>
                            <Col sm={3} md={3} lg={3}>
                                
                               <Text style={[human.caption, {color: '#828282', textAlign: 'center', fontSize: 13}]}>
                                 Salida
                               </Text>
                               <Text style={[human.caption, {textAlign: 'center', fontWeight: 'bold'}]}>
                                 {key.depart.llegada}
                               </Text>
                               <MaterialCommunityIcons name="home-modern" size={35} color="#FE92AA" style={{justifyContent: 'center', alignSelf:'center', marginTop: 10}}/>
                            </Col>

                            <Col sm={6} md={6} lg={6}>
                                <View style={{width: '100%', marginTop: -20}}>
                                  <Text style={{textAlign: 'center', color: '#828282'}}>
                                     Velocidad max
                                   </Text>
                                  <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#4F4F4F'}}>
                                     {key.depart.speed} km/h
                                   </Text>
                                   <FA5 name="ellipsis-h" size={20} color="#08B8B8" style={{position: 'absolute', top: 55, left: 30}}/>
                          
                                   <Image
                                      style={{
                                          alignSelf: 'center',
                                          marginTop: 20
                                        }}            
                                        source={require('../../../assets/bus_go.png')}
                                    />
                                   <Image
                                      style={{
                                          alignSelf: 'center',
                                          marginTop: 10
                                        }}            
                                        source={require('../../../assets/line.png')}
                                    />
                                </View>
                                 
                            </Col>

                            <Col sm={3} md={3} lg={3}>
                              <Text style={[human.caption, {color: '#828282', textAlign: 'center', fontSize: 13}]}>
                                 Llegada
                               </Text>
                               <Text style={[human.caption, {textAlign: 'center', fontWeight: 'bold'}]}>
                                 {key.depart.salida}
                               </Text>
                              
                             <Image
                                style={{
                                    alignSelf: 'center',
                                    marginTop: 17
                                  }}            
                                  source={require('../../../assets/jar_tools.png')}
                              />
                            </Col>
                          </Row> 

                             
                         </View>




                         <View style={[styles.viajeContainer, {marginTop: 10}]}>
                           <Text style={[human.caption, {fontWeight: 'bold', marginLeft: 5, color: '#323643'}]}>
                             VUELTA
                           </Text>
                       
                         <Row size={12} style={{marginTop: 10}}>
                            <Col sm={3} md={3} lg={3}>
                                
                               <Text style={[human.caption, {color: '#828282', textAlign: 'center', fontSize: 13}]}>
                                 Salida
                               </Text>
                               <Text style={[human.caption, {textAlign: 'center', fontWeight: 'bold'}]}>
                                 {key.arrival.llegada}
                               </Text>
                               <MaterialCommunityIcons name="home-modern" size={35} color="#FE92AA" style={{justifyContent: 'center', alignSelf:'center', marginTop: 10}}/>
                            </Col>

                            <Col sm={6} md={6} lg={6}>
                                <View style={{width: '100%', marginTop: -20}}>
                                  <Text style={{textAlign: 'center', color: '#828282'}}>
                                     Velocidad max
                                   </Text>
                                  <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#4F4F4F'}}>
                                     {key.arrival.speed} km/h
                                   </Text>
                                   <FA5 name="ellipsis-h" size={20} color="#08B8B8" style={{position: 'absolute', top: 55, right: 30}}/>
                          
                                   <Image
                                      style={{
                                          alignSelf: 'center',
                                          marginTop: 20
                                        }}            
                                        source={require('../../../assets/bus_back.png')}
                                    />
                                   <Image
                                      style={{
                                          alignSelf: 'center',
                                          marginTop: 10
                                        }}            
                                        source={require('../../../assets/line.png')}
                                    />
                                </View>
                                 
                            </Col>

                            <Col sm={3} md={3} lg={3}>
                              <Text style={[human.caption, {color: '#828282', textAlign: 'center', fontSize: 13}]}>
                                 Llegada
                               </Text>
                               <Text style={[human.caption, {textAlign: 'center', fontWeight: 'bold'}]}>
                                 {key.arrival.salida}
                               </Text>
                              
                             <Image
                                style={{
                                    alignSelf: 'center',
                                    marginTop: 17
                                  }}            
                                  source={require('../../../assets/jar_tools.png')}
                              />
                            </Col>
                          </Row> 

                             
                         </View>



                       </View>
                       );
                  })
              }
            </View>
          </ScrollView>
        );
      
    }
}