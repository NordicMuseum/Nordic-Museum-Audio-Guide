import React from 'react';
import PropTypes from 'prop-types';

import { getStatusBarHeight } from 'react-native-status-bar-height';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  I18nManager,
} from 'react-native';

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: getStatusBarHeight(),
    left: 0,
    right: 0,
    height: 44,
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: getStatusBarHeight(),
  },
  label: {
    fontSize: 17,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: -3,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 80,
    height: 60,
  },
  backButtonLabel: {
    fontSize: 17,
  },
  backArrow: {
    width: 30,
    height: 50,
  },
});

const NavigationBar = props => {
  return (
    <View>
      <View
        style={[
          styles.statusBar,
          { backgroundColor: props.barStyle.backgroundColor },
        ]}
      />
      <View style={[styles.bar, props.barStyle]}>
        {props.backButtonPress && (
          <TouchableOpacity
            onPress={props.backButtonPress}
            style={styles.backButton}>
            <Image
              source={require('../assets/DisclosureIndicator.png')}
              style={[
                styles.backArrow,
                { tintColor: props.buttonColor },
                { transform: [{ scaleX: -1 }] },
              ]}
            />
            <Text
              style={[styles.backButtonLabel, { color: props.buttonColor }]}>
              {props.backButtonLabel}
            </Text>
          </TouchableOpacity>
        )}
        <Text style={[props.labelStyle, styles.label]}>{props.label}</Text>
      </View>
    </View>
  );
};

NavigationBar.propTypes = {
  barStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  label: PropTypes.string,
  buttonColor: PropTypes.string,
  backButtonLabel: PropTypes.string,
  backButtonPress: PropTypes.func,
};

export default NavigationBar;
