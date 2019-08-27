
import React, { PropTypes } from 'react';

import I18n from 'react-native-i18n';

import {
  Image,
  Alert,
  StyleSheet,
  Linking,
  View,
  Text,
} from 'react-native';

import WideButton from './wideButton';

import {
  LOCATION_SERVICES_STATUS_NOTDETERMINED,
  LOCATION_SERVICES_STATUS_AUTHORIZED,
  LOCATION_SERVICES_STATUS_DENIED,
  requestLocationServicesAuthorization,
} from '../../actions/beacon';

import { OFF_WHITE, LIGHT_GRAY, ACTION } from '../../styles';

const styles = StyleSheet.create({
  notAllowedText: {
    color: OFF_WHITE,
  },
  notAllowedBackground: {
    backgroundColor: ACTION,
    borderWidth: 0,
    marginBottom: 0,
  },
  allowedBackground: {
    borderColor: LIGHT_GRAY,
    backgroundColor: OFF_WHITE,
    marginBottom: 0,
  },
});

const LocationServicesButton = (props) => {
  let locationServicesButton;

  switch (props.locationServicesStatus) {
    case LOCATION_SERVICES_STATUS_NOTDETERMINED:
      locationServicesButton = (<WideButton
        style={[styles.notAllowedBackground, props.style]}
        textStyle={[styles.notAllowedText, props.textStyle]}
        text={I18n.t('locationServicesButton_Label')}
        onPress={() => {
          requestLocationServicesAuthorization();
        }}
      />);
      break;

    case LOCATION_SERVICES_STATUS_DENIED: {
      locationServicesButton = (<WideButton
        style={[styles.notAllowedBackground, props.style]}
        textStyle={[styles.notAllowedText, props.textStyle]}
        text={I18n.t('locationServicesButton_Label')}
        onPress={() => {
          Alert.alert(
            I18n.t('locationServicesAlert_Header'),
            I18n.t('locationServicesAlert_Body'),
            [
              { text: I18n.t('locationServicesAlert_CancelButton_Label'), style: 'cancel' },
              { text: I18n.t('locationServicesAlert_SettingsButton_Label'),
                onPress: () => {
                  const url = 'app-settings:';
                  Linking.canOpenURL(url).then(supported => {
                    if (!supported) {
                      console.error(`Can\'t handle url: ${url}`);
                      return;
                    }

                    Linking.openURL(url);
                  });
                },
              },
            ],
          );
        }}
      />);
      break;
    }

    case LOCATION_SERVICES_STATUS_AUTHORIZED:
      locationServicesButton = (<WideButton
        style={[styles.allowedBackground, props.style]}
        textStyle={props.textStyle}
        text={I18n.t('locationServicesButton_AuthorizedLabel')}
        disabled={true}
        accessoryView={
          <Image
            source={require('../../assets/checkmark.png')}
          />
        }
      />);
      break;

    // no default
  }

  return locationServicesButton;
};

LocationServicesButton.propTypes = {
  locationServicesStatus: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([
    View.propTypes.style,
    PropTypes.object,
  ]),
  textStyle: PropTypes.oneOfType([
    Text.propTypes.style,
    PropTypes.object,
  ]),
};

export default LocationServicesButton;
