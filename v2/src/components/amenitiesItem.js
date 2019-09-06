
import React, { PropTypes } from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';

// Placeholder for the translate function
var I18n = {};
I18n.t = function(t) {
    return t;
}

import {
  parseDisplayText,
} from '../utilities';

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

const AmenitiesItem = (props) => {
  const description = parseDisplayText(props.amenity.description);

  return (
    <View
      style={[styles.container,
              props.border ? styles.borderStyle : {},
            ]}
    >
      <Image
        style={styles.image}
        resizeMode={'contain'}
        source={props.amenity.icon}
      />
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.amenityTitle,
            globalStyles.body,
            description === '' ? { marginBottom: 0 } : { marginBottom: 10 },
          ]}
        >
          {I18n.t(props.amenity.title)}
        </Text>
        {description !== '' &&
          <Text style={[styles.amenityDescription, globalStyles.body]}>
            {I18n.t(description)}
          </Text>
        }
      </View>
    </View>
  );
};

AmenitiesItem.propTypes = {
  // amenity: PropTypes.object.isRequired,
  // border: PropTypes.bool,
};

export default AmenitiesItem;
