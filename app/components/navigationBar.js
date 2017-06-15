
import React, { PropTypes } from 'react';

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
    top: 20,
    left: 0,
    right: 0,
  },
  label: {
    fontWeight: '600',
    fontSize: 17,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: -3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 80,
    height: 50,
  },
  backButtonLabel: {
    fontSize: 17,
  },
  backArrow: {
    width: 30,
    height: 50,
  },
});

const NavigationBar = (props) => {
  return (
    <View
      style={[styles.bar, props.barStyle]}
    >
      {props.backButtonPress &&
        <TouchableOpacity
          onPress={props.backButtonPress}
          style={styles.backButton}
        >
          <Image
            source={require('../assets/DisclosureIndicator.png')}
            style={[
              styles.backArrow,
              { tintColor: props.buttonColor },
              { transform: [{ scaleX: I18nManager.isRTL ? 1 : -1 }] },
            ]}
          />
          <Text style={[styles.backButtonLabel, { color: props.buttonColor }]}>
            {props.backButtonLabel}
          </Text>
        </TouchableOpacity>
      }
      <Text style={[props.labelStyle, styles.label]}>
        {props.label}
      </Text>
    </View>
  );
};

NavigationBar.propTypes = {
  barStyle: PropTypes.oneOfType([
    View.propTypes.style,
    PropTypes.object,
  ]).isRequired,
  labelStyle: PropTypes.oneOfType([
    Text.propTypes.style,
    PropTypes.object,
  ]).isRequired,
  label: PropTypes.string,
  buttonColor: PropTypes.string,
  backButtonLabel: PropTypes.string,
  backButtonPress: PropTypes.func,
};

export default NavigationBar;
