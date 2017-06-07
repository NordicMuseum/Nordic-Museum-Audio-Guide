
import React, { PropTypes } from 'react';

import I18n from 'react-native-i18n';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { ListView } from 'realm/react-native';

import {
  parseDisplayText,
  parseVoiceoverText,
} from '../utilities';

import { LIGHT_GRAY } from '../styles';

const SPACING = 5;

const styles = StyleSheet.create({
  container: {
  },
  gridColumn: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  cellContainer: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: SPACING,
    backgroundColor: '#ccc',
    flex: 1,
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

const Grid = (props) => {
  const { width, height } = Dimensions.get('window');
  const cellWidth = width; // 2 items per row
  const cellHeight = height / 4;
  const gridLength = props.items.length;

  const renderItem = (item, index, onPress, oddCell, screenReader) => {
    let traits = [];
    const realIndex = parseInt(index, 10) + 1;

    if (item.uuid === props.selected) {
      traits = ['button', 'startsMedia', 'selected'];
    } else {
      traits = ['button', 'startsMedia'];
    }

    if (!screenReader) {
      const oddIndex = realIndex % 2 !== 0;

      // If even column render only even cells and vice versa with odd column
      if ((oddIndex && !oddCell) || (!oddIndex && oddCell)) {
        return null;
      }
    }

    return (
      <View
        style={[styles.cellContainer, {
          width: cellWidth,
        }]}
        key={item.uuid}
        accessible={true}
        accessibilityTraits={traits}
        accessibilityLabel={
          `${parseVoiceoverText(I18n.t(item.longTitle))}, ${realIndex} of ${gridLength}.` +
          ` Plays audio for ${I18n.t(item.shortTitle)} story.`
        }
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => onPress(item)}
        >
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
                uri: item.imageURL,
              }}
            >
              <View style={{ flex: 0.6 }}>
                <Text style={styles.cellTitleText}>
                  {parseDisplayText(I18n.t(item.longTitle)).toUpperCase()}
                </Text>
              </View>
              <View style={styles.cellDuration}>
                <Image
                  style={styles.cellDurationIcon}
                  source={require('../assets/ClockIcon.png')}
                />
                <Text style={styles.cellDurationText}>
                  {Math.floor(item.duration[props.locale] / 60)}
                </Text>
                <Text style={[styles.cellDurationText, { fontSize: 12 }]}>
                  MIN
                </Text>
              </View>
            </Image>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  const dataSource = ds.cloneWithRows(props.items);

  return (
    <View style={styles.container}>
      <ListView
        enableEmptySections={true}
        contentContainerStyle={styles.gridRow}
        dataSource={dataSource}
        removeClippedSubviews={false}
        renderRow={(item, sectionIndex, index) => {
          return renderItem(item, index, props.onCellPress, null, true);
        }}
      />
    </View>
  );
};

Grid.propTypes = {
  items: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  selected: PropTypes.string,
  onCellPress: PropTypes.func.isRequired,
  screenReader: PropTypes.bool.isRequired,
  locale: PropTypes.string.isRequired,
};

export default Grid;
