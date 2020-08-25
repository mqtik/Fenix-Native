import * as React from "react"
import { View, Dimensions } from "react-native"
import ContentLoader, { Rect, Circle } from "react-content-loader/native"

var ancho = Dimensions.get('window').width; //full width
var alto = Dimensions.get('window').height; //full height

export function ProductsPlaceholder(props){
	return (
    <View style={{flex: 1, justifyContent: 'center', display: 'flex', alignItems: 'flex-start', paddingLeft: 10}}>
		   <ContentLoader 
    speed={2}
    width={300}
    height={460}
    viewBox="0 0 300 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Rect x="140" y="14" rx="2" ry="2" width="140" height="10" /> 
    <Rect x="140" y="30" rx="2" ry="2" width="140" height="10" /> 
    <Rect x="1" y="1" rx="8" ry="8" width="126" height="90" /> 
    <Rect x="141" y="115" rx="2" ry="2" width="140" height="10" /> 
    <Rect x="141" y="131" rx="2" ry="2" width="140" height="10" /> 
    <Rect x="2" y="102" rx="8" ry="8" width="126" height="90" /> 
    <Rect x="142" y="217" rx="2" ry="2" width="140" height="10" /> 
    <Rect x="142" y="233" rx="2" ry="2" width="140" height="10" /> 
    <Rect x="3" y="204" rx="8" ry="8" width="126" height="90" />
  </ContentLoader>
      </View>
          );
}
