import React, { Component } from 'react';

import { Navigation } from 'react-native-navigation';

import {StyleSheet, View, Text} from 'react-native';

import { NAV_BAR_TEXT, NAV_BAR_BACKGROUND }  from '../styles';

class Welcome extends Component {
  static options(passProps) {
    return {
      topBar: {
        visible: false,
        background: {
          color: NAV_BAR_BACKGROUND,
        },
        title: {
          text: 'Info',
          fontSize: 17,
          fontFamily: 'Helvetica',
          color: NAV_BAR_TEXT,
        }
      }
    };
  }

  render() {
    return (
      <View>
      	<Text>Welcome</Text>
      </View>
    );
  }

}

export default Welcome;
