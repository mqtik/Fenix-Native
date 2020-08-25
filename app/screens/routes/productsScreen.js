import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, ActivityIndicator, View, Button, Alert, TouchableOpacity, Image, ImageBackground, ScrollView, StatusBar, SafeAreaView, Dimensions, Animated, TouchableHighlight, RefreshControl, findNodeHandle, FlatList } from 'react-native';
import Icon from 'react-native-fa-icons';
import Icono from 'react-native-vector-icons/Ionicons';
import EntypoIcono from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable'

import RangeSlider from 'rn-range-slider';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { SearchBar } from 'react-native-elements';

import _ from 'lodash'

import LinearGradient from 'react-native-linear-gradient';

import Modal from 'react-native-modal';

import { human,systemWeights } from 'react-native-typography'

import { getLang, Languages } from '../../static/languages';

import Snackbar from 'react-native-snackbar';

import API from '../../services/api';
import {globalColors} from '../../styles/globals';

import { BlurView, VibrancyView } from "../../../libraries/blur";

import AwesomeButton from "react-native-really-awesome-button";

import update from 'immutability-helper'

import FastImage from 'react-native-fast-image'
import {Picker} from '@react-native-community/picker';

import RNPickerSelect from 'react-native-picker-select';

import {ProductsPlaceholder} from '../../components/skeletons.js';

var ancho = Dimensions.get('window').width; //full width
var alto = Dimensions.get('window').height; //full height

const items = ['Item 1', 'Item 2'];

export default class ProductsScreen extends Component<Props>{
    static navigationOptions = ({ navigation }) => {
          const { params = {} } = navigation.state;
          var value = null;
        return {

            headerLeft: (
               <View>
                 <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{height: 50, width: 50, padding: 13  }}>
                   <MaterialCommunityIcons name="menu" size={24} color={globalColors.primary}/>
                 </TouchableOpacity>
               </View>
              ),
            headerBackTitle: null,
            headerRight: (
               <View>
                 <TouchableOpacity onPress={() => params.toggleFilter()} style={{height: 50, width: 40, marginTop: 18, alignSelf: 'flex-end'}}>
                   <MaterialCommunityIcons name="filter-outline" size={28} color={globalColors.primary}/>
                 </TouchableOpacity>
               </View>
              )
        };
      };
    constructor(props) {
      super(props);
      this.state = {
        products: [],
        categories: null,
        sub_categories: null,
        page: 1,
        searchValue: null,
        modalFilterVisible: false,

        selectedCategory: null,
        selectedSubCategory: null,
        selectedPriceFrom: 0,
        selectedPriceTo: 1000
      }

      props.navigation.setParams({ toggleFilter: () => this.toggleFilter() });
   }

   componentDidMount(){
    this.$products(this.state.page);
    this.$categories(this.state.page);
   }

  $products = async(page) => {
    let f = await(this.props.screenProps.Remote.Products().list({
      category: this.state.selectedCategory,
      sub_category: this.state.selectedSubCategory,
      from_price: this.state.selectedPriceFrom,
      to_price: this.state.selectedPriceTo,
      page:page
    }));

    let p = _.uniqBy([...this.state.products, ...f.data], 'id');

    return this.setState((prevState) => update(prevState, { 
                    products: {
                      $set: p
                    },
                    page: {
                      $set: this.state.page + 1
                    }
                 }));
  }

  _doFilter = async() => {
    this.state.page = 1;
    this.state.products = [];
    await this.$products();
    this.setState((prevState) => update(prevState, { 
                    modalFilterVisible: {
                      $set: false
                    }
                 }));
  }

  $categories = async(page) => {
    let f = await(this.props.screenProps.Remote.Products().categories({page:page}));

    let c = f.data.filter(c => {
      return (c.parent == null)
    });
    c = c.map(c => { return { value: c.id, label:c.name }});

    let sc = f.data.filter(c => {
      return c.parent && c.parent.id != null
    });
    sc = sc.map(c => { return { value: c.id, label:c.name }});
    this.setState((prevState) => update(prevState, { 
                    categories: { 
                       $set: c
                       },
                    sub_categories: { 
                       $set: sc
                       }
                 }), () => console.log("this state cat", this.state));
  }

  loadMoreProducts = () => {
    this.$products(this.state.page);
  }

  goProduct = (params) => {
    this.props.navigation.navigate('ProductProfile',{
                                        id: params.id,
                                        title: params.title
                                      });
  }

  toggleFilter = () => {
    this.setState((prevState) => update(prevState, { 
                    modalFilterVisible: {
                      $set: !this.state.modalFilterVisible
                    }
                 }));
  }
  _renderPerProduct = (item) => {
    return (
      <TouchableOpacity key={item.id.toString()} onPress={() => this.goProduct({ id: item.id, title: item.name})} style={styles.product}>
        <View>
          {item.hero_image && item.hero_image.small &&
            <FastImage source={{uri: encodeURI(item.hero_image.small) }} 
              style={{backgroundColor: 'rgba(0,0,0,.4)',
                width: 156,
                marginLeft: 10,
                borderRadius: 10,
                height: 110}}>
             </FastImage>
          }
        </View>
        <View  style={styles.productInfo}>
         <Text numberOfLines={2} style={styles.textTitle}>{item.name}</Text>
          { (item.price && item.currency && item.currency.symbol) && 
            <View>
            <Text style={styles.textPrice}>{item.currency.symbol} {item.price}</Text>
          </View>
          }
        </View>
      </TouchableOpacity>
      )
  }

  onChangeSearchText = (text) => {
    console.log("on change text!", text)
    this.setState({
      searchValue: text
    })
  }

  _onSearch = async() => {
    let f = await(this.props.screenProps.Remote.Products().list({page:1, search: this.state.searchValue}));


    this.setState((prevState) => update(prevState, { 
                    products: { 
                       $set: f.data
                       },
                    page: {
                      $set: 1
                    }
                 }), () => console.log("this state", this.state));
  }

  cancelSearch = () =>  {
    this.state.products = [];
    this.state.page = 1;
    this.state.selectedCategory = null;
    this.state.selectedSubCategory = null;
    this.state.selectedPriceFrom = 0;
    this.state.selectedPriceTo = 1000;
    
    this.$products(1);

    this.setState((prevState) => update(prevState, { 
                    modalFilterVisible: {
                      $set: false
                    }
                 }));
  }
  _search = () => {
    return (

      <SearchBar
              key={'search'}
              placeholder="Buscar"
              platform="ios"
              cancelButtonTitle="Cancel"
              style={{ paddingTop:5, borderRadius: 50}}
              inputStyle={{ paddingTop:5,backgroundColor: 'transparent', borderRadius:50}}
              containerStyle={{marginTop:10, backgroundColor: 'transparent',  borderRadius: 50}}
              placeholderTextColor={'#666'}
              onChangeText ={(text)=>this.onChangeSearchText(text)}
              value={this.state.searchValue}
              lightTheme={true}
              borderRadius={20}
              onSubmitEditing={() => { this._onSearch() }}
              autoCorrect={false}
              onCancel={() => this.cancelSearch()}
              returnKeyType={'search'}
              
            />

            )
  }

  setCategory = (value) => {

  }

  render(){
    return(
      <View style={{flex:1}}>
      

     {this._search()}
             <FlatList
                  data={this.state.products}
                  initialNumToRender={10}
                  //ListHeaderComponent={() => this._search()}
                  maxToRenderPerBatch={10}
                  updateCellsBatchingPeriod={1000}
                  ListEmptyComponent={<ProductsPlaceholder />}
                  //removeClippedSubviews={true}
                  contentContainerStyle={{zIndex:99, backgroundColor: '#fff'}}
                   onEndReached={({ distanceFromEnd }) => {
                        if (distanceFromEnd < 0) return;
                       this.loadMoreProducts()
                    }}
                  style={styles.flat}
                  renderItem={({ item, index }) => this._renderPerProduct(item, index)}
                 
                />

         <Modal 
         swipeThreshold={100}
          isVisible={this.state.modalFilterVisible} 
          swipeDirection={'down'}
          propagateSwipe={true}
          onSwipeComplete={()=>this.setState({modalFilterVisible:false  })}
          style={{padding: 0, margin: 0}}>
          <View style={{flex: 1, backgroundColor: '#fff', marginTop: 100, borderRadius:10}}>
            <Text style={styles.textTitleFilter}>Filter Products</Text>

            <View>

              <View>
                <Text style={styles.textCategory}>Categoría</Text>
                 <MaterialCommunityIcons name="chevron-down" size={28} color="#606498" style={{position: 'absolute', right: 15, top: 42,zIndex:9}}/>
                
                {this.state.categories != null && <RNPickerSelect
                    onValueChange={(value) => this.setState({selectedCategory: value })}
                    placeholderTextColor="red"
                    style={styles}
                    value={this.state.selectedCategory}
                    placeholder={{
                        label: 'Category',
                        value: null,
                    }}
                    useNativeAndroidPickerStyle={false}
                    items={this.state.categories}
                />}
                
              </View>
              <View>
                <Text style={styles.textCategory}>Sub-Categoría</Text>
                 <MaterialCommunityIcons name="chevron-down" size={28} color="#606498" style={{position: 'absolute', right: 15, top: 42,zIndex:9}}/>
                {this.state.sub_categories != null && <RNPickerSelect
                  onValueChange={(value) => this.setState({selectedSubCategory: value })}
                    style={styles}
                    value={this.state.selectedSubCategory}
                    placeholder={{
                        label: 'Sub Category',
                        value: null,
                    }}
                    useNativeAndroidPickerStyle={false}
                    items={this.state.sub_categories}
                />}
              </View>
              <Text style={styles.textCategory}>Precio ({this.state.selectedPriceFrom} — {this.state.selectedPriceTo})</Text>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: -30}}>
                <Text style={{paddingTop:50}}>De</Text>
                 <RangeSlider
                    style={{width: 250, height: 80}}
                    gravity={'center'}
                    min={0}
                    max={1000}
                    step={1}
                    initialLowValue={this.state.selectedPriceFrom}
                    initialHighValue={this.state.selectedPriceTo}
                    selectionColor={globalColors.secondary}
                    labelBackgroundColor="#000000"
                    thumbBorderColor={globalColors.primary}
                    labelBorderColor="#333"
                    blankColor={'#eaeaea'}
                    onValueChanged={(low, high, fromUser) => {
                        this.setState({selectedPriceFrom: low, selectedPriceTo: high})
                    }}
                    />
                    <Text style={{paddingTop:50}}>Hasta</Text>
              </View>

              
            </View>

            <View style={{justifyContent: 'center', alignItems:'center',left:0, position:'absolute', bottom:15, width: '100%'}}>
              <TouchableOpacity style={{padding: 10}} onPress={() => this.cancelSearch()}>
                <Text style={styles.textPrimary}>Limpiar filtro</Text>
              </TouchableOpacity>
              <AwesomeButton
                          progress
                          onPress={async(next) => {
                            /** Do Something **/
                            this._doFilter();
                            next();
                          }}
                          width={340}
                          style={{alignSelf: 'center', justifyContent: 'center', marginTop: 10}}
                          alignSelf={'center'}
                          raiseLevel={0}
                          backgroundShadow={'#fff'}
                          borderWidth={2}
                          height={45}
                          borderRadius={28}
                          backgroundColor={globalColors.primary}
                          borderColor={'#8a4ea0'}
                          textSize={17}
                        >
                         Filtrar
               </AwesomeButton>
         </View>

            <TouchableOpacity style={{position: 'absolute', right:10,top:10}} onPress={() => this.toggleFilter()}>
              <MaterialCommunityIcons name="close" size={28} color="#606498"/>
            </TouchableOpacity>
          </View>
        </Modal>
          
      </View> 
      );
  }
}

const styles = StyleSheet.create({
  product: {
    flexDirection:'row',
    display:'flex',
    flex:1,
    height:120,
    width:'50%',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    paddingTop:10,
    paddingBottom:0,
    borderBottomWidth: 1,
    borderColor: 'rgba(242, 242, 249, .7)'
  },
  flat: {
    flex:1,
  },
  productInfo: {
    paddingLeft:10
  },
  textTitle: {
    ...systemWeights.regular,
    marginTop:5,
    fontSize:17,
    color: globalColors.secondary
  },
  textPrimary: {
    ...systemWeights.semibold,
    marginTop:5,
    fontSize:19,
    color: globalColors.primary
  },
  textTitleFilter: {
    ...systemWeights.semibold,
    marginTop:5,
    fontSize:19,
    color: globalColors.black,
    padding:10
  },
  textPrice: {
    ...systemWeights.light,
    marginTop:5,
    fontSize:15.
  },
  textCategory: {
    ...systemWeights.light,
    marginTop:10,
    marginLeft:10,
    fontSize:15
  },
  inputAndroid: {
      padding: 0,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingVertical: 0,
      paddingHorizontal: 0,
   },
   inputIOS: {
      padding: 10,
      margin:5,
      height:50,
      paddingVertical: 0,
      paddingHorizontal: 20,
      fontSize:18,
      borderRadius:30,
      backgroundColor: '#eaeaea'
   },
   icon: { borderTopWidth: 7, borderBottomWidth: 0, borderLeftWidth: 7, borderRightWidth: 7, marginTop: 2, backgroundColor: 'black'}
});