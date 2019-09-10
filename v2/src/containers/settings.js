import React, { Component } from 'react';

import { Navigation } from 'react-native-navigation';

import {StyleSheet, View, Text} from 'react-native';

import { NAV_BAR_TEXT, NAV_BAR_BACKGROUND, ACTION }  from '../styles';

class Settings extends Component {
  static options(passProps) {
    return {
      topBar: {
        background: {
          color: NAV_BAR_BACKGROUND,
        },
        backButton: {
          showTitle: false,
          color: ACTION
        },
        title: {
          text: 'Settings',
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
      	<Text>Settings</Text>
      </View>
    );
  }

}

export default Settings;
