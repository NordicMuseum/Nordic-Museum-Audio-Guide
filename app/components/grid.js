import React, { PropTypes } from 'react';

import I18n from 'react-native-i18n';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

import StickyHeader from './stickyHeader';

import { parseDisplayText, parseVoiceoverText } from '../utilities';

import { LIGHT_GRAY, HIGHLIGHTS } from '../styles';

const SPACING = 4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cellContainer: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: SPACING,
    backgroundColor: '#ccc',
  },
  cellImage: {
    resizeMode: 'stretch',
    flex: 1,
  },
  cellTitleText: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontWeight: '600',
    position: 'absolute',
    bottom: SPACING * 2,
    left: SPACING * 2,
    fontSize: 18,
  },
  cellDuration: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: SPACING * 2,
    right: SPACING * 2,
    flexDirection: 'row',
    flex: 0.4,
    alignItems: 'flex-end',
  },
  cellDurationIcon: {
    height: 16,
    width: 16,
    marginRight: SPACING,
    tintColor: LIGHT_GRAY,
  },
  cellDurationText: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'right',
    fontSize: 16,
    lineHeight: 16,
    marginRight: 2,
  },
});

export const renderItem = (item, index, onPress, selected, locale, items) => {
  const { width, height } = Dimensions.get('window');
  const cellWidth = width;
  const cellHeight = height / 4;
  const gridLength = items.length;

  let traits = [];

  if (item.uuid === selected) {
    traits = ['button', 'startsMedia', 'selected'];
  } else {
    traits = ['button', 'startsMedia'];
  }

  let imageURL = item.imageURL;
  if (locale === 'svKids' && item.regions.length === 0) {
    imageURL = 'highlightsKids.png';
  }

  return (
    <View
      style={[
        styles.cellContainer,
        {
          width: cellWidth,
          flex: 1,
        },
      ]}
      key={item.uuid}
      accessible={true}
      accessibilityTraits={traits}
      accessibilityLabel={
        `${parseVoiceoverText(I18n.t(item.longTitle))}, ${index} of ${gridLength}.` +
        ` Plays audio for ${I18n.t(item.shortTitle)} story.`
      }
    >
      <TouchableOpacity activeOpacity={0.6} onPress={() => onPress(item)}>
        <View>
          <Image
            style={[
              styles.cellImage,
              {
                width: cellWidth,
                height: cellHeight,
              },
            ]}
            source={{
              uri: imageURL,
            }}
          >
            <View style={{ flex: 0.6 }}>
              <Text style={styles.cellTitleText}>
                {parseDisplayText(I18n.t(item.longTitle)).toUpperCase()}
              </Text>
            </View>
            <View style={styles.cellDuration}>
              <Image style={styles.cellDurationIcon} source={require('../assets/ClockIcon.png')} />
              <Text style={styles.cellDurationText}>
                {Math.floor(item.duration[locale] / 60)}
              </Text>
              <Text style={[styles.cellDurationText, { fontSize: 12 }]}>
                {I18n.t('min').toUpperCase()}
              </Text>
            </View>
          </Image>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Grid = props => {
  let totalIndex = 0;
  let content = [];
  let stickyHeaders = [];
  let lastFloorSeen;

  props.items.forEach((tourStop, index) => {
    if (lastFloorSeen !== tourStop.floor) {
      stickyHeaders.push(totalIndex);
      content.push(
        <StickyHeader key={totalIndex} title={`${I18n.t('floor')} ${tourStop.floor}`} />
      );
      totalIndex++;
      lastFloorSeen = tourStop.floor;
    }

    content.push(
      renderItem(tourStop, index, props.onCellPress, props.selected, props.locale, props.items)
    );
    totalIndex++;
  });

  return (
    <View style={styles.container}>
      <ScrollView automaticallyAdjustContentInsets={false} stickyHeaderIndices={stickyHeaders}>
        {content}
      </ScrollView>
    </View>
  );
};

Grid.propTypes = {
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  selected: PropTypes.string,
  onCellPress: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default Grid;
