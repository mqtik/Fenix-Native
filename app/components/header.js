import React from "react";
import { Header } from "react-navigation";
import { View, Platform, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { BlurView, VibrancyView } from "../../libraries/blur";
let ancho = Dimensions.get('window').width; //full width
let alto = Dimensions.get('window').height; //full height

const HeaderFX = props => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#fff'
        //flexDirection: 'row'
      }}
    >
        <Header {...props}>
        </Header>
       
    </View>
  );
};

export default HeaderFX;