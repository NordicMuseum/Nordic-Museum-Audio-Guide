
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

import { globalStyles } from '../styles';

const SPACING = 5;

const styles = StyleSheet.create({
  container: {
    paddingTop: SPACING,
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
    backgroundColor: '#FB7D12',
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
    flex: 0.6,
  },
  cellDurationText: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontWeight: '600',
    position: 'absolute',
    bottom: SPACING * 2,
    right: SPACING * 2,
    textAlign: 'right',
  },
});

// function getImageScale(cellWidth, imageWidth) {
//  return cellWidth / imageWidth;
// }

// function getImageHeight(cellWidth, imageWidth, imageHeight) {
//  return getImageScale(cellWidth, imageWidth) * imageHeight;
// }

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
            />
            <Text
              style={[
                { width: cellWidth },
                globalStyles.disclosure,
                styles.cellTitleText,
              ]}
            >
              {parseDisplayText(I18n.t(item.longTitle)).toUpperCase()}
            </Text>
            <Text
              style={[
                { width: cellWidth },
                globalStyles.disclosure,
                styles.cellDurationText,
              ]}
            >
              30 MIN
            </Text>
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
};

export default Grid;
