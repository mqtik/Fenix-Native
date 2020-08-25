import { StyleSheet } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

export default StyleSheet.create({
    input: {
      width: '100%',
      padding: 13,
      color: '#4F4F4F',
      backgroundColor: '#fff',
      fontSize: 16,
      borderColor: '#EEEEEE',
      marginLeft: 10,
      marginRight: 10
    },
    saveButton: {
      alignSelf: 'center', 
      borderRadius: 28, 
      borderWidth: 2, 
      borderColor: '#1E888A', 
      margin: 10, 
      height: 50, 
      backgroundColor: '#08B8B8', 
      width: '80%',
      fontWeight: 'bold'
    },
    saveButtonText: {
      color: '#fff', 
      justifyContent: 'center', 
      alignSelf: 'center', 
      margin: 13, 
      fontSize: 18
    }
});
