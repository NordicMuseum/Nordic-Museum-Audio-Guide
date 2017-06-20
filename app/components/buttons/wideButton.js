
import React, { PropTypes } from 'react';

import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  I18nManager,
} from 'react-native';

import { globalStyles } from '../../styles';

const styles = StyleSheet.create({
  wideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    height: 45,
    borderRadius: 4,
  },
});

const WideButton = (props) => {
  return (
    <TouchableOpacity
      accessible={true}
      accessibilityTraits={!props.disabled ? 'button' : 'text'}
      accessibilityLabel={props.text}
      onPress={props.onPress}
      styles={styles.container}
      disabled={props.disabled || false}
      activeOpacity={props.pressable ? 0.7 : 1}
    >
      <View style={[styles.wideButton, props.style]}>
        <Text style={{ writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' }}>
          <Text
            style={[
              globalStyles.h1,
              props.textStyle,
              { flex: 1 },
              { textAlign: I18nManager.isRTL ? 'right' : 'left' },
            ]}
          >
            {props.text}
          </Text>
        </Text>
        {props.accessoryView}
      </View>
    </TouchableOpacity>
  );
};

WideButton.propTypes = {
  style: PropTypes.oneOfType([
    View.propTypes.style,
    PropTypes.object,
  ]),
  textStyle: PropTypes.oneOfType([
    Text.propTypes.style,
    PropTypes.object,
  ]),
  disabled: PropTypes.bool,
  accessoryView: PropTypes.object,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  pressable: PropTypes.bool,
};

export default WideButton;
