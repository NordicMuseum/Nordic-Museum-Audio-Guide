import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { connect } from 'react-redux';

import { translate } from '../i18n';

import StickyHeader from '../components/stickyHeader';
import AmenitiesItem from '../components/amenitiesItem';
import {
  ACTION,
  NAV_BAR_TEXT,
  NAV_BAR_BACKGROUND,
  BOTTOM_PLAYER_HEIGHT,
} from '../styles';

const allAmenities = require('../data/amenities.json');

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

class Amenities extends Component {
  static get options() {
    return {
      topBar: {
        background: {
          color: NAV_BAR_BACKGROUND,
        },
        backButton: {
          showTitle: false,
          color: ACTION,
        },
        title: {
          text: translate('amenitiesScreen_Title'),
          fontSize: 17,
          fontFamily: 'Helvetica',
          color: NAV_BAR_TEXT,
        },
      },
    };
  }

  render() {
    const { playerOpen } = this.props;

    let containerMargin = 0;
    if (playerOpen) {
      containerMargin += BOTTOM_PLAYER_HEIGHT;
    }

    let totalIndex = 0;
    let content = [];
    let stickyHeaders = [];
    Object.values(allAmenities).forEach(floor => {
      stickyHeaders.push(totalIndex);
      content.push(
        <StickyHeader
          key={totalIndex}
          title={`${translate('floor')} ${floor.floor}`}
        />,
      );
      totalIndex++;

      floor.amenities.forEach((amenity, index) => {
        content.push(
          <AmenitiesItem
            key={totalIndex}
            amenity={amenity}
            border={index !== floor.amenities.length - 1}
          />,
        );
        totalIndex++;
      });
    });

    return (
      <View style={{ flex: 1, backgroundColor: 'LIGHT_GRAY' }}>
        <View
          style={[
            styles.container,
            {
              marginBottom: containerMargin,
            },
          ]}>
          <ScrollView
            automaticallyAdjustContentInsets={false}
            contentContainerStyle={{ paddingBottom: 10 }}
            stickyHeaderIndices={stickyHeaders}>
            {content}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    playerOpen: state.bottomPlayer.playerOpen,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { forwardRef: true },
)(Amenities);
