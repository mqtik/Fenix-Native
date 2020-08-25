import { StyleSheet } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

export default StyleSheet.create({
    viajeContainer: {
      backgroundColor: '#fff',
      height: 130,
      padding: 10,
      borderRadius: 10,
      shadowColor: "#cecece",
      shadowOffset: {
        width: 0,
        height: 9,
      },
      marginLeft: 10,
      marginRight: 10,
      shadowOpacity: 0.50,
      shadowRadius: 12.35,

      elevation: 19,
    }
});
