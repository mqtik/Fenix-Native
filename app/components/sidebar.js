import React, {Component} from 'react';
import { Header, DrawerItems } from "react-navigation";
import { View, Platform, Dimensions, ScrollView, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";


import Icon from 'react-native-fa-icons';
import Icono from 'react-native-vector-icons/Ionicons';
import EntypoIcono from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { human } from 'react-native-typography'
import { API_URL } from 'react-native-dotenv'

// Styles
import styles from '../styles/sidebarStyle';

// Get API class
import API from '../services/api';

// Languages
import { getLang, Languages } from '../static/languages';

const Remote = new API({ url: API_URL })

let ancho = Dimensions.get('window').width; //full width
let alto = Dimensions.get('window').height; //full height

class DrawerBar extends Component<Props> {
  constructor(props){
    super(props);

    this.state = {
      isBusiness: props.screenProps.rootUser.type == 'Standard user' ? 'standard' :  'business'
    };
  }
  componentDidMount() {
     __DEV__ && console.log("Sidebar.js: Props: ", this.props)
    __DEV__ && console.log("ES EL CHOFER?", this.props.screenProps.isBusiness())

    this.setState({
      isBusiness: this.props.screenProps.isBusiness()
    })
    //let k = await(Remote.Auth().getMeOffline());
    // menores: props.navigation.navigate("Profile", {chofer: false})}
    // perfil props.navigation.navigate("Profile", {chofer: false})}
    // chofer: props.navigation.navigate("Chofer", {chofer: true})
    // viajes: props.navigation.navigate("Viajes")

    this.$user();
  }

  $user = async() => {
    let k = await(Remote.Auth().getMeOffline());

    console.log("[SIDEBAR] USER DATA", k)
  }
   

    render(){
      if(this.state.isBusiness == true){
            return (
              <ScrollView style={{flex: 1, height: '100%', borderRightWidth: 1, borderColor: '#eaeaea'}} contentContainerStyle={{alignItems: 'flex-end'}}>
                 

                  
                         <View 
                           style={{width: '100%', height: alto - 110, flex: 1, marginTop: 50, justifyContent: 'flex-start', alignSelf: 'flex-start'}}>
                                  <TouchableOpacity onPress={() => { this.props.navigation.navigate("Ruta") || this.props.navigation.dispatch(DrawerActions.closeDrawer()) }} style={{width: '100%', padding: 20}}>
                                       <View>
                                           <Icono name="ios-bus" size={20} color="#606498"/>
                                           <Text style={[human.body, styles.navText]}>
                                             Ruta
                                           </Text>
                                       </View>
                                   </TouchableOpacity>
                                   <TouchableOpacity onPress={() => this.props.navigation.navigate("QR")}  style={{width: '100%', padding: 20, borderBottomWidth: 1, borderColor: '#EEEEEE'}}>
                                       <View>
                                           <Icono name="ios-qr-scanner" size={20} color="#606498"/>
                                           <Text style={[human.body, styles.navText]}>
                                             Escaner
                                           </Text>
                                       </View>
                                   </TouchableOpacity>
                                   <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}  style={{width: '100%', padding: 20}}>
                                       <View>
                                           <Feather name="user" size={20} color="#606498"/>
                                           <Text style={[human.body, styles.navText]}>
                                             Menores
                                           </Text>
                                       </View>
                                   </TouchableOpacity>
                                   
                                   <TouchableOpacity onPress={() => this.props.screenProps.onLogout()} style={{width: '100%', padding: 20}}>
                                       <View>
                                           <AntDesign name="logout" size={20} color="#606498"/>
                                           <Text style={[human.body, styles.navText]}>
                                             Salir
                                           </Text>
                                       </View>
                                   </TouchableOpacity>

                    
                        </View>

                        <View style={{height: 100, width: '100%', justifyContent: 'flex-start', alignSelf: 'flex-start'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Contact", {chofer: false})} style={{zIndex: 9999, padding: 20, width: '100%', backgroundColor: 'transparent'}}>
                                       <View>
                                           <Text style={[human.body, {fontWeight: '500', color: '#606498'}]}>
                                             Contacta Hakuna
                                           </Text>
                                       </View>
                                   </TouchableOpacity>
                                   </View>
                </ScrollView>
            );
          } else {
            return (
              <ScrollView style={{flex: 1, height: '100%', borderRightWidth: 1, borderColor: '#eaeaea'}} contentContainerStyle={{alignItems: 'flex-end'}}>
                  

                  
                         <View 
                           style={{width: '100%', height: alto - 150, flex: 1, marginTop: 50, justifyContent: 'flex-start', alignSelf: 'flex-start'}}>
                                  <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")} style={{width: '100%', padding: 20}}>
                                       <View>
                                           <Icono name="ios-home" size={20} color="#6CCCBC"/>
                                           <Text style={[human.body, styles.navText]}>
                                             Inicio
                                           </Text>
                                       </View>
                                   </TouchableOpacity>
                                   <TouchableOpacity onPress={() => this.props.navigation.navigate("Products")}  style={{width: '100%', padding: 20, borderBottomWidth: 1, borderColor: '#EEEEEE'}}>
                                       <View>
                                           <MaterialCommunityIcons name="checkbox-multiple-marked" size={20} color="#6CCCBC"/>
                                           <Text style={[human.body, styles.navText]}>
                                              Productos
                                           </Text>
                                       </View>
                                   </TouchableOpacity>
                                   <TouchableOpacity onPress={() => { this.props.navigation.navigate("Chofer") || this.props.navigation.dispatch(DrawerActions.closeDrawer()) }} style={{width: '100%', padding: 20}}>
                                       <View>
                                           <EntypoIcono name="chat" size={20} color="#6CCCBC"/>
                                           <Text style={[human.body, styles.navText]}>
                                             Chat
                                           </Text>
                                       </View>
                                   </TouchableOpacity>
                                   <TouchableOpacity onPress={() => { this.props.navigation.navigate("Profile") || this.props.navigation.dispatch(DrawerActions.closeDrawer()) }} style={{width: '100%', padding: 20}}>
                                       <View>
                                           <Feather name="user" size={20} color="#6CCCBC"/>
                                           <Text style={[human.body, styles.navText]}>
                                             Perfil
                                           </Text>
                                       </View>
                                   </TouchableOpacity>
                                   <TouchableOpacity onPress={() => { this.props.navigation.navigate("About") || this.props.navigation.dispatch(DrawerActions.closeDrawer()) }} style={{width: '100%', padding: 20}}>
                                       <View>
                                           <MaterialCommunityIcons name="account-multiple" size={20} color="#6CCCBC"/>
                                           <Text style={[human.body, styles.navText]}>
                                             Clientes
                                           </Text>
                                       </View>
                                   </TouchableOpacity>
                                   <TouchableOpacity onPress={() => { this.props.navigation.navigate("About") || this.props.navigation.dispatch(DrawerActions.closeDrawer()) }} style={{width: '100%', padding: 20}}>
                                       <View>
                                           <EntypoIcono name="tools" size={20} color="#6CCCBC"/>
                                           <Text style={[human.body, styles.navText]}>
                                             Información útil
                                           </Text>
                                       </View>
                                   </TouchableOpacity>
                                   <TouchableOpacity onPress={() => { this.props.navigation.navigate("About") || this.props.navigation.dispatch(DrawerActions.closeDrawer()) }} style={{width: '100%', padding: 20}}>
                                       <View>
                                           <Feather name="help-circle" size={20} color="#6CCCBC"/>
                                           <Text style={[human.body, styles.navText]}>
                                             Acerca de la app
                                           </Text>
                                       </View>
                                   </TouchableOpacity>
                                   <TouchableOpacity onPress={() => this.props.screenProps.onLogout()} style={{width: '100%', padding: 20}}>
                                       <View>
                                           <AntDesign name="logout" size={20} color="#6CCCBC"/>
                                           <Text style={[human.body, styles.navText]}>
                                             Salir
                                           </Text>
                                       </View>
                                   </TouchableOpacity>

                                   
                                 




                        </View>
                        <View style={{height: 100, width: '100%', justifyContent: 'flex-start', alignSelf: 'flex-start'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Contact", {chofer: false})} style={{zIndex: 9999, padding: 20, width: '100%', backgroundColor: 'transparent'}}>
                                       <View>
                                           <Text style={[human.body, {fontSize: 18,fontWeight: '700', color: '#AB61C6'}]}>
                                             Contactanos
                                           </Text>
                                       </View>
                                   </TouchableOpacity>
                                   </View>
                        
        

                </ScrollView>
            );
         }
    }
          
            
};

export default DrawerBar;