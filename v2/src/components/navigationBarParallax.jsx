import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  View,
  Image,
  Animated,
  ScrollView,
  Dimensions,
} from 'react-native';

import NavigationBar from '../components/navigationBar';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_SCALE = Dimensions.get('window').scale;

export const DEFAULT_WINDOW_MULTIPLIER = 0.25;
export const DEFAULT_NAVBAR_HEIGHT = 65;

const ScrollViewPropTypes = ScrollView.propTypes;

export default class NavigationBarParallax extends Component {
  constructor() {
    super();

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  scrollTo(where) {
    if (!this._scrollView) return;
    this._scrollView.scrollTo(where);
  }

  render() {
    const {
      windowHeight,
      navBarColor,
      navBarTitle,
      style,
      ...props
    } = this.props;
    const { scrollY } = this.state;

    return (
      <View style={this.props.style}>
        <ScrollView
          style={{ zIndex: 0 }}
          ref={component => {
            this._scrollView = component;
          }}
          {...props}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } },
          ])}
          scrollEventThrottle={16}></ScrollView>

        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            opacity: scrollY.interpolate({
              inputRange: [
                -windowHeight,
                windowHeight * DEFAULT_WINDOW_MULTIPLIER,
                windowHeight * 0.8,
              ],
              outputRange: [0, 0, 1],
              extrapolate: 'clamp',
            }),
          }}>
          <NavigationBar
            label={navBarTitle}
            barStyle={{ ...this.props.barStyle, backgroundColor: navBarColor }}
          />
        </Animated.View>

        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}>
          <NavigationBar
            barStyle={{
              ...this.props.barStyle,
              backgroundColor: 'transparent',
            }}
            buttonColor={this.props.backButtonColor}
            backButtonPress={this.props.backButtonPress}
          />
        </View>
      </View>
    );
  }
}

NavigationBarParallax.defaultProps = {
  windowHeight: SCREEN_HEIGHT * DEFAULT_WINDOW_MULTIPLIER,
};

NavigationBarParallax.propTypes = {
  ...ScrollViewPropTypes,
  windowHeight: PropTypes.number,
  navBarTitle: PropTypes.string,
  navBarTitleColor: PropTypes.string,
  navBarTitleComponent: PropTypes.node,
  navBarColor: PropTypes.string,
  userImage: PropTypes.string,
  userName: PropTypes.string,
  userTitle: PropTypes.string,
  headerView: PropTypes.node,
  leftIcon: PropTypes.object,
  rightIcon: PropTypes.object,
};
