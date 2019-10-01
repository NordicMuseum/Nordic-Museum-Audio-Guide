import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Image } from 'react-native';

import { translate } from '../i18n';

import { parseDisplayText } from '../utilities';

import { globalStyles } from '../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  image: {
    width: 30,
    height: 30,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 10,
  },
  amenityTitle: {
    marginBottom: 10,
    fontWeight: '500',
  },
  borderStyle: {
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
    borderStyle: 'solid',
  },
});

const AmenitiesItem = props => {
  const description = props.amenity.description;

  return (
    <View style={[styles.container, props.border ? styles.borderStyle : {}]}>
      <Image
        style={styles.image}
        resizeMode={'contain'}
        source={{ uri: `images/${props.amenity.icon}` }}
      />
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.amenityTitle,
            globalStyles.body,
            description === undefined
              ? { marginBottom: 0 }
              : { marginBottom: 10 },
          ]}>
          {translate(props.amenity.title)}
        </Text>
        {description !== undefined && (
          <Text style={[styles.amenityDescription, globalStyles.body]}>
            {translate(description)}
          </Text>
        )}
      </View>
    </View>
  );
};

AmenitiesItem.propTypes = {
  amenity: PropTypes.object.isRequired,
  border: PropTypes.bool,
};

export default AmenitiesItem;
