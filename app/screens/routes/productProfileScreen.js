import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, ActivityIndicator, View, Button, Alert, TouchableOpacity, Image, ImageBackground, ScrollView, StatusBar, SafeAreaView, Dimensions, ListView, Animated, TouchableHighlight, RefreshControl, findNodeHandle, FlatList } from 'react-native';
import Icon from 'react-native-fa-icons';
import Icono from 'react-native-vector-icons/Ionicons';
import EntypoIcono from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable'

import { SliderBox } from "../../components/carouselImage";

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { SearchBar } from 'react-native-elements';

import _ from 'lodash'

import LinearGradient from 'react-native-linear-gradient';


import { human,systemWeights } from 'react-native-typography'

import { getLang, Languages } from '../../static/languages';

import Snackbar from 'react-native-snackbar';

import API from '../../services/api';
import {globalColors} from '../../styles/globals';

import { BlurView, VibrancyView } from "../../../libraries/blur";

import AwesomeButton from "react-native-really-awesome-button";

import update from 'immutability-helper'

import FastImage from 'react-native-fast-image'

var ancho = Dimensions.get('window').width; //full width
var alto = Dimensions.get('window').height; //full height

export default class ProductProfileScreen extends Component<Props>{
    static navigationOptions = ({ navigation }) => {
          const { params = {} } = navigation.state;
          var value = null;
        return {
            headerTitle: navigation.getParam('title', 'Product'),
            
            headerBackTitle: null,
            
        };
      };
    constructor(props) {
      super(props);
      this.state = {
        product: null,
        page: 1,
        searchValue: null,
        images: null
      }

      let id = props.navigation.state.params.id;
      let title = props.navigation.state.params.title
      if(title){
        props.navigation.setParams({ title: title });
      }

      this.$product(id);
   }

   componentDidMount(){
    
    console.log("product props", this.props)
   }

   $product = async(id) => {
    let f = await(this.props.screenProps.Remote.Products().findOne(id));

    if(f.data){
      console.log("product page res", f)

      let d = f.data;
      let imgs = [];
      if(d.teaser_image_1){
        imgs.push(d.teaser_image_1.medium);
      }
      if(d.teaser_image_2){
        imgs.push(d.teaser_image_2.medium);
      }
      if(d.teaser_image_3){
        imgs.push(d.teaser_image_3.medium);
      }
      if(d.teaser_image_4){
        imgs.push(d.teaser_image_4.medium);
      }
      if(d.teaser_image_5){
        imgs.push(d.teaser_image_5.medium);
      }
      if(d.teaser_image_6){
        imgs.push(d.teaser_image_6.medium);
      }
      this.setState((prevState) => update(prevState, { 
                      product: {
                        $set: f.data
                      },
                      images: {
                        $set: imgs
                      }
                   }), () => console.log("this state", this.state));
    }
    
   }


  onChangeSearchText = (text) => {
    
    this.setState({
      searchValue: text
    })
  }

  _onSearch = async() => {
    let f = await(this.props.screenProps.Remote.Products().list({page:1}));
    console.log("products fetch!", globalColors)

    this.setState((prevState) => update(prevState, { 
                    product: { 
                       $set: f.data
                       },
                    page: {
                      $set: 1
                    }
                 }), () => console.log("this state", this.state));
  }
  _search = () => {
    return (
      <SearchBar

              placeholder="Buscar"
              platform="ios"
              cancelButtonTitle="Cancel"
              style={{ paddingTop:5, borderRadius: 50}}
              inputStyle={{paddingTop:5,backgroundColor: 'transparent', borderRadius:50}}
              containerStyle={{marginTop:10, backgroundColor: 'transparent',  borderRadius: 50}}
              placeholderTextColor={'#666'}
              onChangeText={(e) => this.onChangeSearchText(e)}
              value={this.state.searchValue}
              lightTheme={true}
              borderRadius={20}
              //onSubmitEditing={() => { this._onSearch() }}
              //autoCorrect={false}
              //onCancel={() => this.showSearch()}
              
            />
            )
  }

  render(){
    return(
      <ScrollView style={{flex:1}}>
      {this.state.product != null && 
        <View>

            {this.state.images != null && <SliderBox 
              paginationBoxStyle={{backgroundColor: 'transparent', position: 'absolute', marginTop: -20, top:250}}
              style={{height:300}}
            images={this.state.images} />}
          <View>
          </View>
          <View style={styles.productContainer}>
          <Text style={styles.textTitle}>
            {
              this.state.product.name
            }
          </Text>
          <Text>
            <Text style={styles.textPrice}>{this.state.product.currency.symbol} {this.state.product.original_price}</Text>
          </Text>

          
          </View>

             <View colors={['rgba(171, 97, 198, 0.09  )', '#fff', '#fff']} style={styles.gradientDetails}>
           <Text style={styles.description}>
            Description
          </Text>
          <Text style={styles.textDescription}>
            {
              this.state.product.description
            }
          </Text>
        </View>
        <AwesomeButton
                    progress
                    onPress={async(next) => {
                      /** Do Something **/
                      //this._onLogin();
                      next();
                    }}
                    width={340}
                    style={{alignSelf: 'center', justifyContent: 'center', marginTop: 10}}
                    alignSelf={'center'}
                    raiseLevel={0}
                    backgroundShadow={'#fff'}
                    borderWidth={1}
                    height={55}
                    borderRadius={30}
                    backgroundColor={globalColors.primary}
                    borderColor={'#8a4ea0'}
                    textSize={19}
                  >
                   Agregar al carrito
         </AwesomeButton>
          </View>}
          
      </ScrollView> 
      );
  }
}

const styles = StyleSheet.create({
  product: {
    flexDirection:'row',
    display:'flex',
    height:90,
    width:'100%',
    justifyContent:'flex-start',
    alignItems:'flex-start',

    marginBottom:10
  },
  productContainer: {
    padding:20,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: -20
  },
  productInfo: {
    paddingLeft:10
  },
  description: {
    ...systemWeights.light,
    marginTop:5,
    fontSize:14
  },
  textDescription: {
    ...systemWeights.regular,
    marginTop:5,
    fontSize:16
  },
  textTitle: {
    ...systemWeights.bold,
    marginTop:5,
    marginBottom:5,
    fontSize:24,
    color: globalColors.secondary
  },
  textPrice: {
    ...systemWeights.semibold,
    marginTop:5,
    fontSize:15
  },
  gradientDetails: {
    flex: 1,
    padding:10
  }
});