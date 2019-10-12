import React from 'react';
import PropTypes from 'prop-types';

import { translate } from '../../i18n';

import {
  Image,
  Alert,
  StyleSheet,
  View,
  Text,
  ViewPropTypes,
} from 'react-native';

import WideButton from './wideButton';

import { OFF_WHITE, LIGHT_GRAY, ACTION } from '../../styles';

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
        text={translate('bluetoothButton_OnLabel')}
        disabled={true}
        accessoryView={<Image source={require('../../assets/checkmark.png')} />}
      />
    );
  } else {
    bluetoothButton = (
      <WideButton
        style={[styles.offStyle, props.style]}
        textStyle={[styles.offTextStyle, props.textStyle]}
        text={translate('bluetoothButton_OffLabel')}
        onPress={() => {
          Alert.alert(
            translate('bluetoothAlert_Header'),
            translate('bluetoothAlert_Body'),
          );
        }}
      />
    );
  }

  return bluetoothButton;
};

BluetoothButton.propTypes = {
  bluetoothOn: PropTypes.bool.isRequired,
  style: PropTypes.oneOfType([ViewPropTypes.style, PropTypes.object]),
  textStyle: PropTypes.oneOfType([Text.propTypes.style, PropTypes.object]),
};

export default BluetoothButton;
