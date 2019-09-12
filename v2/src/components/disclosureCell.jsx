import React, {PropTypes} from 'react';

import {Text, View, TouchableHighlight, Image, StyleSheet} from 'react-native';

import {globalStyles, LIGHT_GRAY} from '../styles';

export const DISCLOSURE_CELL_HEIGHT = 41;

const styles = StyleSheet.create({
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    height: DISCLOSURE_CELL_HEIGHT,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GRAY,
  },
  cellTitle: {
    flex: 1,
    marginLeft: 10,
  },
  cellImage: {
    height: DISCLOSURE_CELL_HEIGHT + 3,
    width: DISCLOSURE_CELL_HEIGHT + 3,
  },
});

const DisclosureCell = props => {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      accessibilityTraits={props.accessibility.traits}
      accessibilityLabel={props.accessibility.label}>
      <View
        style={[
          styles.cell,
          props.bottomBorder === false ? {borderBottomWidth: 0} : {},
        ]}>
        <Text style={[styles.cellTitle]}>
          <Text
            style={[globalStyles.disclosure]} //,  { textAlign: I18nManager.isRTL ? 'right' : 'left' }]}
          >
            {props.title}
          </Text>
        </Text>
        <Image
          style={[styles.cellImage]} //, { transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }]}
          source={require('../assets/DisclosureIndicator.png')}
        />
      </View>
    </TouchableHighlight>
  );
};

DisclosureCell.propTypes = {
  // accessibility: PropTypes.object.isRequired,
  // title: PropTypes.string.isRequired,
  // onPress: PropTypes.func.isRequired,
  // bottomBorder: PropTypes.bool.isRequired,
};

export default DisclosureCell;
