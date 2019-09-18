import React, {PropTypes} from 'react';

// import I18n from 'react-native-i18n';
// Placeholder for the translate function
var I18n = {};
I18n.t = function(t) {
  return t;
};

import {Image, Alert, StyleSheet, View, Text} from 'react-native';

import WideButton from './wideButton';

import {OFF_WHITE, LIGHT_GRAY, ACTION} from '../../styles';

const styles = StyleSheet.create({
  onStyle: {
    borderColor: LIGHT_GRAY,
    backgroundColor: OFF_WHITE,
  },
  offStyle: {
    backgroundColor: ACTION,
    borderWidth: 0,
    marginBottom: 0,
  },
  offTextStyle: {
    color: OFF_WHITE,
  },
});

const BluetoothButton = props => {
  let bluetoothButton;

  if (props.bluetoothOn) {
    bluetoothButton = (
      <WideButton
        style={[styles.onStyle, props.style]}
        textStyle={props.textStyle}
        text={I18n.t('bluetoothButton_OnLabel')}
        disabled={true}
        accessoryView={<Image source={require('../../assets/checkmark.png')} />}
      />
    );
  } else {
    bluetoothButton = (
      <WideButton
        style={[styles.offStyle, props.style]}
        textStyle={[styles.offTextStyle, props.textStyle]}
        text={I18n.t('bluetoothButton_OffLabel')}
        onPress={() => {
          Alert.alert(
            I18n.t('bluetoothAlert_Header'),
            I18n.t('bluetoothAlert_Body'),
          );
        }}
      />
    );
  }

  return bluetoothButton;
};

BluetoothButton.propTypes = {
  // bluetoothOn: PropTypes.bool.isRequired,
  // style: PropTypes.oneOfType([View.propTypes.style, PropTypes.object]),
  // textStyle: PropTypes.oneOfType([Text.propTypes.style, PropTypes.object]),
};

export default BluetoothButton;
