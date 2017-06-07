
import React, { PropTypes } from 'react';

import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import I18n from 'react-native-i18n';

import { HEADER_BACKGROUND_COLOR, OFF_WHITE } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    backgroundColor: HEADER_BACKGROUND_COLOR,
  },
  textStyles: {
    textAlign: 'center',
    fontSize: 17,
    color: OFF_WHITE,
  },
});

const StickyHeader = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyles}>
        {I18n.t(props.title)}
      </Text>
    </View>
  );
};

StickyHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default StickyHeader;
