import { StyleSheet, Platform } from 'react-native';
import { human,systemWeights } from 'react-native-typography'
import {globalColors} from './globals';

const IS_IOS = Platform.OS === 'ios';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#fff',
    background2: '#545351',
    white: '#ffffff'
};

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        // edit this one for the safe area on iphone x
        marginTop: -80,
        backgroundColor: colors.white
    },
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1
    },
    map: {
        flex:1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: -20,
        zIndex: 0,
        height: '110%',
        width: '100%',
        },
    exampleContainer: {
        paddingVertical: 30
    },
    exampleContainerDark: {
        backgroundColor: colors.black
    },
    exampleContainerLight: {
        backgroundColor: 'white'
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    titleDark: {
        color: colors.black
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'left'
    },
    subtitleDark: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(0, 0, 0, 0.75)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'left'
    },
    slider: {
        marginTop: 15,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    },
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    },
    modal4: {
      },
      modal: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      searchIconHeader: {
          color: '#fff', fontSize: 20,
          marginTop: IS_IOS ? 2 : 10
      },
      scrollViewBooks: {
          marginTop: 23
      },
    product: {
        //flexDirection:'row',
        display:'flex',
        height:211,
        width:197,
        justifyContent:'flex-start',
        alignItems:'flex-start',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#eaeaea',
        marginBottom:0,
        marginLeft:10
      },
      productInfo: {
        paddingTop:5,
        paddingLeft:10  
      },
      textTitle: {
        ...systemWeights.semibold,
        marginTop:5,
        fontSize:17,
        color: globalColors.secondary
      },
      textWelcome: {
        ...systemWeights.regular,
        margin:15,
        fontSize:23,
        color: '#676767'
      },
      textLastProducts: {
        ...systemWeights.light,
        margin:15,
        fontSize:18,
        color: globalColors.black
      },
      textPrice: {
        ...systemWeights.semibold,
        marginTop:5,
        fontSize:15,
        color: '#666'
      },
      verMasButton: {
        padding: 10,
        margin:5,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: globalColors.primary,
        height: 40
      }
});
