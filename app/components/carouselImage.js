import React, { Component } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel"; //Thank From distributer(s) of this lib

const styles = StyleSheet.create({
  paginationBoxStyle: {
    position: "absolute",
    bottom: 0,
    padding: 0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: "rgba(128, 128, 128, 0.92)"
  }
});

// -------------------Props---------------------
// images
// onCurrentImagePressed
// sliderBoxHeight
// parentWidth
// dotColor
// inactiveDotColor
// dotStyle
// paginationBoxVerticalPadding
// circleLoop
// autoplay
// ImageComponent
// paginationBoxStyle
// resizeMethod
// resizeMode
// ImageComponentStyle,
// imageLoadingColor = "#E91E63"
// firstItem = 0

const width = Dimensions.get("window").width;

export class SliderBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: props.firstItem || 0,
      loading: []
    };
    this.onCurrentImagePressedHandler = this.onCurrentImagePressedHandler.bind(
      this
    );
    this.onSnap = this.onSnap.bind(this);
  }
  componentDidMount() {
    let a = [...Array(this.props.images.length).keys()].map(i => false);
  }
  onCurrentImagePressedHandler() {
    if (this.props.onCurrentImagePressed) {
      this.props.onCurrentImagePressed(this.state.currentImage);
    }
  }

  onSnap(index) {
    const { currentImageEmitter } = this.props;
    this.setState({ currentImage: index }, () => {
      if (currentImageEmitter) currentImageEmitter(this.state.currentImage);
    });
  }

  _renderItem({ item, index }) {
    const {
      ImageComponent,
      ImageComponentStyle = {},
      sliderBoxHeight,
      disableOnPress,
      resizeMethod,
      resizeMode,
      imageLoadingColor = "#E91E63"
    } = this.props;
    return (
      <View
        style={{
          position: "relative",
          justifyContent: "center"
        }}
      >
        <TouchableOpacity
          key={index}
          disabled={disableOnPress}
          onPress={this.onCurrentImagePressedHandler}
          activeOpacity={1}
        >
          <ImageComponent
            style={[
              {
                width: "100%",
                height: sliderBoxHeight || 200,
                alignSelf: "center"
              },
              ImageComponentStyle
            ]}
            source={typeof item === "string" ? { uri: item } : item}
            resizeMethod={resizeMethod || "resize"}
            resizeMode={resizeMode || "cover"}
            onLoad={() => {}}
            onLoadStart={() => {}}
            onLoadEnd={() => {
              let t = this.state.loading;
              t[index] = true;
              this.setState({ loading: t });
            }}
            {...this.props}
          />
        </TouchableOpacity>
        {!this.state.loading[index] && (
          <ActivityIndicator
            size="large"
            color={imageLoadingColor}
            style={{
              position: "absolute",
              alignSelf: "center"
            }}
          />
        )}
      </View>
    );
  }

  get pagination() {
    const { currentImage } = this.state;
    const {
      images,
      dotStyle,
      dotColor,
      inactiveDotColor,
      paginationBoxStyle,
      paginationBoxVerticalPadding
    } = this.props;
    return (
      <Pagination
        borderRadius={2}
        dotsLength={images.length}
        activeDotIndex={currentImage}
        dotStyle={dotStyle || styles.dotStyle}
        dotColor={dotColor || colors.dotColors}
        inactiveDotColor={inactiveDotColor || colors.white}
        inactiveDotScale={0.8}
        carouselRef={this._ref}
        inactiveDotOpacity={0.8}
        tappableDots={!!this._ref}
        containerStyle={[
          styles.paginationBoxStyle,
          paginationBoxVerticalPadding
            ? { paddingVertical: paginationBoxVerticalPadding }
            : {},
          paginationBoxStyle ? paginationBoxStyle : {}
        ]}
        {...this.props}
      />
    );
  }

  render() {
    const {
      images,
      circleLoop,
      autoplay,
      parentWidth,
      loopClonesPerSide,
      autoplayDelay
    } = this.props;
    return (
      <View>
        <Carousel
          autoplayDelay={autoplayDelay}
          layout={"default"}
          useScrollView
          data={images}
          ref={c => (this._ref = c)}
          loop={circleLoop || false}
          enableSnap={true}
          autoplay={autoplay || false}
          itemWidth={parentWidth || width}
          sliderWidth={parentWidth || width}
          loopClonesPerSide={loopClonesPerSide || 5}
          renderItem={item => this._renderItem(item)}
          onSnapToItem={index => this.onSnap(index)}
          {...this.props}
        />
        {images.length > 1 && this.pagination}
      </View>
    );
  }
}

const colors = {
  dotColors: "#BDBDBD",
  white: "#FFFFFF"
};

SliderBox.defaultProps = {
  ImageComponent: Image
};